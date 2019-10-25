import React from 'react'
// Actions
import { unfold_single,
         fold_single,
        unfold_all,
        hide_wrong_guessed,
        fold_all,
        pop_new_guess,
        push_new_guess,
        match 
    } from '../actions/card'

// Styles 
import { connect } from 'react-redux';
import './Card.css'

const fold_unfold = ['flip-card','rotate-flip-card']

class Card extends React.Component {

    state = {
        bg:"",
        bg_back:"",     
        is_fliped: false
    }

    

    componentDidMount()
    {
        const bg_back = `url(/cards/cards-back.jpg)`;
        const bg = `url(/cards/${this.props.image})`;
        this.setState({bg,bg_back})
    }

    handleTransition = (e) => 
    {   e.stopPropagation()
        const this_card = this.props.card
        if(!this_card.is_disabled){
            if(!this_card.is_fliped )
        {                        
            this.props.dispatch(fold_single(this_card.id))    
                      
            this.props.dispatch(push_new_guess(this_card))             
            
            if(this.props.guessed.length == 3){
                this.props.dispatch(match(this_card))
            }
            
            if(this.props.wrong_guess) {
                 this.props.dispatch(hide_wrong_guessed())
            }

        }
        else 
        {   
            this.props.dispatch(unfold_single(this_card.id))
            this.props.dispatch(pop_new_guess(this_card))             

        }
        }
      
    }
    render()
    {
        const this_card = this.props.card
        return (
            <div className={`flip-card-container ${this_card.is_disabled && 'disable-out'}`}>
            <div className={!this_card.is_fliped ? fold_unfold[0] : fold_unfold.join(' ')} onClick={this.handleTransition} >
                    <div style={{backgroundImage:this.state.bg_back}} className="thefront"></div>
                    <div style={{backgroundImage:this.state.bg}} className="theback"></div>
            </div>
        </div>
            )
    
    }
}

const mapStateToProps = ({ game },ownProps) => {
   return {
        card:game.cards.filter(card => ownProps.id == card.id)[0],
        guessed:game.guesses,
        wrong_guess:game.wrong_guess
    }
   
}
export default connect(mapStateToProps)(Card)