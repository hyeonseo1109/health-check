import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [data] = useFetch("http://localhost:1109/api/data");

  useEffect( () => {
    if (data) {
      setList(data);
    }
  }, [data])
  

  return (
    <>
      {list.map((el => <div key={el._id} className='border m-[10px]'>{el.text}</div>))}
      <ListInput setList={setList}/>
    </>
  )
}

const ListInput = ({setList}) => {
  const inputRef = useRef(null);

  const addList = () => {
    const newList = {
      text: inputRef.current.value,
    };
    fetch("http://localhost:1109/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
    })
    .then((res) => (res.json()))
    .then((res) => setList((prev) => [...prev, res]))
    inputRef.current.value = ''
  };
  return (
    <div>
      <input ref={inputRef} placeholder='ex: 120/80' className='border'/>
      <button onClick={addList}>+</button>
    </div>
  )
}

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect( () => {
    fetch(url)
    .then((res) => res.json())
    .then((res)=> {
      setData(res);
    });
  }, [url]);
  return [data]
}
export default App
