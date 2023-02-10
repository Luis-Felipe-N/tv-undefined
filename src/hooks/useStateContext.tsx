import { DataContext } from "@/context/DataContext"
import { StateContext } from "@/context/StateContext"
import { useContext } from "react"

export function useStateContext() {
    const value = useContext(StateContext)
    return value
}