import React, { SyntheticEvent } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { project1Login } from '../../remote/Project1User';

export class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            username:'',
            password:''
        }
    }

    updateUsername = (e:any) => {
        this.setState({
            ...this.state,
            username: e.target.value
        })
    }

    updatePassword = (e:any) => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    submitLogin = async (e:SyntheticEvent) => {
        e.preventDefault()
        let user = await project1Login(this.state.username, this.state.password);
        this.setState({
            ...this.state,
            user
        })
    }
    render() {
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleUsername">Username</Label>
                                <Input type="text" name="username" id="exampleUsername" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button>Sign in</Button>
                </Form>
            </div>
        );
    }
}