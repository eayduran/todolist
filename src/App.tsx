import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
// import Trash from './assets/icons/trash.svg';
import Check from './assets/icons/check.svg';
import Checkup from './assets/icons/checkup.svg';
import Circle from './assets/icons/circle2.svg';
import Plus from './assets/icons/plus.svg';

import Smaller from './assets/icons/smaller.svg';
import Bigger from './assets/icons/bigger.svg';

import X from './assets/icons/x.svg';


const App: React.FC = () => {
  const [bubblecolor ,setBubblecolor] = useState<string>('rgb(178,178,178)')
  const [trashcolor ,setTrashcolor] = useState<string>('rgb(178,178,178)')
  const [donetrashcolor ,setDoneTrashcolor] = useState<string>('rgb(178,178,178)')
  const [down ,setDown] = useState<string>('rgb(178,178,178)')
  const [showCompleted, setShowcompleted] = useState<boolean>(true)
  const [bigScreen, setBigscreen] = useState<boolean>(true)
  const [arr, setArr] = useState<any>(['*'])
  const [done, setDone] = useState<any>([''])

  useEffect(()=>{
    if(localStorage.arr !== '*'){
      setArr(localStorage.arr.split(','))
    }
    if(localStorage.done !== ''){
      setDone(localStorage.done.split(','))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('arr', arr);
  },[arr])
  useEffect(()=>{
    localStorage.setItem('done', done);
  },[done])

  return (
    <div className="drop-shadow-2xl h-screen flex items-center justify-center py-10">

    <div style={{minHeight: bigScreen?550:112}} className='flex flex-col items-between justify-between bg-white'>
      <div className='w-80'>
        
          {/* header */}
          <div style={{borderBottomWidth: 1, borderBottomColor: 'rgb(230,230,230)'}} className='flex items-center justify-between w-full h-14 pl-4 pr-2'>
              <div className='flex'>
                <div className='bg-black w-6 h-6 flex items-center justify-center rounded-md'>
                  <img src={Checkup} alt="Checkup" />
                </div>
                <div className='font-semibold ml-4 text-black'>
                  Todo
                </div>
              </div>

              <div className='w-8 h-8 flex items-center justify-center rounded-md hover:cursor-pointer hover:bg-gray-200 transition-colors'>
                <img src={X} alt="x" />
              </div>
          </div>

          {/* tasks */}
          <div className=''>

            <div className='flex ml-6 mt-3 mb-4 justify-between items-center'>
              <div className='font-semibold'>
                Tasks
              </div>
              <div onClick={()=>{
                setBigscreen(!bigScreen)
              }} className='hover:bg-gray230 transition-colors w-8 h-8 mr-2 rounded-full flex items-center justify-center'>
                {
                  bigScreen?
                  <img className='-rotate-45' width={15} src={Smaller} alt="Smaller" />
                  :
                  <img className='-rotate-45' width={15} src={Bigger} alt="Bigger" />
                }
              </div>
            </div>
          
              {
                arr.map((word: any,i: any) => {
                  if(word==='*'){  
                    return null
                  }
                  else{
                    return(
                      <div style={{display: bigScreen?'flex':'none'}} key={i}>    
                        <div className='flex group justify-between w-screen py-2 sbg-green-200'>

                          <div id='testx' className='flex'>
                            <div className='w-5 h-8 flex items-center justify-center' onMouseEnter={()=>{setBubblecolor('rgb(22,22,22)')}} onMouseLeave={()=>{setBubblecolor('rgb(178,178,178)')}}>
                              <svg className='hover:cursor-pointer' width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path style={{fill: bubblecolor}} className='transition-opacity opacity-0 group-hover:opacity-100' d="M15.5 17C16.3284 17 17 17.6716 17 18.5C17 19.3284 16.3284 20 15.5 20C14.6716 20 14 19.3284 14 18.5C14 17.6716 14.6716 17 15.5 17ZM8.5 17C9.32843 17 10 17.6716 10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17ZM15.5 10C16.3284 10 17 10.6716 17 11.5C17 12.3284 16.3284 13 15.5 13C14.6716 13 14 12.3284 14 11.5C14 10.6716 14.6716 10 15.5 10ZM8.5 10C9.32843 10 10 10.6716 10 11.5C10 12.3284 9.32843 13 8.5 13C7.67157 13 7 12.3284 7 11.5C7 10.6716 7.67157 10 8.5 10ZM15.5 3C16.3284 3 17 3.67157 17 4.5C17 5.32843 16.3284 6 15.5 6C14.6716 6 14 5.32843 14 4.5C14 3.67157 14.6716 3 15.5 3ZM8.5 3C9.32843 3 10 3.67157 10 4.5C10 5.32843 9.32843 6 8.5 6C7.67157 6 7 5.32843 7 4.5C7 3.67157 7.67157 3 8.5 3Z"/>
                              </svg>
                            </div>

                            <div onClick={()=>{
                              setDone([arr[i],...done])
                              arr.splice(i,1)
                              setArr([...arr])

                            }} className='transition transition-colors flex items-center justify-center hover:cursor-pointer hover:bg-gray230 w-8 h-8 rounded-full'>
                              <img src={Circle} alt="Check" />
                            </div>
                          </div>

                          <div className='font-medium w-56 flex hover:cursor-texts'>
                            {
                              arr[i]!==''
                              ?
                              <div
                              onInput={(event)=>{
                                let temp: any;
                                temp = arr;
                                temp[i] = event.currentTarget.textContent;
                                setArr(temp);
                              }}  
                              contentEditable className='w-56 min-h-8 outline-none flex items-center bg-white'>{arr[i]}</div>
                              :
                              <input autoFocus
                              onBlur={(event)=>{
                                if(event.target.value ===''){
                                  arr.splice(i,1)
                                  setArr([...arr])
                                }
                              }} 
                              onChange={(event)=>{
                                let ids = arr;
                                ids[i] = event.target.value;
                                setArr(ids)
                                // setArr([...arr])
                                console.log('here',done.length,arr)
                              }} className='w-56 h-8 outline-none' type="text" id="fname" name="fname"></input>
                            }

                          </div>

                          <div onClick={()=>{
                            arr.splice(i,1)
                            setArr([...arr])
                            }} className='flex items-center justify-center h-8 w-8 mr-2 hover:cursor-pointer' onMouseEnter={()=>{setTrashcolor('rgb(22,22,22)')}} onMouseLeave={()=>{setTrashcolor('rgb(178,178,178)')}}>
                            {/* <img src={Trash} alt="Trash" className='transition-opacity opacity-0 group-hover:opacity-100 hover:stroke-white'/> */}
                            <svg className='transition-opacity opacity-0 group-hover:opacity-100' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={{fill: trashcolor}} fillRule="evenodd" clipRule="evenodd" d="M5.8662 8.15407C6.29365 8.16442 6.63173 8.5171 6.62131 8.94181L5.84735 8.92308L5.07338 8.90434C5.0838 8.47963 5.43876 8.14373 5.8662 8.15407ZM5.84735 8.92308C5.07338 8.90434 5.07338 8.90434 5.07338 8.90434L5.07235 8.94807L5.06956 9.07238C5.06721 9.18044 5.06396 9.33725 5.06034 9.53284C5.05312 9.92395 5.04446 10.4705 5.03868 11.0925C5.02716 12.333 5.02698 13.8865 5.07371 15.1062C5.12484 16.4402 5.26247 18.1669 5.37603 19.4527C5.50429 20.9048 6.73177 22 8.18698 22H15.813C17.2682 22 18.4957 20.9048 18.624 19.4527C18.7375 18.1669 18.8752 16.4402 18.9263 15.1062C18.973 13.8865 18.9728 12.333 18.9613 11.0925C18.9555 10.4705 18.9469 9.92395 18.9397 9.53284C18.936 9.33725 18.9328 9.18044 18.9304 9.07238L18.9277 8.94807L18.9266 8.90515C18.9162 8.48044 18.5612 8.14373 18.1338 8.15407C17.7063 8.16442 17.3683 8.5171 17.3787 8.94181L17.8719 8.92987C17.3787 8.94181 17.3787 8.94181 17.3787 8.94181L17.3797 8.98354L17.3824 9.10565C17.3847 9.2122 17.388 9.36732 17.3915 9.56106C17.3987 9.94862 17.4073 10.4903 17.413 11.1067C17.4245 12.3427 17.4243 13.8661 17.379 15.0477C17.3295 16.3412 17.1948 18.0358 17.0815 19.3182C17.0245 19.9641 16.4774 20.4615 15.813 20.4615H8.18698C7.52258 20.4615 6.97554 19.9641 6.91849 19.3182C6.80522 18.0358 6.67055 16.3412 6.62098 15.0477C6.5757 13.8661 6.57552 12.3427 6.587 11.1067C6.59273 10.4903 6.60132 9.94862 6.60847 9.56106C6.61205 9.36732 6.61527 9.2122 6.61759 9.10565L6.62032 8.98354L6.62131 8.94181L5.84735 8.92308Z"/>
                            <path style={{fill: trashcolor}} fillRule="evenodd" clipRule="evenodd" d="M4 5.84615C4 5.42132 4.34662 5.07692 4.77419 5.07692H19.2258C19.6534 5.07692 20 5.42132 20 5.84615C20 6.27099 19.6534 6.61539 19.2258 6.61539H4.77419C4.34662 6.61539 4 6.27099 4 5.84615Z"/>
                            <path style={{fill: trashcolor}} fillRule="evenodd" clipRule="evenodd" d="M8.25655 3.49321C8.7499 2.57411 9.71292 2 10.7613 2H13.2387C14.2871 2 15.2501 2.57411 15.7435 3.49321L16.8121 5.48416C17.0134 5.85902 16.8706 6.32497 16.4934 6.52489C16.1161 6.72481 15.6471 6.583 15.4459 6.20815L14.3772 4.21719C14.153 3.79942 13.7152 3.53846 13.2387 3.53846H10.7613C10.2848 3.53846 9.84702 3.79942 9.62277 4.21719L8.55408 6.20815C8.35287 6.583 7.88391 6.72481 7.50664 6.52489C7.12937 6.32497 6.98664 5.85902 7.18786 5.48416L8.25655 3.49321Z"/>
                            </svg>
                          </div>

                        </div>
                    </div>
                    );
                  }})
              }
            
            <div style={{display: bigScreen?'flex':'none'}} id='additem' onClick={(event)=>{
                setArr([...arr,''])
            }} 
            className='transition-colors hover:cursor-pointer hover:bg-gray-200 ml-4 my-2 bg-white items-center justify-center flex w-28 h-10 rounded-md'>
              <div className='flex items-center justify-center w-4 h-4 mr-3'>
                <img width={14} src={Plus} alt="Plus" />
              </div>
              <div className='font-medium text-sm'>
                Add item
              </div>
            </div>
          
          </div>
        </div>

          {/* completed */}
          <div style={{borderTopWidth: 1, borderTopColor: 'rgb(230,230,230)', display: (done.length === 1 || !bigScreen)?'none':'flex'}} className='flex flex-col'>
              
              <div className='flex my-1 group justify-between items-center'>
                <div className='h-14 flex items-center justify-center ml-1'>
                  <div onClick={()=>{
                    setShowcompleted(!showCompleted)
                  }} onMouseEnter={()=>{setDown('rgb(22,22,22)')}} onMouseLeave={()=>{setDown('rgb(178,178,178)')}} className='flex items-center justify-center mr-1 w-5 h-5'>
                    <svg style={showCompleted?{}:{transform: 'rotate(-90deg)'}} className='transition-opacity opacity-0 group-hover:opacity-100' width="10px" height="10px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.49988 12L-0.00012207 4L14.9999 4L7.49988 12Z" fill={down}/>
                    </svg>
                  </div>
                  <div className='font-semibold flex items-center'>
                    Completed {showCompleted?null:`(${done.length - 1})`}
                  </div>
                </div>
                <div onClick={()=>{
                  setDone([''])
                  }} className='flex items-center justify-center h-8 w-8 mr-2 hover:cursor-pointer'>
                  {/* <img src={Trash} alt="Trash" className='transition-opacity opacity-0 group-hover:opacity-100 hover:stroke-white'/> */}
                  <svg className='' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path style={{fill: 'black'}} fillRule="evenodd" clipRule="evenodd" d="M5.8662 8.15407C6.29365 8.16442 6.63173 8.5171 6.62131 8.94181L5.84735 8.92308L5.07338 8.90434C5.0838 8.47963 5.43876 8.14373 5.8662 8.15407ZM5.84735 8.92308C5.07338 8.90434 5.07338 8.90434 5.07338 8.90434L5.07235 8.94807L5.06956 9.07238C5.06721 9.18044 5.06396 9.33725 5.06034 9.53284C5.05312 9.92395 5.04446 10.4705 5.03868 11.0925C5.02716 12.333 5.02698 13.8865 5.07371 15.1062C5.12484 16.4402 5.26247 18.1669 5.37603 19.4527C5.50429 20.9048 6.73177 22 8.18698 22H15.813C17.2682 22 18.4957 20.9048 18.624 19.4527C18.7375 18.1669 18.8752 16.4402 18.9263 15.1062C18.973 13.8865 18.9728 12.333 18.9613 11.0925C18.9555 10.4705 18.9469 9.92395 18.9397 9.53284C18.936 9.33725 18.9328 9.18044 18.9304 9.07238L18.9277 8.94807L18.9266 8.90515C18.9162 8.48044 18.5612 8.14373 18.1338 8.15407C17.7063 8.16442 17.3683 8.5171 17.3787 8.94181L17.8719 8.92987C17.3787 8.94181 17.3787 8.94181 17.3787 8.94181L17.3797 8.98354L17.3824 9.10565C17.3847 9.2122 17.388 9.36732 17.3915 9.56106C17.3987 9.94862 17.4073 10.4903 17.413 11.1067C17.4245 12.3427 17.4243 13.8661 17.379 15.0477C17.3295 16.3412 17.1948 18.0358 17.0815 19.3182C17.0245 19.9641 16.4774 20.4615 15.813 20.4615H8.18698C7.52258 20.4615 6.97554 19.9641 6.91849 19.3182C6.80522 18.0358 6.67055 16.3412 6.62098 15.0477C6.5757 13.8661 6.57552 12.3427 6.587 11.1067C6.59273 10.4903 6.60132 9.94862 6.60847 9.56106C6.61205 9.36732 6.61527 9.2122 6.61759 9.10565L6.62032 8.98354L6.62131 8.94181L5.84735 8.92308Z"/>
                  <path style={{fill: 'black'}} fillRule="evenodd" clipRule="evenodd" d="M4 5.84615C4 5.42132 4.34662 5.07692 4.77419 5.07692H19.2258C19.6534 5.07692 20 5.42132 20 5.84615C20 6.27099 19.6534 6.61539 19.2258 6.61539H4.77419C4.34662 6.61539 4 6.27099 4 5.84615Z"/>
                  <path style={{fill: 'black'}} fillRule="evenodd" clipRule="evenodd" d="M8.25655 3.49321C8.7499 2.57411 9.71292 2 10.7613 2H13.2387C14.2871 2 15.2501 2.57411 15.7435 3.49321L16.8121 5.48416C17.0134 5.85902 16.8706 6.32497 16.4934 6.52489C16.1161 6.72481 15.6471 6.583 15.4459 6.20815L14.3772 4.21719C14.153 3.79942 13.7152 3.53846 13.2387 3.53846H10.7613C10.2848 3.53846 9.84702 3.79942 9.62277 4.21719L8.55408 6.20815C8.35287 6.583 7.88391 6.72481 7.50664 6.52489C7.12937 6.32497 6.98664 5.85902 7.18786 5.48416L8.25655 3.49321Z"/>
                  </svg>
                </div>   
              </div>
                        
              { showCompleted?
                done.map((word: any,key: any)=>{
                  if(word===''){
                    return null
                  }
                  else{
                    return(
                    <div className='font-medium flex mb-2 justify-between group items-start' key={key}>
                     
                     <div className='w-58 flex ml-6'>
                        <div onClick={()=>{
                          arr.splice(1, 0, word);
                          setArr([...arr])

                          done.splice(key,1)
                          setDone([...done])
                        }} 
                        className='hover:bg-gray230 duration-200 transition-colors w-6 h-6 flex items-center justify-center rounded-xl'>
                          <img src={Check} alt="Check" />
                        </div>
                        <div className='w-52 ml-2'>
                        {word}
                        </div>
                      </div>
                      <div onClick={()=>{
                        done.splice(key,1)
                        setDone([...done])
                        }} className='flex items-center justify-center h-8 w-8 mr-2 hover:cursor-pointer' onMouseEnter={()=>{setDoneTrashcolor('rgb(22,22,22)')}} onMouseLeave={()=>{setDoneTrashcolor('rgb(178,178,178)')}}>
                        {/* <img src={Trash} alt="Trash" className='transition-opacity opacity-0 group-hover:opacity-100 hover:stroke-white'/> */}
                        <svg className='transition-opacity opacity-0 group-hover:opacity-100' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{fill: donetrashcolor}} fillRule="evenodd" clipRule="evenodd" d="M5.8662 8.15407C6.29365 8.16442 6.63173 8.5171 6.62131 8.94181L5.84735 8.92308L5.07338 8.90434C5.0838 8.47963 5.43876 8.14373 5.8662 8.15407ZM5.84735 8.92308C5.07338 8.90434 5.07338 8.90434 5.07338 8.90434L5.07235 8.94807L5.06956 9.07238C5.06721 9.18044 5.06396 9.33725 5.06034 9.53284C5.05312 9.92395 5.04446 10.4705 5.03868 11.0925C5.02716 12.333 5.02698 13.8865 5.07371 15.1062C5.12484 16.4402 5.26247 18.1669 5.37603 19.4527C5.50429 20.9048 6.73177 22 8.18698 22H15.813C17.2682 22 18.4957 20.9048 18.624 19.4527C18.7375 18.1669 18.8752 16.4402 18.9263 15.1062C18.973 13.8865 18.9728 12.333 18.9613 11.0925C18.9555 10.4705 18.9469 9.92395 18.9397 9.53284C18.936 9.33725 18.9328 9.18044 18.9304 9.07238L18.9277 8.94807L18.9266 8.90515C18.9162 8.48044 18.5612 8.14373 18.1338 8.15407C17.7063 8.16442 17.3683 8.5171 17.3787 8.94181L17.8719 8.92987C17.3787 8.94181 17.3787 8.94181 17.3787 8.94181L17.3797 8.98354L17.3824 9.10565C17.3847 9.2122 17.388 9.36732 17.3915 9.56106C17.3987 9.94862 17.4073 10.4903 17.413 11.1067C17.4245 12.3427 17.4243 13.8661 17.379 15.0477C17.3295 16.3412 17.1948 18.0358 17.0815 19.3182C17.0245 19.9641 16.4774 20.4615 15.813 20.4615H8.18698C7.52258 20.4615 6.97554 19.9641 6.91849 19.3182C6.80522 18.0358 6.67055 16.3412 6.62098 15.0477C6.5757 13.8661 6.57552 12.3427 6.587 11.1067C6.59273 10.4903 6.60132 9.94862 6.60847 9.56106C6.61205 9.36732 6.61527 9.2122 6.61759 9.10565L6.62032 8.98354L6.62131 8.94181L5.84735 8.92308Z"/>
                        <path style={{fill: donetrashcolor}} fillRule="evenodd" clipRule="evenodd" d="M4 5.84615C4 5.42132 4.34662 5.07692 4.77419 5.07692H19.2258C19.6534 5.07692 20 5.42132 20 5.84615C20 6.27099 19.6534 6.61539 19.2258 6.61539H4.77419C4.34662 6.61539 4 6.27099 4 5.84615Z"/>
                        <path style={{fill: donetrashcolor}} fillRule="evenodd" clipRule="evenodd" d="M8.25655 3.49321C8.7499 2.57411 9.71292 2 10.7613 2H13.2387C14.2871 2 15.2501 2.57411 15.7435 3.49321L16.8121 5.48416C17.0134 5.85902 16.8706 6.32497 16.4934 6.52489C16.1161 6.72481 15.6471 6.583 15.4459 6.20815L14.3772 4.21719C14.153 3.79942 13.7152 3.53846 13.2387 3.53846H10.7613C10.2848 3.53846 9.84702 3.79942 9.62277 4.21719L8.55408 6.20815C8.35287 6.583 7.88391 6.72481 7.50664 6.52489C7.12937 6.32497 6.98664 5.85902 7.18786 5.48416L8.25655 3.49321Z"/>
                        </svg>
                      </div>
                      
                    </div>
                    );
                  }
                })
                :null
              }
          </div>
        
      </div>
    </div>
  );
}

export default App;
