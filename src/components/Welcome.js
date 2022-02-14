import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { StopwatchFill } from "react-bootstrap-icons";

export default function Welcome() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/homepage')
            }
        })
    })

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((error) =>
            alert(error.message)
        )
    }

    const handleRegister = () => {
        if(registerInformation.email !== registerInformation.confirmEmail) {
            alert('Emails do not match')
            return
        } else if(registerInformation.password !== registerInformation.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).then(() => {
            navigate('/homepage')
        }).catch((error) =>
            alert(error.message)
        )
    }

  return (
    <div>
        <Container className="mt-5 p-5 rounded bg-light rounded">
            <Row>
                <Col></Col>
                <Col md={6}>
           <div className="text-center"> 
            <StopwatchFill className="mb-4" color="#EBA521" size={60} />    
            <h1 className="text-center">Welcome to Todo Time</h1>
           </div> 
        <div>
            {isRegistering ? (
                <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmailC">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmailC">
                    <Form.Label>Confirm email</Form.Label>
                    <Form.Control type="email" placeholder="Confirm Email" value={registerInformation.confirmEmail} onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordC">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordC">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})} />
                </Form.Group>
                <Button className="orange" variant="light" onClick={handleRegister}>Register</Button>
                
                <Button variant="link" onClick={() => setIsRegistering(false)}>Go Back</Button>
            </Form>
            {/* <input type="email" onChange={handleEmailChange} value={email} placeholder="Email" value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})}/>
            <input type="email" onChange={handleEmailChange} value={email} placeholder="Confirm Email" value={registerInformation.confirmEmail} onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})}/>
            <input type="password" onChange={handlePasswordChange} value={password} placeholder="Password" value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})}/>
            <input type="password" onChange={handlePasswordChange} value={password} placeholder="Confirm Password" value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})}/>
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button> */}
                </>
            ):(
                <> 
            {/* <input type="email" onChange={handleEmailChange} value={email} placeholder="Email"/>
            <input type="password" onChange={handlePasswordChange} value={password} placeholder="Password"/>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={() => setIsRegistering(true)}>Create an account</button> */}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleEmailChange} value={email} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePasswordChange} value={password} placeholder="Password" />
                </Form.Group>
                <Button className="orange" variant="light" onClick={handleSignIn}>Sign In</Button>
                
                <Button variant="link" onClick={() => setIsRegistering(true)}>Create an account</Button>
            </Form>
                </>
            )}       
        </div>
        </Col>
        <Col></Col>
        </Row>
        </Container>
    </div>
  )
}
