
const InitialState = {
    tasks: [
        // {  name: 'Mehmet', description: 'Baran', status: 'scheduled' },
        // {  name: 'Test', description: 'rew', status: 'running' },
        // {  name: 'Jummy', description: 'fes', status: 'expired' },
        // {  name: 'Suny', description: 'yer', status: 'scheduled' },
        // {  name: 'Ref', description: 'Def', status: 'running' },
    ]
}


const reducer = (state= InitialState, action) => {
    switch (action.type) {
        case 'GET_TASK':
            return { ...state };
        case 'SAVE_TASK':
            return { ...state, tasks: action.data }
        default:
            return state;
    }
}

export default reducer;