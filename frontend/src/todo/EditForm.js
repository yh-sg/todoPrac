import React from 'react';
import axios from 'axios';

const EditForm = props => {
    
    const [task, setTask] = React.useState({title:props.state.title, description:props.state.description, deadline:props.state.deadline});

    const handleChange = (e) => {
        const name = e.target.name;
        const input = e.target.value;
        setTask({...task, [name]:input});
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.put(`http://localhost:4000/updateTodo/${props.state.id}`, task);
        props.dispatch({type:'UPDATE_TASK', payload: response.data});
        props.handleClose();
    }
    
    return (
        <div className="edit-form"> 
            <form onSubmit={handleSubmit}>
                <span onClick = {props.handleClose}>x</span>
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
    )
}

export default EditForm
