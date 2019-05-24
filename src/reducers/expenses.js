import { ADD_EXPENSE, REMOVE_EXPENSE } from '../constants';
import { addExpense } from '../actions';

const expenses = (state = [], action) => {
    switch(action.type){
        case ADD_EXPENSE:
            return [
                ...state,
                addExpense(action)
            ];
        case REMOVE_EXPENSE:
            return state.filter(expense => expense.id !== action.id);
        default:
            return state;
    }
}

export default expenses;