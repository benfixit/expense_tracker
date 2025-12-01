import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { APP_NAME } from "@/constants/app";
import { ExpenseType } from "@/typings";
import { expenses as data } from "@/constants/expenses";

type Props = {
    children: ReactNode;
};

type ValueType = {
    expenses: Array<ExpenseType>;
    updateExpenses: (expense: ExpenseType) => void
}

const STORAGE_KEY = `${APP_NAME}_expenses`;

const ExpensesContext = createContext<ValueType>({ expenses: [], updateExpenses: () => {} });

const ExpensesProvider = ({ children }: Props) => {
    const [expenses, setExpenses] = useState<Array<ExpenseType>>(data);
    const { getItem, setItem } = useAsyncStorage(STORAGE_KEY);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getItem();

            if (data) {
                setExpenses(JSON.parse(data));
            }
        }

        fetchExpenses();

    }, []);

    // takes in an expense and updates the list, then push to async store
    const updateExpenses = (expense: ExpenseType) => {
        const newExpenses = [...expenses, expense];

        setExpenses(newExpenses);

        setItem(JSON.stringify(newExpenses));
    }

    return (
        <ExpensesContext.Provider value={{ expenses, updateExpenses }}>
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