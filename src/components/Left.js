import './style.css'
import {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Left(props) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [dDate, setDDate] = useState(changeDate(startDate))
    function saveNote(e){
        let obj = {
            dDate,
            title,
            desc
        }
        props.update(obj)
        setTitle("")
        setDesc("")
        setStartDate(new Date())
    }

    function setDate(date){
        setDDate(changeDate(date))
        setStartDate(date)
    }

    function changeDate(date){
        if(typeof date === "object")
            return date.toDateString();
        else{
            return date;
        }
    }

    function discardNote() {
        setTitle("")
        setDesc("")
        setStartDate(new Date())
    }

    function clearLocalStorage(){
        localStorage.removeItem('LocalData')
    }
    return (
      <div className="left">
        <div className='edit-card'>
            <div className="date-pick">Date: <DatePicker selected={startDate} onChange={date => setDate(date)}/></div>
            <div className="form">
                <div><label>Title</label><input className="title" type="text" value={title} onChange={e => setTitle(e.target.value)}/></div>
                <div className="desc-div"><label>Description</label><textarea className="desc" value={desc} type="text" onChange={e => setDesc(e.target.value)}/></div>
            </div>
            <div className="options">
                <button className="btn btn-primary" onClick={saveNote}>Save</button>
                <button className="btn btn-primary discard" onClick={discardNote}>Discard</button>
            </div>
        </div>
        <div className="clear-st"><button className="btn btn-danger" onClick={clearLocalStorage}>Clear Local Storage</button></div>
      </div>
    );
  }
  export default Left;
