import React from 'react'
import { Link } from 'react-router-dom'

export default function Dcard({item:{id,image,title,desc,sidepara,paraimage1,paraimage2}}) {
   
  return (
    <>
    <div className='items'>
        <div className='img' >
            <img src={image} alt='' />
            <Link to={`/detailspage/${id}`} className='blog-item-link'>
            <i class="fas fa-external-link-alt"></i>
            </Link>
        </div>
        <div className='title'>
            <h3 >{title}</h3>
        </div>
    </div>
    </>
  )
}
