import { useState, useEffect, useRef } from 'react'
import { BPChart } from './graph';
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
    <div  className='flex flex-col bg-[#e3ebff] shadow-[0_0_10px_#adbce1] p-5 rounded-[15px] w-[80%]' >
      <BPChart data={list} />
      {list.map((el => 
      <div key={el._id} className='m-[15px_0]'>
        <div className='border border-b-0 m-[0_auto] w-[80%] rounded-t-[15px]'>
          {el.date}
        </div>
        <div className='border m-[0_auto] w-[80%] rounded-b-[15px]'>
          혈압: {el.bp} <br/>
          혈당: {el.bst} <br/>
          비만도: {( el.bw / ((el.ht / 100) ** 2)).toFixed(2)}
        </div>
      </div>
    ))}
      <ListInput setList={setList}/>
    </div>
  )
}

const ListInput = ({setList}) => {
  const nameRef = useRef(null);
  const bpRef = useRef(null);
  const bstRef = useRef(null);
  const htRef = useRef(null);
  const bwRef = useRef(null);

  function when () {
      const now = new Date();
      let year = now.getFullYear().toString().slice(-2);;
      let month = (now.getMonth()+1).toString().padStart(2, '0');
      let day = now.getDate().toString().padStart(2, '0');
      let hour = now.getHours().toString().padStart(2, '0');
      let min = now.getMinutes().toString().padStart(2, '0');
      
      return `${year}/${month}/${day} ${hour}:${min}`;
    }

  const addList = () => {
    const newList = {
      name: nameRef.current.value,
      bp: bpRef.current.value,
      bst: bstRef.current.value,
      ht: htRef.current.value,
      bw: bwRef.current.value,
      date: when(),
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

    bpRef.current.value = ''
    bstRef.current.value = ''
    htRef.current.value = ''
    bwRef.current.value = ''
  };
    
    
  return (
    <div className='flex flex-col justify-center items-center m-[30px_auto]'>
      <input ref={nameRef} placeholder='성함을 입력하세요.' className='border w-[180px]'/><br/><div className='bg-black h-[1px] w-[80%]'/><br/>
      <div className='flex gap-3 flex-col'>
        <div className='flex flex-row gap-2'>
          <p>혈압:</p>
          <input ref={bpRef} placeholder='ex: 120/80' className='border w-[200px]'/>
        </div>
        <div className='flex flex-row gap-2'>
          <p>혈당:</p>
          <input ref={bstRef} placeholder='ex: 100' className='border w-[200px]'/>
        </div>  
        <div className='flex flex-row gap-2'>
          <p>키:</p>
          <input ref={htRef} placeholder='ex: 170' className='border w-[85px]'/>
          {/*연두: 170cm라고 입력해도 숫자만 주울 수 있게 하기*/}
          <p>&nbsp;체중:</p>
          <input ref={bwRef} placeholder='ex: 70' className='border w-[85px]'/>
        </div>  
        <button onClick={addList} className='w-[50px] h-[50px] flex justify-center items-center m-auto'>+</button>
      </div>
    </div>
  );
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
  return [data];
}

export default App;
