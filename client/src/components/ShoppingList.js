import  React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

import { connect } from 'react-redux';    //allows us to basically to get state from redux into react into a react component
import { getItems, deleteItem } from '../actions/itemActions';   //when we call getitems it will send the action.type or it will dispatch to the reducer and then returns the state to the component
import PropTypes from 'prop-types';

class ShoppingList extends Component
{
    // state = {
    //     items: [
    //         { id: uuidv4(), name:"egg" },
    //         { id: uuidv4(), name:"milk" },
    //         { id: uuidv4(), name:"meat" },
    //         { id: uuidv4(), name:"proteins" }
            
    //     ]
    // }

//now we r gonna call this getitems from the component using reducers so removing the states from the components coz we want it to come from our redux reducer our item reducer
//when you want to make API request or calling an action we do it
//before we used to access(this).state from the component but we r now using state from our reducer from our store
componentDidMount()
{
    this.props.getItems();
}







onDeleteClick = id => {
    this.props.deleteItem(id);
};










    render()
    {
        // const { items } = this.state
        //state from reducer component react and mapping the state to props
          //item represents the whole state but items represents only to an array

        const { items } = this.props.item           
        return(
            <Container>
                <link rel="shortcut icon" href="#" />

                {/* <Button
                color="dark"
                style={{ marginBottom: "2rem" }}
                onClick={ () => {
                    const name = prompt('Enter the Item');
                    if(name)
                    {
                        this.setState(state => ({
                            items: [...state.items, {id: uuidv4(), name}]
                        }));
                    }
                } }
                
                >
                    Add Item

                </Button> */}

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name}) => (
                            <CSSTransition key = {_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                    className="remove-btn"
                                    color="primary"
                                    size="sm"
                                    // onClick={() => {
                                    //     this.setState(state => ({
                                    //         items: state.items.filter(item => item.id !== id)
                                    //     }));
                                    // }} 

                                    //when we click the delete button its going to call on delete click its gonna pass the ID in which comes in right above the delete function
                                    //and then we r gonna call the action delete item pass in the ID which is this here in the itemaction.js and then from there its going to get
                                    //sent to the reducer along with the payload and then in the reducer we r going to do the same thing we did before with the filter except we r
                                    //using action.payload which should include the ID so , and hence in this way we can delete the item by using ID
                                    onClick = {this.onDeleteClick.bind(this, _id)}     
                                    >
                                        &times;
                                    </Button>
                                    { name }
                                </ListGroupItem>

                            </CSSTransition>
                        ) )}
                    </TransitionGroup>
                </ListGroup>
            </Container>

        )
    }
}


//when you bring an action from redux to react its going to be stored as prop
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired     //it respresents our state which is going to be object
}

//when i say it represents our state it is a prop but we r mapping it from the state so we r mapping those the redux state to a component property
const mapStateToProps = (state) => ({
    item: state.item
});


//mapStateToProps allows us to take our items state in this case this is our state and 
//we want to basically turn this or map this into a component property so that we can 
//use it in the shopping lists so we want to use it as this.props.items
export default connect(mapStateToProps,{ getItems, deleteItem })(ShoppingList);