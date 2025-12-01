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