import React, {useState, useEffect} from 'react'
import {animated, useSpring, config} from 'react-spring'

import {COUNTRIES} from './data/data'
import '../src/App.css'

const App = () => {
  const [data, setData] = useState(COUNTRIES);
  const [num, setNum] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const [card, setCard] = useState('')
  const [x, setX] = useState('50px')
  const [y, setY] = useState('50px')
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState();
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  
  const handleType = type => {
    type === 'minus' ? setNum(prevNum => prevNum - 1)
    : setNum(prevNum => prevNum + 1);
    setToggle(false)
  }

  const showImgContent = (type, event) => {
     setCard(type)
     setIsActive(true)
     setX(event.clientX + 'px')
     setY(event.clientY + 'px')
  };

  const handleClick = ((index, event) => {
    setToggle(!toggle)
    setIndex(index);
    setImage(event.target.src)
    setTitle(event.target.alt)
    setX('100%')
    setY('100%')
  })


  const fadeIn = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(50px)',
      color: '#fff',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'translateY(0px)' : 'translateY(50px)',
    },
    config: config.wobbly,
  })

  const props = useSpring({
    config: config.gentle,
    from: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(19, 19, 19, .99)',
      width: '0px',
      height: '100%',
      display: 'none',
      borderRadius: '50%',
      zIndex: '20',
      opacity: 0
    },
    to: {
      width: toggle ? '500px' : '500px',
      borderRadius: '0%',
      display: toggle ? 'block' : 'none',
      opacity: 1
    },
    delay: 300
  })

  return ( 
    <> 
    <div className="container" style = {{
      backgroundImage: `url(${data[num].image})`
    }}>
      <div className="content">
        <h1>{data[num].province}</h1>
        <div className="about">
          <h4>Capital: <span>{data[num].capital}</span> | </h4>
          <h4>Population: <span>{data[num].population}</span></h4>
        </div>

        <div className="images">
          {
            data[num].images.map((image, index) => (
              <img 
                src={image.url} 
                alt={image.caption} 
                onClick = {(e) => {handleClick(index, e)}}
                onMouseMove = {(event) => {showImgContent(image.caption , event)}}
              />
            ))
          }
        </div>
      </div>

      <div className="card" 
            style = {{ position: 'absolute', top: y, left: x, opacity: isActive ? 1 : 0 }}>
          <h4>{card}</h4>
      </div>

      <div className="buttons">
        <button 
          className = 'next' onClick = {() => {handleType('plus')}}>
          {data[num + 1].province}
        </button>
        <button 
          className = 'prev' onClick = {() => {handleType('minus')}}>
          {data[num - 1].province}
        </button>
      </div>
    </div>
    <animated.div style= {props} className="expand-content">
      <animated.h3 style = {fadeIn}>{title}</animated.h3>
      <animated.p style = {fadeIn}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, est, recusandae necessitatibus, itaque quidem pariatur laboriosam quasi amet neque laudantium saepe incidunt? Deleniti dignissimos quis inventore deserunt obcaecati iure ullam, voluptas asperiores dolorem aliquid! Similique corrupti consequatur maxime itaque dicta voluptate vero praesentium laudantium dolor? Voluptatum esse porro magnam omnis?</animated.p>
        <animated.img src={image} alt={title} style = {fadeIn} />
    </animated.div>
</>
  )
}

export default App;