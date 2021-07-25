import React from 'react';
import reducer from './reducer';
import TaskList from './TaskList';

const initialState = [];

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

    return (
        <>
            <h1>Todo's Project</h1>
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
                    <label htmlFor="taskDescription">Task description: </label>
                    <input 
                        type="text" 
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
                <button type="submit">Submit</button>
            </form>
            <TaskList state={state} dispatch={dispatch}/>
        </>
    );
} 

export default TodoForm;