import { DataContext } from "@/context/DataContext"
import { useContext } from "react"

export function useDataContext() {
    const value = useContext(DataContext)
    return value
}