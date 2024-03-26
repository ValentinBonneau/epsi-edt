import IDay from "../interfaces/IDay";
import WigorParser from "../wigorParser/WigorParser"
import IWeek from "../interfaces/IWeek";


const API_ROOT = `${process.env.NODE_ENV == "development" ? window.location.origin : "https://edtmobiliteng.wigorservices.net"}/WebPsDyn.aspx`
const USER = window.localStorage.getItem("username") ?? ""

function buildURL(action: string, user: string, date: Date): URL {
    const url = new URL(API_ROOT)
    url.searchParams.append("Action", action)
    url.searchParams.append("serverid", "C")
    url.searchParams.append("Tel", user)
    const dateString = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`.replace(/(^|(?<=\/))(?=\d\/)/, "0")
    console.log(dateString)
    url.searchParams.append("date", dateString)

    return url
}

function getDay(date: Date = new Date()): Promise<IDay> {

    const url = buildURL("posETUD", USER, date)

    return fetch(url).then(resp => resp.text()).then(html => {
        const parser = new WigorParser(html)
        return parser.parseDay()
    })
}

function getWeek(date: Date = new Date()): Promise<IWeek> {

    const url = buildURL("posETUDSEM", USER, date)


    return fetch(url).then(resp => {
        console.log(resp)
        return resp.text()
    }).then(html => {
        const parser = new WigorParser(html)
        return parser.parseWeek()
    })
}

export {
    getDay,
    getWeek
}
