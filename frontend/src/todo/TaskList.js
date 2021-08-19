import React from 'react';
import axios from 'axios';
import EditForm from './EditForm';

const TaskList = ({state, dispatch}) => {

    const [edit, setEdit] = React.useState(false);
    const [updateId, setUpdateId] = React.useState();
    
    const togglePopup = () => {
        setEdit(!edit);
    }

    const removeTask = async (id) => {
        await axios.delete(`http://localhost:4000/deleteTodo/${id}`);
        dispatch({type:'REMOVE_TASK', payload:id});
    }

    return (
        <>
            {edit && <EditForm handleClose = {togglePopup} state={state.find(task => task.id === updateId)} dispatch={dispatch} />}
            {    
                state.map(task => {
                    return(
                        <>
                            <div className="task" key={task.id}>
                                <h2>{task.title}</h2>
                                <h4>by {task.deadline}</h4>
                                <p>{task.description}</p>
                                <button onClick={() => {togglePopup(); setUpdateId(task.id)}}>Edit</button>
                                <button onClick={() => removeTask(task.id)}>Delete task</button>
                            </div>
                        </>
                    );
                })
            }
        </>
    )
}

export default TaskList
