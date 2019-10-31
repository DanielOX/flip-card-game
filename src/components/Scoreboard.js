import React from 'react'
import Modal from 'react-modal'
import './Scoreboard.css'
const fetchScores = () => {
   var a = localStorage.getItem('flip-card-game-storage')
   console.log(a)
    if(!a || a.length <= 0){
        return []
    }
    else {
        return JSON.parse(a)
    }
}



let stats = fetchScores()
 export default class Scoreboard extends React.Component  {
    state = {
        isOpen:false
    }

    calcAccuray = (a,b) => a == 0 && b == 0 ? 0 : (a/b)* 100 

    openModal = () => {
        this.setState({isOpen:true})
    }

    closeModal = () => {
        this.setState({isOpen:false})
    }

    render(){
        return (
            <div>
                <button className="mahroon-btn" onClick={this.openModal}>
                   View Scoreboard
                </button>

                <Modal
                    style={{zIndex:"1000000 !important",position:"absolute"}}
                    isOpen={this.state.isOpen}
                >
                    <button className="mahroon-btn" onClick={this.closeModal}> Close Scoreboard </button>
                    <table className="scoreboard-table" >
                        <thead>
                            <th>Game ID</th>
                            <th>Correct Guesses</th>
                            <th>Wrong Guesses</th>
                            <th>Accuracy</th>
                            <th>Played On</th>
                        </thead>
                        <tbody>
                            { 
                               ( stats && stats.length > 0 ) 
                                            
                                        ?

                                stats.map(stat => (
                                    <tr>
                                        <td> {stat.game_id} </td>
                                        <td>{stat.correct_guesses}</td>
                                        <td>{stat.wrong_guesses}</td>
                                        <td>{ this.calcAccuray(stat.correct_guesses,stat.correct_guesses + stat.wrong_guesses) }</td>
                                        <td>{stat.date}</td>
                                    </tr>
                                    ))  

                                        :
                                        (<tr>
                                            <td colSpan={5}> No scoreboard available. Please, play a game or two </td>
                                        </tr>)

                            }

                        </tbody>
                    </table>
                </Modal>

            </div>
        )
    }
}
