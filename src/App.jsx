import { useState, useEffect, useRef } from 'react'
import { BpChart, BstChart, BwChart } from './graph';
import './App.css';
import { twMerge } from 'tailwind-merge';


function App() {
  const [list, setList] = useState([]);
  const [data] = useFetch("http://localhost:1109/api/data");

  useEffect( () => {
    if (data) {
      setList(data);
    }
  }, [data])
  

  return (
    <div  className='flex flex-col bg-[#e3ebff] shadow-[0_0_15px_#adbce1] p-5 rounded-[15px] w-[80%] itmes-center' >
      <BpChart data={list} /> <div className='w-full h-[1px] bg-black m-[40px_0]'/>
      <BstChart data={list} /> <div className='w-full h-[1px] bg-black m-[40px_0]'/>
      <BwChart data={list} />
      {list.map((el => {
      const [sbp, dbp] = el.bp.split('/').map(Number);
      const bmi = ( el.bw / ((el.ht / 100) ** 2)).toFixed(2);
      return (
      <div key={el._id} className='m-[15px_0]'>
        <div className='border border-b-0 m-[0_auto] w-[80%] rounded-t-[15px] bg-[#bfccef] shadow-[0_0_15px_#aebce1] items-center justify-around flex'>
          {el.date}
          <button 
            onClick={() => {
              fetch(`http://localhost:1109/api/data/${el._id}`, {
                method: "DELETE",
              })
              .then( (res) => {
                if (res.ok) {
                  setList(prev => prev.filter(item => item._id !== el._id))
                    //내가 택한 것과 아이디가 다른 애들만 남긴다. = 내가 택한 애는 없어진다.
                }
              })
            }}
            style={{ fontSize: '10px', width: '20px', height: '20px', backgroundColor: '#96a9db', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>-</button>
        </div>
        <div className='border m-[0_auto] w-[80%] rounded-b-[15px] bg-[#f5f7ff] text-left p-2  shadow-[0_0_15px_#aebce1]'>
          <p className={twMerge(
            'text-black',
            sbp >= 140 && 'text-orange-400',
            sbp >= 160 && 'text-red-600',
            dbp >= 90 && 'text-orange-400',
            dbp >= 100 && 'text-red-600'

          )}>혈압: &nbsp;{sbp}/{dbp}
          </p>
          <p className={twMerge(
            'text-black',
            el.bst >= 100 && 'text-orange-400',
            el.bst >= 126 && 'text-red-600'
          )}>공복혈당: &nbsp;{el.bst}</p>
          <p>키/체중: &nbsp;{el.ht}/{el.bw}&nbsp;
            <span className={twMerge(
              'text-black',
              bmi <= 18.5 && 'text-blue-500',
              bmi >= 23 && 'text-orange-400',
              bmi >= 30 && 'text-red-600'
            )}>(비만도: {bmi})</span></p>
        </div>
      </div>
      )}))}
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
        <div className='flex flex-row gap-2 justify-between'>
          <p>혈압:</p>
          <input ref={bpRef} placeholder='ex: 120/80' className='border w-[200px]'/>
        </div>
        <div className='flex flex-row gap-2 justify-between'>
          <p>공복혈당:</p>
          <input ref={bstRef} placeholder='ex: 100' className='border w-[200px]'/>
        </div>  
        <div className='flex flex-row gap-2 justify-between'>
          <p>키:</p>
          <input ref={htRef} placeholder='ex: 170' className='border w-[85px]'/>
          <p>&nbsp;체중:</p>
          <input ref={bwRef} placeholder='ex: 70' className='border w-[85px]'/>
        </div>  
        <button onClick={addList} className='w-[50px] h-[50px] flex justify-center items-center m-[20px_auto] shadow-[0_0_15px_#aebce1]'>+</button>
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
