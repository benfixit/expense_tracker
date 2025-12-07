export type ExpenseType = {
    id: string,
    title: string,
    category: CategoryType["id"],
    amount: number,
    date: string
}

export type CategoryType = {
    id: number,
    title: string,
    icon: string,
    color: string
}

export type InsightCategoryType = { 
    title: string, 
    amount: number, 
    percentage: number,
    color: string
}

export type Currency = "NGN" | "USD" | "EUR" | "GBP"

export type CurrencyOptionsType = {
    title: Currency,
    value: Currency,
    icon: string,
    symbol: string
}

export type SettingsType = {
    currency: Currency
}