import axios from 'axios'
import React from 'react'
import './row.css'
const Row = ({user,handleUpdate,selected,setSelected}) => {
  const handleChange=(e)=>{
    if(e.target.checked){
      setSelected(selected.concat(user));
    }
    else{
      let arr=selected.filter(item=>item.id!==user.id);
      setSelected(arr);
    }
  }
  const handleDelete=async(e)=>{
    e.preventDefault();
    if(window.confirm("Delete data permanently?")){
      let url=`http://localhost:5000/api/users/${user.id}`;
      let deletedData=axios.delete(url);
      console.log('deleted data',deletedData.data);
      window.location.reload(false);
    }
    
  }
  return (
    <tr className='row'>
        <td><input type="checkbox" className='check' value={user} id={user.id} onChange={handleChange} /></td>
        <td>{user.id}</td>
        <td>{user.name[0].toUpperCase()+user.name.slice(1)}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.hobbies.join(', ')[0].toUpperCase()+user.hobbies.join(', ').slice(1)}</td>
        <td className='icon-div'><i className='fa fa-edit fa-lg icons' title='Update' onClick={()=>handleUpdate(user)}></i><i className='fa fa-trash fa-lg icons' title='Delete' onClick={handleDelete}></i></td>
    </tr>
  )
}

export default Row