import React from 'react'
import mobile from '../../../Assets/gallery/Group 1204.png';
import app from '../../Assets/../../Assets/gallery/google.jpg'
import play from '../../Assets/../../Assets/gallery/app.png'
import logo from "../../../Assets/gallery/logo2.png"
import './mobile.css'
import { Link } from 'react-router-dom';
export default function Mobile() {
  return (
    <div className='mobile' style={{paddingTop:'70px'}}>
        <div className='container'>
        <div className='download'>
    <img src={logo} style={{width:'300px'}}/>
    <h3>Download Our App <br/>and get All Our Benifits</h3>
    <Link to="https://drive.google.com/file/d/1C4NQ_x5SQYfx__dkUhPurPSPjNpn-Qnw/view?usp=sharing" style={{backgroundColor:'var(--alt)'}} className='btn'>Download Now</Link>
    <div className='store'>
        <img src={app} />
        <img src={play} />
    </div>
   </div>
   <img src={mobile}/>
        </div>
  
    </div>
  )
}
