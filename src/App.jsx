import { useState, useEffect, useRef } from 'react'
import { BpChart, BstChart, BwChart } from './graph';
import './App.css';
import { twMerge } from 'tailwind-merge';
import { BpTable, BstTable, BwTable } from './table';
import { Terms } from './terms';


function App() {
  const [list, setList] = useState([]);
  const [data] = useFetch("https://health-check-mrer.onrender.com");
  const [name, setName] = useState('');

  useEffect( () => {
    if (data) {
      setList(data);
    }
  }, [data])
  

  const filteredList = name ? list.filter(el => el.name === name) : [];

  return (
    <div  className='flex flex-col bg-[#e3ebff] shadow-[0_0_15px_#adbce1] p-5 rounded-[15px] w-[80%] itmes-center' >
      
      { !name && <p className="text-center text-gray-600 mt-10">성함을 입력해주세요.</p> }
      { name && filteredList.map((el => {
        console.log(el._id);//___
        const [sbp, dbp] = el.bp.split('/').map(Number);
        const bmi = ( el.bw / ((el.ht / 100) ** 2)).toFixed(2);
        return (
        <div key={el._id} className='m-[15px_0]'>
          <div className='border border-b-0 m-[0_auto] w-[80%] rounded-t-[15px] bg-[#bfccef] shadow-[0_0_15px_#aebce1] items-center justify-around flex'>
            {el.date}
            {/* ~~~~~~~~~~~~삭제하기~~~~~~~~~~~~ */}
            <button 
              onClick={() => {
                fetch(`https://health-check-mrer.onrender.com/${el._id}`, {
                  method: "DELETE",
                })
                .then( (res) => {
                  if (res.ok) {
                    setList(prev => prev.filter(item => item._id !== el._id));
                    console.log(el._id);
                      //내가 택한 것과 아이디가 다른 애들만 남긴다. = 내가 택한 애는 없어진다.
                  }
                })
              }}
              style={{ fontSize: '10px', width: '20px', height: '20px', backgroundColor: '#96a9db', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>-</button>
          </div>
          
          <div className='border m-[0_auto] w-[80%] rounded-b-[15px] bg-[#f5f7ff] text-left p-2  shadow-[0_0_15px_#aebce1]'>
            <p className={twMerge(
              'text-black',
              dbp >= 90 && 'text-orange-400',
              dbp >= 100 && 'text-red-600',
              dbp <= 60 && 'text-blue-500',
              sbp >= 140 && 'text-orange-400',
              sbp >= 160 && 'text-red-600',
              sbp <= 90 && 'text-blue-500'
            

            )}>혈압: &nbsp;{sbp}/{dbp}
            </p>
            <p className={twMerge(
              'text-black',
              el.bst >= 100 && 'text-orange-400',
              el.bst >= 126 && 'text-red-600',
              el.bst <= 70 && 'text-blue-500'
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
      

      <ListInput setList={setList} name={name} setName={setName} />
      <div className='w-full h-[1px] bg-black m-[40px_0]'/>
      <BpChart data={filteredList} /> <div className='w-full h-[1px] bg-[#c9cdff] m-[40px_0]'/>
      <BstChart data={filteredList} /> <div className='w-full h-[1px] bg-[#c9cdff] m-[40px_0]'/>
      <BwChart data={filteredList} /> <br/><br/><br/>
      <div className='w-full h-[1px] bg-black m-[40px_0]'/> <br/>
      <p className="text-red-600 font-bold">정상수치</p><br/>
      <BpTable /> <br/>
      <BstTable /> <br />
      <BwTable /> <br/><br/>
      <Terms />
    </div>
  )
}

const ListInput = ({setList, name, setName }) => {
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
  
  //이름 바꾸면 상태 업데이트
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const addList = () => {
    const newList = {
      name: nameRef.current.value,
      bp: bpRef.current.value,
      bst: bstRef.current.value,
      ht: htRef.current.value,
      bw: bwRef.current.value,
      date: when(),
    };

    fetch("https://health-check-mrer.onrender.com", {
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
      <input 
        ref={nameRef} 
        value={name}
        onChange={onNameChange}
        placeholder='예:  홍길동' className='border w-[180px] bg-[#ffffff9d]'/>
      <br/>
      <div className='bg-black h-[1px] w-[80%]'/><br/>
      
      <div className='flex gap-3 flex-col'>
        <div className='flex flex-row gap-2 justify-between'>
          <p>혈압:</p>
          <input 
            ref={bpRef} 
            placeholder='예:  120/80' 
            className='border w-[200px]
            bg-[#ffffff9d]
          '/>
        </div>

        <div className='flex flex-row gap-2 justify-between'>
          <p>공복혈당:</p>
          <input 
            ref={bstRef} 
            placeholder='예:  100' 
            className='border w-[200px]
            bg-[#ffffff9d]
            '/>
        </div>  

        <div className='flex flex-row gap-2 justify-between'>
          <p>키:</p>
          <input 
            ref={htRef} 
            placeholder='예:  170' 
            className='border w-[85px]
            bg-[#ffffff9d]
            '/>
          <p>&nbsp;체중:</p>
          <input 
            ref={bwRef} 
            placeholder='예:  70' 
            className='border w-[85px]
            bg-[#ffffff9d]
            '/>
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
