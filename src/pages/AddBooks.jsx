import React  from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Home.css';


const AddBooks = () => {
  const token = localStorage.getItem('token');

  const [Data, setData] = useState({
    name:'',
    author:'',
    description:'',
    image:'',
    price:'',
  });
  const change = (e) => {
    const {name,value} = e.target;
    setData({...Data, [name] :value} );
  };
  const submit = async (e) =>{
    e.preventDefault();
    await axios 
    .post('https://bookwse.online/api/v1/add', Data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => alert(res.data.message));
    setData({
      name:'',
    author:'',
    description:'',
    image:'',
    price:'',
    });

  };

  console.log(Data);
  
  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "90vh" }}>
      <div className='container p-5 d-flex flex-row'>
        <div className="mb-3 d-flex flex-column">
          <div className='d-flex flex-row'>
            <div className="me-3">
              <label htmlFor="exampleFormControlInput1" className="form-label text-white">Book name</label>
              <input name='name' type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter book name" onChange={change} value={Data.name} />
            </div>
            <div style={{marginLeft: '2rem'}}>
              <label htmlFor="exampleFormControlInput2" className="form-label text-white">Author</label>
              <input name='author' type="text" className="form-control" id="exampleFormControlInput2" placeholder="Enter author name" onChange={change} value={Data.author} />
            </div>
          </div>
          <div className='d-flex flex-row'>
            <div className="me-3">
              <label htmlFor="exampleFormControlInput1" className="form-label text-white">Image</label>
              <input name='image' type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter image url" onChange={change} value={Data.image}/>
            </div>          
            <div className="me-2" style={{marginLeft: '2rem'}}>
              <label htmlFor="exampleFormControlInput4" className="form-label text-white">Price</label>
              <input name='price' type="number" className="form-control" id="exampleFormControlInput4" placeholder="Enter book price" onChange={change} value={Data.price}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label text-white">Description</label>
            <input name='description' type="text" className="form-control" id="exampleFormControlInput3" placeholder="Enter book description" onChange={change} value={Data.description}/>
          </div>
          <button className='btn btn-success' onClick={submit}>Submit</button>
        </div>
        <div className='image-container d-flex justify-content-center align-items-center' style={{flex: '1'}}>
        <img src='/add-book-logo.png' alt="Book Cover" style={{ width: '600px', height: '500px' }} />
      </div>
      </div>
    </div>
  );
  

};

export default AddBooks;
