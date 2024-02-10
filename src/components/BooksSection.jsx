import React from 'react'

const BooksSection = ({ data }) => {
  console.log(data)
  return (
    <div className='d-flex justify-content-around align-items-center flex-wrap my-3 '> 
    {data && data.map((item, index) =>(
        <div className='card my-3' style={{width:'200px', height:'350px', border:'5px solid black', borderRadius:'20px'}}>
        <div><img 
        style={{width:'200px', height:'210px', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}
        className='img-fluid' src={item.image} alt='/'/></div>
        <b>{item.author}</b> 
        <h6 style={{fontSize:'12px'}} className='px-2 m-1 text-sliver' >{item.name.slice(0,20)}</h6>
        <b style={{color:'red'}}className='mb-2 px-2'>Rs.{item.price}</b>
        <b>{item.description}</b>
        {/* <div className='d-flex justify-content-around align-items-center my-2'>
        <button className='btn btn-danger'>Delete</button>
        </div> */}
        </div>
    ))} 

    </div>
  );
};

export default BooksSection
