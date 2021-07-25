import React from 'react';

const TaskList = ({state, dispatch}) => {
    return (
        <>
            {
                state.map(task => {
                    return(
                        <div key={task.id}>
                            <h2>{task.title}</h2>
                            <h4>by {task.deadline}</h4>
                            <p>{task.description}</p>
                            <button onClick={() => dispatch({type:'REMOVE_TASK', payload:task.id})}>Delete task</button>
                        </div>
                    );
                })
            }
        </>
    )
}

export default TaskList
