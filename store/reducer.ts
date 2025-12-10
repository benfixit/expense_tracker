//@ts-nocheck
import { ExpenseType, ActionType } from "@/typings";

export const initialState = [];

export const expensesReducer = (expenses: Array<ExpenseType>, action: ActionType) => {
    switch(action.type) {
        case 'ADD': {
            return [
                ...expenses,
                action.payload
            ];
        }
        case 'EDIT': {
            return expenses.map(expense => {
                if (expense.id === action.payload.id) {
                    return action.payload;
                }

                return expense;
            });
        }
        case 'DELETE': {
            return expenses.filter(expense => expense.id !== action.payload.id);
        }
        case 'SET_DATA': {
            return [...action.payload];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}