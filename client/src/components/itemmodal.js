import React,{ Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';


import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
// import { v4 as uuidv4 } from 'uuid';


class ItemModal extends Component
{
    state = {
        modal: false,
        name:''
    }
 

toggle = () => {
       this.setState({
           modal: !this.state.modal
       });
}

onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
}



//when we deal with the backend the mongodb itself creates an ID on its own but right now we have to create our own id so we bringing back again UUID
onSubmit = e => {
    e.preventDefault();

    const newItem = {
        // id: uuidv4(),            //mongodb creates id itself so we dont need this id 
        name: this.state.name
    };

    //Add item via addItem action
    this.props.addItem(newItem);

    //close modal   
    this.toggle();
}




render()
{
    return(
        <div>
            <link rel="shortcut icon" href="#" />

            <Button
                color= "dark"
                style ={{ marginBottom: '8rem' }}
                onClick = { this.toggle }

            
            >Add Item
            </Button>
            <Modal
            isOpen = {this.state.modal}
            toggle={this.toggle}
            
            >
            <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>

            <ModalBody>
                <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                        <Label for="item">
                            Item
                        </Label>
                        <Input
                        type = "text"
                        name = "name"
                        id = "item"
                        placeholder = "Add shopping Item"
                        onChange={this.onChange}
                        >
                        </Input>

                        <Button color="dark" style = {{marginTop:"2rem"}} block>
                            Add Item

                        </Button>
                    </FormGroup>

                </Form>
            </ModalBody>
            </Modal>

        </div>
    )
}
}
const mapStateToProps = state => ({
    item: state.item
});


export default connect(mapStateToProps, { addItem })(ItemModal);
