import IWeek from "../interfaces/IWeek";
import IDay from "../interfaces/IDay";
import ICours from "../interfaces/ICours";

class WigorParser {
    private doc: Document

    constructor(html: string) {
        const parser = new DOMParser()
        this.doc = parser.parseFromString(html, "text/html")
    }

    parseWeek(): IWeek {
        console.log(this.doc)
        const days: IDay[] = Array.from(this.doc.querySelectorAll("td.TCJour")).map((e) => {
            return {
                date: new Date(Date.parse(e.innerHTML)),
                cours: []
            }
        })

        this.doc.querySelectorAll("div.Case").forEach((e) => {
            const dayIndex = Math.round((parseInt(
                (e.attributes
                    .getNamedItem("style")
                    ?.value
                    .match(/(?<=left:)\d+/) as RegExpMatchArray)[0]
            ) / 20) - 0.5)
            const date = days[dayIndex].date
            const debut = new Date(date)
            const fin = new Date(date)

            const [dh, dm, fh, fm] = (e.querySelector("td.TChdeb")?.innerHTML as String).replace(/\s-\s/, ":").split(":").map(x => parseInt(x))
            debut.setHours(dh, dm, 0, 0)
            fin.setHours(fh, fm, 0, 0)

            days[dayIndex].cours.push({
                debut,
                fin,
                prof: (e.querySelector("td.TCProf")?.childNodes[1].nodeValue as string),
                salle: "",
                teams: undefined,
                titre: (e.querySelector("td.TCase")?.innerHTML as string)
            })

        })


        return {
            days: [days[0], days[1], days[2], days[3], days[4]]
        };
    }

    parseDay(): IDay {
        const date = new Date(Date.parse(this.doc.querySelector("div#Heure")?.childNodes[1].nodeValue as string))

        const cours: ICours[] = Array.from(this.doc.querySelectorAll("#Region .Ligne")).map(e => {

            const debut = new Date(date)
            const fin = new Date(date)

            const [dh, dm] = (e.querySelector(".Debut")?.innerHTML as string).split(":").map(x => parseInt(x))
            const [fh, fm] = (e.querySelector(".Fin")?.innerHTML as string).split(":").map(x => parseInt(x))

            debut.setHours(dh, dm, 0, 0)
            fin.setHours(fh, fm, 0, 0)

            return {
                debut,
                fin,
                prof: e.querySelector(".Prof")?.innerHTML as string,
                titre: e.querySelector(".Matiere")?.innerHTML as string,
                salle: e.querySelector(".Salle")?.innerHTML as string,
                teams: ""
            }
        })

        return {
            date,
            cours
        }
    }
}

export default WigorParser
