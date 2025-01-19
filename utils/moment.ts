import moment from "moment-timezone";
import Container from "typedi";
import { EnvironmentVariables } from "../config/env-variables";
const ENV_VARS = Container.get(EnvironmentVariables);
moment.tz.setDefault(ENV_VARS.TIMEZONE);

export function getCurrentDate() {
    return moment().toDate();
}

export function getFutureDate(
    minutes: number = 0,
    hours: number = 0,
    days: number = 0,
) {
    return moment().add({ days, hours, minutes }).toDate();
}

export function getRemainingTime(deadline: Date) {
    const isTimeUp = moment().isAfter(moment(deadline));
    if (isTimeUp) return 0;
    return moment(deadline).diff(moment(), "minutes");
}
