import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import Moment from 'react-moment';
import moment from 'moment';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { PlusCircleFill } from 'react-bootstrap-icons';
import { StopwatchFill } from "react-bootstrap-icons";

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const [time, setTime] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [newTime, setNewTime] = useState("");
  const [updateTime, setUpdatTime] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  let createNewTime = moment(date).add(time, 'days').format('YYYY-MM-DD');

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    // let newTime = moment(date).add(time, 'days').format('YYYY-MM-DD');
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      time: time,
      timeToComplete: timeToComplete,
      newTime: createNewTime,
      uidd: uidd
    });

    setTodo("");
    setTime("");
    setTimeToComplete("");
    setShow(false);
  };

  // update
  const handleUpdate = (todo) => {
    let updateTime = moment(date).add(todo.time, 'days').format('YYYY-MM-DD');
    setIsEdit(true);
    setShow(true);
    setTodo(todo.todo);
    setTime(todo.time);
    setTimeToComplete(todo.timeToComplete);
    setTempUidd(todo.uidd);
    setNewTime(updateTime);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      time: time,
      timeToComplete: timeToComplete,
      tempUidd: tempUidd,
      newTime: createNewTime
    });

    setTodo("");
    setTime("");
    setTimeToComplete("");
    setIsEdit(false);
    setShow(false);
  };

  const handleReset = (todo) => {
    console.log('The checkbox was toggled');
    let resetTime = moment(date).add(todo.time, 'days').format('YYYY-MM-DD');
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
        newTime: resetTime
    })
    console.log('Time was updated');

  }

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

var date = new Date()
console.log(date)

var checkDate = moment().format('YYYY-MM-DD')
console.log("check date", checkDate)

// var newDate = moment(date).add(time, 'days').format('YYYY-MM-DD');
// console.log("new date", newDate)



  return (
    <div>
        <Navbar className="darkGreen" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand><StopwatchFill /> Todo Time</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button className="darkOrange" variant="light" onClick={handleSignOut}>Sign Out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container className="my-5 pb-5">
      <div className="py-4">
         
        <PlusCircleFill onClick={handleShow} className="position-fixed" color="#577D6B" size={60}/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Add/Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Task</Form.Label>
                <Form.Control type="text" placeholder="Task..." value={todo} onChange={(e) => setTodo(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>How Many Days?</Form.Label>
                <Form.Control type="number" placeholder="Days..." value={time} onChange={(e) => setTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>How Long to Complete?</Form.Label>
                <Form.Control type="text" placeholder="Time to Complete" value={timeToComplete} onChange={(e) => setTimeToComplete(e.target.value)} />
            </Form.Group>
        </Form>    
        </Modal.Body>
        <Modal.Footer>
          {
            isEdit ? (
                <div>
                    <Button className="orange" variant="light" onClick={handleEditConfirm}>Confirm</Button>
                </div>
            ) : (
                <div>
                    <Button className="orange" variant="light" onClick={writeToDatabase}>Add</Button>
                </div>
            )}
        </Modal.Footer>
      </Modal>
      </div>
     
        {/* <input type="text" placeholder="Add Task..." value={todo} onChange={(e) => setTodo(e.target.value)} />
        <input type="number" placeholder="Select Days..." value={time} onChange={(e) => setTime(e.target.value)}/>
        <input type="text" placeholder="Time to Complete" value={timeToComplete} onChange={(e) => setTimeToComplete(e.target.value)}/>
        
        {
            isEdit ? (
                <div>
                    <button onClick={handleEditConfirm}>Confirm</button>
                </div>
            ) : (
                <div>
                    <button onClick={writeToDatabase}>Add</button>
                </div>
            )} */}

            <div className="m-5">
        {
            todos
            .sort(({ time: previousTime }, { time: currentTime }) => previousTime - currentTime)
            .map(todo => (
                <div>
                { checkDate === todo.newTime ? ( 
                    <div className="p-3 my-4 rounded shadow-lg text-light midGreen">
                    <h1 className="pb-2 px-4">{todo.todo}</h1>    
                    <h5 className="pb-2 px-4">Due: <span className="red m-1 p-2 rounded">Now</span></h5>
                    <h5 className="pb-2 px-4">Time to Complete: {todo.timeToComplete}</h5>
                        <div className="d-flex justify-content-end">
                            <Button className="yellow mx-1" variant="light" onClick={() => handleReset(todo)}>Done</Button>
                            <Button className="orange mx-1" variant="light" onClick={() => handleUpdate(todo)}>Edit</Button>
                            <Button className="darkOrange mx-1" variant="light" onClick={() => handleDelete(todo.uidd)}>Delete</Button>
                        </div>
                    </div>
                ) : (
                    <div className="p-3 my-4 rounded shadow-lg text-light">
                    <h1 className="pb-2 px-4">{todo.todo}</h1>    
                    <h5 className="pb-2 px-4">Due: <Moment diff={date} unit="days">{todo.newTime}</Moment> days</h5>
                    <h5 className="pb-2 px-4">Time to Complete: {todo.timeToComplete}</h5>
                        <div className="d-flex justify-content-end">
                            <Button className="yellow mx-1" variant="light" onClick={() => handleReset(todo)}>Done</Button>
                            <Button className="orange mx-1" variant="light" onClick={() => handleUpdate(todo)}>Edit</Button>
                            <Button className="darkOrange mx-1" variant="light" onClick={() => handleDelete(todo.uidd)}>Delete</Button>
                        </div>
                    </div>
                )}
                
                </div>
            ))
        }
            </div>
        
        </Container>
        
        <div className="darkGreen text-center p-2" fixed="bottom">   
                    <p>Todo Time © {new Date().getFullYear()}</p>
                        
                    <p>Developed by: <a href="https://www.cambaffuto.com" className="footerLink">Cam Baffuto</a></p>          
        </div>
    </div>
    

  )
}
