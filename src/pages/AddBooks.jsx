import React  from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddBooks = () => {
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
    .post('http://localhost:1000/api/v1/add', Data)
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
      <div className='container  p-5'>
      <div className="mb-3"  >
        <label for="exampleFormControlInput1" className="form-label text-white">Book name</label>
        <input name = 'name' type="text" className="form-control" id="exampleFormControlInput1" placeholder="enter book name" onChange={change} value={Data.name} />
      </div>
      <div className="mb-3"  >
        <label for="exampleFormControlInput1" className="form-label text-white">Author</label>
        <input name ='author' type="text" className="form-control" id="exampleFormControlInput1" placeholder="enter author name" onChange={change} value={Data.author} />
      </div>
      <div className="mb-3"  >
        <label for="exampleFormControlInput1" className="form-label text-white">Description</label>
        <input name='description' type="text" className="form-control" id="exampleFormControlInput1" placeholder="Book Description..." onChange={change} value={Data.description}/>
      </div>
      <div className="mb-3"  >
        <label for="exampleFormControlInput1" className="form-label text-white">Image</label>
        <input name='image' type="text" className="form-control" id="exampleFormControlInput1" placeholder="enter image url" onChange={change} value={Data.image}/>
      </div>
      <div className="mb-3"  >
        <label for="exampleFormControlInput1" className="form-label text-white">Price</label>
        <input name='price' type="number" className="form-control" id="exampleFormControlInput1" placeholder="enter book price" onChange={change} value={Data.price}/>
      </div>
      <button className='btn btn-success' onClick={submit}>Submit</button>
      
      </div>
    </div>
  );
};

export default AddBooks;
