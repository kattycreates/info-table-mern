import axios from 'axios';
import React,{useState} from 'react'
import './modalForm.css'
const ModalForm = ({setShow,name,setName,phone,setPhone,email,setEmail,hobbies,setHobbies,setEdit,edit,id,setId}) => {

 const [error,setError]=useState(false);
 const [message,setMessage]=useState({});


  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    let user;
    let newData={
      name,phone,email,
      hobbies:hobbies.split(',')
    };
   try{
    setError(false);
    if(edit){
      user=await axios.put(`/api/users/${id}`,newData);
    }
    else{
      user=await axios.post('/api/users/',newData);
    }
    setName('');
    setPhone('');
    setEmail('');
    setHobbies('');
    setId('')
    setShow(false);
    setEdit(false);
    window.location.reload(false);
  
   }
   catch(error){
    setError(true);
    setMessage(error);
    console.log('error',error)
   }

    
    
  }
  const handleClose=()=>{
    setShow(false);
    setEdit(false);
    if(edit){
      setName('');
      setPhone('');
      setEmail('');
      setHobbies('');
      setId('')
    }
  }

  return (
    <div className='modal-form'>
      <div className='form'>
      {error&&<div className='error-div'>{message.response.data.error}</div>}
        <span className='close' onClick={handleClose}>x</span>
        <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' value={name} onChange={(e)=>setName(e.target.value)} required />
              <label htmlFor='phone'>Phone number</label>
              <input type='tel' id='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <label htmlFor='hobbies'>Hobbies</label>
              <input type='text' id='hobbies' value={hobbies} onChange={(e)=>setHobbies(e.target.value)} required />
              <button type='submit' className='submit'>{edit?"Update":"Submit"}</button>
          </form>
      </div>
        
    </div>
  )
  
}

export default ModalForm


