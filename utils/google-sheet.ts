import Container from "typedi";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { EnvironmentVariables } from "../config/env-variables";
import { googleAuth, googleDrive } from "../config/google";
const ENV_VARIABLES = Container.get(EnvironmentVariables);

export async function createGoogleSheet(
    data: any,
    sheetTitle: string,
    sheetTab: string,
) {
    try {
        if (!data || typeof data != "object") {
            throw new Error("Invalid payload");
        }

        const folderId = ENV_VARIABLES.SP_FOLDER_ID;
        const fileList = await googleDrive.files.list({
            q: `'${folderId}' in parents and name='${sheetTitle}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
            fields: "files(id)",
        });

        let fileId;
        if (!fileList?.data?.files?.length) {
            const createResponse = await googleDrive.files.create({
                requestBody: {
                    name: sheetTitle,
                    mimeType: "application/vnd.google-apps.spreadsheet",
                    parents: [folderId],
                },
            });
            if (createResponse.status !== 200) {
                throw new Error("Error while creating sheet");
            }
            fileId = createResponse.data.id;
        } else {
            fileId = fileList.data.files[0].id;
        }

        const doc = new GoogleSpreadsheet(fileId!, googleAuth);
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle[sheetTab];
        if (!sheet) sheet = await doc.addSheet({ title: sheetTab });

        try {
            await sheet.loadHeaderRow();
        } catch (error) {
            await sheet.setHeaderRow(Object.keys(data));
        }

        await sheet.addRow(data);

        const gsheetLink = `https://docs.google.com/spreadsheets/d/${doc.spreadsheetId}/edit`;
        return { gsheetLink };
    } catch (err: any) {
        return new Error(err.message || "Error while creating Sheet");
    }
}

export async function readGoogleSheet(sheetTitle: string, sheetTab: string) {
    try {
        const folderId = ENV_VARIABLES.SP_FOLDER_ID;

        const fileList = await googleDrive.files.list({
            q: `'${folderId}' in parents and name='${sheetTitle}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
            fields: "files(id)",
        });
        if (!fileList?.data?.files?.length) {
            throw new Error("Sheet doesn't exists");
        }
        const fileId = fileList.data.files[0].id;

        const doc = new GoogleSpreadsheet(fileId!, googleAuth);
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle[sheetTab];
        if (!sheet) throw new Error("Sheet doesn't exists");

        await sheet.loadCells();

        let numRows = 0;
        let numCols = 0;
        while (sheet.getCell(numRows, 0).value !== null) numRows++;
        while (sheet.getCell(0, numCols).value !== null) numCols++;

        const headers: string[] = [];
        for (let col = 0; col < numCols; col++) {
            const cell = sheet.getCell(0, col);
            headers.push(cell.value as string);
        }

        const data = [];
        for (let row = 1; row < numRows; row++) {
            let rowData: any = {};
            for (let col = 0; col < numCols; col++) {
                const cell = sheet.getCell(row, col);
                rowData[headers[col]] = cell.value;
            }
            data.push(rowData);
        }

        return data;
    } catch (err: any) {
        return new Error(err.message || "Error while reading Sheet");
    }
}
