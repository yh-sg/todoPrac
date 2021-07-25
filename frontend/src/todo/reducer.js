const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            return [...state,   {
                                    title: action.payload.title,
                                    description: action.payload.description,
                                    deadline: action.payload.deadline
                                }];

        case 'REMOVE_TASK':
            console.log('Task removed');
            return state.filter(task => task.id !== action.payload);

        case 'MISSING_INPUT':
            console.log('Missing input');
            return state;
        
        case 'READ_INITIAL':
            return action.payload.data;
        default:
            throw new Error();
    }
}

export default reducer;