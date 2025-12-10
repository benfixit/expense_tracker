import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { APP_NAME } from "@/constants/app";
import { ExpenseType } from "@/typings";
import { expensesReducer, initialState } from "./reducer";

type Props = {
    children: ReactNode;
};

type ValueType = {
    expenses: Array<ExpenseType>;
    totalExpenses: number;
    addExpense: (expense: ExpenseType) => void;
    editExpense: (expense: ExpenseType) => void;
    deleteExpense: (expense: ExpenseType) => void;
}

const STORAGE_KEY = `${APP_NAME}_expenses`;

const ExpensesContext = createContext<ValueType>({ 
    expenses: [], 
    totalExpenses: 0,
    addExpense: () => {},
    editExpense: () => {}, 
    deleteExpense: () => {},
});

const ExpensesProvider = ({ children }: Props) => {
    const { getItem, setItem, removeItem } = useAsyncStorage(STORAGE_KEY);
    const [expenses, dispatch] = useReducer(expensesReducer, initialState);

    const totalExpenses = useMemo(() => expenses.reduce((acc, expense) => acc += expense.amount, 0), [expenses]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getItem();

            if (data) {
                dispatch({ type: 'SET_DATA', payload: JSON.parse(data) });
            }
        }

        // console.log("Expenses: ", expenses)
        // removeItem()

        fetchExpenses();

    }, []);

    useEffect(() => {
        const saveExpenses = async () => {
            try {
                await setItem(JSON.stringify(expenses));
            } catch (e) {
                console.log("Error saving expenses");
            }
        }

        if (expenses !== null) {
            saveExpenses();
        }
    }, [expenses]);

    // takes in an expense and updates the list, then push to async store
    const addExpense = async (expense: ExpenseType) => {
        dispatch({
            type: 'ADD',
            payload: expense
        });
    }

    const editExpense = async (expense: ExpenseType) => {
        dispatch({
            type: 'EDIT',
            payload: expense
        });
    }

    const deleteExpense = async (expense: ExpenseType) => {
        dispatch({
            type: 'DELETE',
            payload: expense
        });
    }



    return (
        <ExpensesContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense, totalExpenses }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export const useExpenses = () => {
    const { expenses, ...rest } = useContext(ExpensesContext);

    if (!expenses) {
        throw new Error("Couldn't find expenses. Do not forget to wrap your component with the Expenses Provider?");
    }

    return { expenses, ...rest }
}

export default ExpensesProvider;