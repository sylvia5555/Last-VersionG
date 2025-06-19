import React from 'react'
import Landing from './landing/Landing'
import MiniAbout from './landing/MiniAbout'
import ArtifactsShowcase from './landing/Artifacts/ArtifactsShowcase'
import Timeline from './landing/timeline/Timeline'
import Testimonials from "./Testemonials/Testimonials"
import Sound from './landing/soundsection/Sound'
import Header from './Header/Header'
import "./landing/landing.css"
import Mobile from './landing/mobile/Mobile'
import Footer from './footer/Footer'

export default function Home() {
  return (
    <div>
      <Header/>
      <Landing />
      <MiniAbout/>
      <ArtifactsShowcase/>
      <div className='background'>
      </div>
      <Timeline />
      <Testimonials />
      <Mobile />
    </div>
  )
}
