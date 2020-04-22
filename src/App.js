import React, {useState, useEffect} from 'react'
import {animated, useSpring, config} from 'react-spring'

import {COUNTRIES} from './data/data'
import '../src/App.css'

const App = () => {
  const [data, setData] = useState(COUNTRIES);
  const [num, setNum] = useState(0)
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

    if(num === data.length -1 && type === 'plus') {
      setNum(0)
    } else if(num === 0 && type === 'minus') {
      setNum(data.length -1)
    }
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
    setIsActive(false)
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
      background: 'rgba(19, 19, 19, .8)',
      display: 'none',
      zIndex: '20',
      opacity: 0
    },
    to: {
      display: toggle ? 'flex' : 'none',
      opacity: 1
    },
    delay: 100
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
          {data[num === data.length -1 ? 0 : num +1].province}
        </button>
        <button 
          className = 'prev' onClick = {() => {handleType('minus')}}>
          {data[num === 0 ? data.length -1 : num -1].province}
        </button>
      </div>
    </div>
    <animated.div style= {props} className="expand-content">
      <animated.div styles= {fadeIn} className="expand-content-inner">
        <h3>{title}</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, est, recusandae necessitatibus, itaque quidem pariatur laboriosam quasi amet neque laudantium saepe incidunt? Deleniti dignissimos quis inventore deserunt obcaecati iure ullam, voluptas asperiores dolorem aliquid! Similique corrupti consequatur maxime itaque dicta voluptate vero praesentium laudantium dolor? Voluptatum esse porro magnam omnis?</p>
        <img src={image} alt={title} style = {fadeIn} />
      </animated.div>
    </animated.div>
</>
  )
}

export default App;