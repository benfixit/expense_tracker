import { ADD_EXPENSE, REMOVE_EXPENSE } from '../constants';
import uuid from 'uuid';

export const addExpense = payload => ({
    type: ADD_EXPENSE,
    id: uuid.v4(),
    title: payload.title
})

export const removeExpense = id => ({
    type: REMOVE_EXPENSE,
    id
})