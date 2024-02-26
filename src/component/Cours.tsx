import ICours from "../shared/interfaces/ICours";
import {default as stc} from "string-to-color";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {capitalize} from "../shared/Utils"
interface param {
    cours: ICours
}

export function Cours({cours}: param) {
    const rowStart = (cours.debut.getHours() - 8) * 2 + 1 + (cours.debut.getMinutes() > 0 ? 1 : 0)
    const rowEnd = (cours.fin.getHours() - 8) * 2 + 1 + (cours.fin.getMinutes() > 0 ? 1 : 0)
    const colors = stc(cours.titre.toUpperCase().replaceAll(/\s/g, "") + " white white")

    return (<div className="Cours" style={{
        margin: 5,
        padding: 10,
        //border: "1px solid black",
        borderRadius: "10px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",

        backgroundColor: colors,
        gridRow: `${rowStart}/ ${rowEnd}`,

        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr"
    }}>
        <div style={{
            gridRow: "2",
            gridColumn: "2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <span style={{
                fontWeight: "bold",
            }}>{cours.titre}</span>
        </div>

        <div style={{
            gridRow: "1",
            gridColumn: "1",
            display: "flex",
            alignItems: "flex-start",
        }}>
            <span>{cours.debut.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                second: undefined
            })}</span>
        </div>
        <div style={{
            gridRow: "3",
            gridColumn: "1",
            display: "flex",
            alignItems: "flex-end",
        }}>
            <span>{cours.fin.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                second: undefined
            })}</span>
        </div>

        <div style={{
            gridRow: "3",
            gridColumn: "3",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end"
        }}>
            <span>{cours.prof.split(/[\s-_]/g).map(capitalize).join(" ")}</span>

        </div>

        <div style={{
            gridRow: "1",
            gridColumn: "3",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start"
        }}>
            <span>{cours.salle}</span>
        </div>
    </div>)
}
