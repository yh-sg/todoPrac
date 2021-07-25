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
            break;
        case 'MISSING_INPUT':
            console.log('Missing input');
            break;
        case 'READ_INITIAL':
            return action.payload.data;
        default:
            throw new Error();
    }
}

export default reducer;