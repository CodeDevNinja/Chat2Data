import Request from "../lib/request"
import qs from "qs"

export const getAnalysticDataByLang = async (query: any) => {
    return Request.getJson(`analytics/data?${qs.stringify(query)}`)
}


export const generateChartOption = async (query: any) => {
    return Request.getJson(`generate/chart/option?${qs.stringify(query)}`)
}