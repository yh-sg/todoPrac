const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            const newTask = {
                                title: action.payload.title,
                                description: action.payload.description,
                                deadline: action.payload.deadline
                            };                                                  
             return {
                        ...state,
                        tasksList: [...state.tasksList, newTask],
                        modalDisplay: true,
                        modalContent: 'Item added'
                    };

        case 'REMOVE_TASK':
            return {
                    ...state,
                    tasksList: state.tasksList.filter(task => task.id !== action.payload)
                   }

        case 'MISSING_INPUT':
            console.log('Missing input');
            return {...state, modalDisplay:true, modalContent:'Missing input'};

        case 'CLOSE_MODAL':
            return {...state, modalDisplay:false};
        
        case 'READ_INITIAL':
            return {...state, tasksList: action.payload.data};
        default:
            throw new Error();
    }
}

export default reducer;