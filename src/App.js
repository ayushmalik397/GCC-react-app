import {useState, useEffect} from 'react'
import './App.css';
import Left from './components/Left';
import Right from './components/Right';

function App() {
  const [formData, setData] = useState(JSON.parse(localStorage.getItem('LocalData')) || [])

  function setFormData(payload){
    let arr = [...formData, payload]
    localStorage.setItem('LocalData', JSON.stringify(arr))
    setData([...formData, payload])
  }

  function updateFormData(payload) {
    if(payload.ops === "delete"){
      let arr = formData;
      arr.splice(payload.id, 1)
      setData(arr);
    }else {
      let arr = formData;
      arr[payload.id].title = payload.title;
      arr[payload.id].desc = payload.desc;
      setData(arr);
    }
    localStorage.setItem('LocalData', JSON.stringify(formData))
  }

  return (
    <div className="App">
      <Left update={setFormData}></Left>
      <Right formData={formData} updateFormData={updateFormData}></Right>
    </div>
  );
}

export default App;
