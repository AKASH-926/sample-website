import React from 'react'
import Hero from './hero content/hero'
import Navbar from './navbar/navbar'

import Cards from './cards/Cards'
import Handles from './handles/Handles'
export default function Welcome() {
  return (
    <>
      <Navbar />
      <Hero />
      <div id='card-area'>
        <span><Cards head={"WHAT WE DO"} para={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda veniam accusamus est alias repellat rem, itaque quisquam beatae amet! Atque optio numquam velit ratione odio obcaecati dolore dolor nam fuga?"} /></span>
        <span><Cards head={"OUR SERVICES"} para={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda veniam accusamus est alias repellat rem, itaque quisquam beatae amet! Atque optio numquam velit ratione odio obcaecati dolore dolor nam fuga?"} /></span>
        <span><Cards head={"OUR PARTNERS"} para={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda veniam accusamus est alias repellat rem, itaque quisquam beatae amet! Atque optio numquam velit ratione odio obcaecati dolore dolor nam fuga?"} /></span>
      </div>
      <Handles />
    </>
  )
}
<p></p>