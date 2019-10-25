import React from 'react';
import Card from './components/Card'
import Overlay from './components/Overlay'

// App Configuration

import { foldingTime,loadingTime } from './config/config'


// Actions
import { shuffle, unfold_all, fold_all,game_over_check } from './actions/card'
import { connect } from 'react-redux';

// Styling
import './App.css'


class App extends React.Component {

  state = {
    isLoading:true
  }

  componentDidUpdate()
  {
    this.props.dispatch(game_over_check())
  }
 

 componentWillMount() {
    this.props.dispatch(shuffle())
}
  componentDidMount(){
      this.setState({ isLoading:false },() => {
        setTimeout(() => {this.props.dispatch(fold_all())},foldingTime)
      })

  }

  render()
  {

    return (
      <div>

        


         <div className="App App-grid">

           {
            this.state.isLoading && <Overlay should_load={true} message="Welcome, The Game Will Start Shortly!...."/>
           }

           {
             this.props.game_over && <Overlay should_load={false} message="Congrats u won!" should_retry={true} />
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
                      <h5 className="header-custom">
                        Correctly Guessed
                      </h5>
                      <div className="remaining-cards-grid">
                        {
                         this.props.correct.length == 0 ? 'No Guesses' : this.props.correct.map(card => <img src={`/cards/${card.replace('card-','')}.png`}  style={{width:'40px',height:'auto'}} />)
                        }

                        </div> 
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
    game_over:state.game.game_over
  }
}
export default connect(mapStateToProps)(App) ;
