import ICours from "../shared/interfaces/ICours";

interface param{
    cours:ICours
}
export function Cours({cours}:param) {
    const rowStart = (cours.debut.getHours() - 8)*2 +1 + (cours.debut.getMinutes() > 0 ? 1 : 0)
    const rowEnd = (cours.fin.getHours() - 8)*2 +1 + (cours.fin.getMinutes() > 0 ? 1 : 0)
    return (<div className="Cours" style={{
        gridRow: `${rowStart}, ${rowEnd}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr"
    }}>
        <div style={{
            gridRow: "2",
            gridColumn: "2"
        }}>
            <h5>{cours.titre}</h5>
        </div>
    </div>)
}
