import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { timer_in_minutes } from '../config/config'
import { connect } from 'react-redux'
import { time_up } from '../actions/card';

const Timer = (props) => {
    return (
        <div className="center">
            <CountdownCircleTimer 
                 durationSeconds={timer_in_minutes * 60}
                 colors={
                    [
                        ['#34e89e', .33],
                        ['#0f3443', .33],
                    ]
                 }
                 strokeWidth={5}
                 isLinearGradient
                 isPlaying={props.isPlaying}
                 size={120}
                 renderTime = {(Remaining,Elapsed,isPlaying) => <p> {Remaining} <br /> </p>}
                 onComplete = { () =>  { props.dispatch(time_up()) }}

            />
        </div>
    )
}


export default connect()(Timer)