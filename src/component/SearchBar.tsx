import {useState} from "react";

import DatePicker from "react-datepicker";
import {setDefaultLocale,registerLocale} from "react-datepicker";
import {fr} from "date-fns/locale/fr"
import "../styles/SearchBar.scss"

registerLocale('fr',fr)
setDefaultLocale('fr')

interface props {
    onSearch : (date:Date, name:string)=>void
    date: Date,
    name: string
}
export function SearchBar(props:props) {
    const [date, setdate] = useState(props.date)
    const [name, setName] = useState(props.name)

    //props.onSearch(date,name)

    return (<div className="SearchBar">
        <DatePicker selected={date} onChange={(date)=>{
            props.onSearch(date as Date,name)
            setdate(date as Date)
        }}/>
        <input type="text" value={name} onChange={(e)=>{
            props.onSearch(date,e.target.value)
            setName(e.target.value)
        }}/>
    </div>)
}

