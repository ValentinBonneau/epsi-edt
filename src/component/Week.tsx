import {useEffect, useState} from "react";
import IWeek from "../shared/interfaces/IWeek";
import {getWeek} from "../shared/services/wigorService"
import {Day} from "./Day";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";
export function Week() {

    const [date, setdate] = useState(getNextMonday())
    const [week, setWeek] = useState({} as IWeek)

    useEffect(()=>{
        getWeek(date).then((rweek)=>{
            setWeek(rweek)
        })
    }, [date])

    return (<div className="Week">
        <DatePicker selected={date} onChange={(date)=>{setdate(date as Date)}}/>
        <div className="Week-days">
            {week.days?.map((day,id)=>{return(<Day key={id} day={day}/>)})}
        </div>
    </div>)
}

function getNextMonday():Date{
    const current = new Date()

    while(
        current.getDay() === 0 ||
        current.getDay() === 6 ||
        (current.getDay() === 5 && current.getHours() >= 16)
    ){
        current.setDate(current.getDate() + 1)
    }

    return current
}
