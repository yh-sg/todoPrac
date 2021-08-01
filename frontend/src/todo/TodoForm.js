import React from 'react';
import reducer from './reducer';
import Modal from './Modal';
import TaskList from './TaskList';

const initialState = {tasksList:[], modalDisplay:true, modalContent:''};

const TodoForm = () => {
    const [task, setTask] = React.useState({title:'', description:'', deadline:''});
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(()=> {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/todos');
            const tasks = await response.json();
            dispatch({type:'READ_INITIAL', payload: tasks});
        }
        fetchData();
    },[]);

    const handleChange = (e) => {
        const name = e.target.name;
        const input = e.target.value;
        setTask({...task, [name]:input});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let isEmpty = false;

        for (const property in task){
            if (task[property] === ''){
                isEmpty = true;
            }
        }

        if(!isEmpty){
            dispatch({type:'ADD_TASK', payload:task});
            setTask({title:'', description:'', deadline:''}); // Clear fields
        }
        else{
            dispatch({type:'MISSING_INPUT'});
        }
    }
    console.log(state);
    return (
        <>
            <h1>Todo's Project</h1>
            <div className="container">
                {state.modalDisplay && <Modal closeModal={() => dispatch({type:'CLOSE_MODAL'})} modalContent={state.modalContent}/>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="taskTitle">Task title: </label>
                        <input 
                            type="text" 
                            name="title" 
                            value={task.title} 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="taskDescription" className="description-label">Task description: </label>
                        <textarea 
                            type="text"
                            className="description" 
                            name="description" 
                            value={task.description} 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="taskDeadline">Task deadline: </label>
                        <input 
                            type="text" 
                            name="deadline" 
                            value={task.deadline} 
                            onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
            <div className="tasks-list">
                <TaskList state={state.tasksList} dispatch={dispatch}/>
            </div>
            <footer>
                <div>
                    <p>Copyright © 2021 Hello World</p>
                </div>
                <div>
                    <a className="links" href="https:/www.facebook.com" target="_blank">FB </a>
                    <a className="links" href="https:/www.LinkedIn.com" target="_blank">Li </a>
                </div>
            </footer>
        </>
    );
} 

export default TodoForm;