//atlast importing this file on appNavbar.js to display there


import React,{ Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component
{
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }


static propTypes = { 
    isAuthenticated: PropTypes.bool,         // i am not going to do require because it can be null
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}







//to show the msg notification of error REGISTER_FAIL
componentDidUpdate(prevProps)
{
    const { error, isAuthenticated } = this.props;                                          //below we mapped the error in stateToProps
    if (error !== prevProps.error)
    {
        //check for the register error and this is where the id comes in
        if(error.id === 'REGISTER_FAIL')
        {
            this.setState({
                msg: error.msg.msg              //in redux there r two messages,if this msg has something in it we want to output alert, so putting alert above
                
            });
            
        }
        else
         {
            this.setState({ 
                msg: null
            });
        }
    }

    //to make sure the modal is open,to make sure that the value of modal above be true from false
    //if authenticated, close the modal
    //so once i hit the register submit button, it should hit the endpoint, should get added to the mongodb, 
    // and should get our token back, it should put in the state and we should basically be logged in because its gonna load the user and its gonna find the token
    if(this.state.modal)
    {
        if (isAuthenticated)
        {
            this.toggle();            //which will close the modal
        }
    }


}
 
   
toggle = () => {
    
    
    //clear Errors
    this.props.clearErrors();



    this.setState({
           modal: !this.state.modal
       });
};

onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
}



onSubmit = e => {
    e.preventDefault();

    //from register
    const { name, email, password } = this.state;

    //create user object
    const newUser = {
        name,
        email,
        password
    };

    //attempt to register
    this.props.register(newUser);
    


}




render()
{
    return(
        <div>

            {/* <Button
                color= "dark"
                style ={{ marginBottom: '8rem' }}
                onClick = { this.toggle }

            
            >Add Item
            </Button> */}

            <NavLink onClick={this.toggle} href="#">
                Register
            </NavLink>

            <Modal
            isOpen = {this.state.modal}
            toggle={this.toggle}
            
            >
            <ModalHeader toggle={this.toggle}>Register</ModalHeader>

            <ModalBody>

                { this.state.msg ? (
                    <Alert color='danger'>{this.state.msg} </Alert>
                ) : null }
   
                <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                        <Label for="name"> Name</Label>
                        <Input
                        type = "text"
                        name = "name"
                        id="name"
                        placeholder = "Name"
                        className = "mb-3"
                        onChange={this.onChange}
                        >
                        </Input>

                        
                        
                        
                        <Label for="email">Email</Label>
                        <Input
                        type = "email"
                        email = "email"
                        id="email"
                        placeholder = "Email"
                        className = "mb-3"
                        onChange={this.onChange}
                        >
                        </Input>



                        <Label for="password">Password</Label>
                        <Input
                        type = "password"
                        name = "password"
                        id="password"
                        placeholder = "Password"
                        className = "mb-3"
                        onChange={this.onChange}
                        >
                        </Input>

                        <Button color="dark" style = {{marginTop:"2rem"}} block>
                            Register

                        </Button>
                    </FormGroup>

                </Form>
            </ModalBody>
            </Modal>

        </div>
    )
}
}


//As far as the state that we want to bring in, we want to bring in the value of isAuthenticated, because once we register we want to close it if we r authenticated
//another we want to add is errorState so that we can output the error message 
//and this auth and error , i am getting from reducer/index.js which will give us access to all the stuff within the state of the error and the auth reducer
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(
    mapStateToProps,
    { register,clearErrors }
    )(RegisterModal);

