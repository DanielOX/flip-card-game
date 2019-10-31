import React from 'react';
import Card from './components/Card'
import Timer from './components/Timer'
import Overlay from './components/Overlay'
import Scoreboard from './components/Scoreboard';

// App Configuration

import { foldingTime,loadingTime } from './config/config'


// Actions
import { shuffle, unfold_all, fold_all,game_over_check,game_over } from './actions/card'
import { connect } from 'react-redux';

// Styling
import './App.css'


class App extends React.Component {

  state = {
    isLoading:true,
  }



  componentDidUpdate()
  {
    this.props.dispatch(game_over_check())
  }
 

  componentWillMount() 
  {
      this.props.dispatch(shuffle())
  }

  componentDidMount()
  { 
      setTimeout(() => {
        this.setState({ isLoading:false },() => {
          setTimeout(() => {this.props.dispatch(fold_all())},foldingTime)
        })
      },loadingTime)
  }

  render()
  {

    return (
      <div>

         <div className="App App-grid">

           {
            this.state.isLoading && <Overlay  should_load={true} message="Welcome, The Game Will Start Shortly!...."/>
           }

           {
             this.props.game_over && <Overlay should_load={false} message="Game Over" should_retry={true} />
           }
           {/* DECK COLUMN*/}
           
            <div className="deck-grid">
              {
                this.props.cards.length > 0 && this.props.cards.map((card,index) => 
                  <Card 
                  key={index}
                  id={card.id}
                  className={"col"}
                  image={card.img}
                />
              )}
          </div>

             {/* PROFILE COLUMN*/}


                <div className="profile-column">

                   {/*   Correctly Guessed Cards  */}

                    <div>

                      {  <center><Timer  isPlaying={this.props.should_timer_start} /></center> }

                    </div>
                  <div>
                    <center>
                    <Scoreboard />
                    </center>

                  </div>

                    {/*   Remaining Cards  */}
                    <div>
                      <h5 className="header-custom">
                        Remaining Card

                      </h5>
                      <div className="remaining-cards-grid">
                        {
                          this.props.to_be_guessed.map(card => <img src={`/cards/${card}.png`}  style={{width:'40px',height:'auto'}} />)
                        }
                      </div>
                    </div>

                </div>


        </div>
      </div>
      );
}


}
const mapStateToProps = (state,ownProps) => {
  return {
    cards:state.game.cards,
    correct:state.game.correct,
    to_be_guessed:state.game.to_be_guessed,
    game_over:state.game.game_over,
    should_timer_start:state.game.should_timer_start
  }
}
export default connect(mapStateToProps)(App) ;
