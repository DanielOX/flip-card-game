import React from 'react'
import './Overlay.css'
export default function Overlay(props) {
    return (
        <div className="overlay">
          <div>
            <h4>
                {props.message}
            </h4>
            {props.should_load && 
            
                <img src={'/cards/loader.webp'} width="100px" height="auto" />
            }
            <br />
            {
                props.should_retry && 

                (
                <button className="btn btn-primary" >
                        Wanna Try Again ?
                </button>
                )
            }
          </div>   
        </div>
    )
}
