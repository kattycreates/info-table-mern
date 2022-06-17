import {useState,useEffect, useCallback} from 'react';
import './App.css';
import axios from 'axios';
import Row from './components/row/Row';
import ModalForm from './components/modalForm/ModalForm';
function App() {
  const [data,setData]=useState([]);
  const [show,setShow]=useState(false);
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [hobbies,setHobbies]=useState('');
  const [edit,setEdit]=useState(false);
  const [id,setId]=useState('');
  const [selected,setSelected]=useState([]);
  const [sort,setSort]=useState();
  const [showAlert,setShowAlert]=useState(false);
  const [alertMessage,setAlertMessage]=useState('');
 

  const handleSort=useCallback((allData)=>{
    //e.preventDefault();
    let sortedData=allData;
    
    if(sort==='Ascending'){
      sortedData=sortedData.sort((a,b)=>{
        a=a.name.toLowerCase();
        b=b.name.toLowerCase();
        return a>b?1:a<b?-1:0});
      
    }
    if(sort==='Descending'){
      sortedData=sortedData.sort((a,b)=>{ 
        a=a.name.toLowerCase();
        b=b.name.toLowerCase();
        return a<b?1:a>b?-1:0});
     
    }
    
  
    return sortedData;
   

  },[sort]);

  useEffect(()=>{
    const getData=async()=>{
      let userData=await axios.get('http://localhost:5000/api/users/');
      let sortedData=handleSort(userData.data);
     
      setData(sortedData);
    }
    getData();
  },[handleSort]);

  const headings=['Select','ID','Name','Phone','Email','Hobbies','Update/Delete'];
  const handleClick=(e)=>{
    e.preventDefault();
    setShow(true);
  }
  const handleUpdate=async(user)=>{
    setEdit(true);
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
    setHobbies(user.hobbies.join(','));
    setId(user.id);
    setShow(true);
  }
  const handleSend=async(e)=>{
    e.preventDefault();
    if(selected.length!==0){
      if(window.confirm("Send data to info@redpositive.in?")){
        try{
          let response=await axios.post('http://localhost:5000/api/users/send',{data:selected});
          setShowAlert(true);
          setAlertMessage('Mail has been successfully sent!');
          console.log(response);
        }
        catch(err){
          setShowAlert(true);
          setAlertMessage("Sending failed!");
        }
      }
      
    }
    else{
      setShowAlert(true);
      setAlertMessage("Please select some rows to send data!");
    }
   
   
  }
  const handleCloseAlert=(e)=>{
    e.preventDefault();
    setShowAlert(false);
    window.location.reload(false);
  }

  

  return (
    <div className="App">
      {showAlert&&<div className='notif-div'>
        <p>{alertMessage}</p><button className='close-notif-btn' onClick={handleCloseAlert}>Close</button>
        </div>}
      <div className='top-bar'>
        <h2>Info</h2>
        <div className='sort-div'>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} >
            <option value={"Default"}>Default</option>
            <option value={"Ascending"}>Ascending</option>
            <option value={"Descending"}>Descending</option>
          </select>
        </div>
        
      </div>
      <div className='wrapper'>
        <table>
          <tbody>
            <tr>
              {headings.map((heading,i)=><th key={i}>{heading}</th>)}
            </tr>
            {data.map((user,i)=><Row key={i} user={user} handleUpdate={handleUpdate} selected={selected} setSelected={setSelected} />)}
          </tbody>
          
        </table>
      </div>
      <div className='btn-div'>
        <button className='btn' onClick={handleSend}>Send</button>
        <button className='btn' onClick={handleClick}>Add</button>
      </div>
      {show&&<ModalForm setShow={setShow} name={name} setName={setName} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} hobbies={hobbies} setHobbies={setHobbies} edit={edit} setEdit={setEdit} id={id} setId={setId} />}
    </div>
  );
}

export default App;
