import {Cours} from "./Cours";
import IDay from "../shared/interfaces/IDay";

interface props {
    day: IDay
}
export function Day({day}: props) {
    return (<div className="Day">
        <h3>{day?.date.toLocaleDateString('fr-FR')}</h3>
        <div
        style={{
            display: "grid",
            gridTemplateRows: "repeat(28, 1fr)",
            gridTemplateColumns: "100%",
            height: "100%"
        }}
    >
            {day?.cours.map((cours,id)=>(<Cours key={id} cours={cours}/>))}
    </div>
    </div>)
}
