import { createContext, useContext, useState } from "react";
import type {ReactNode} from 'react'

interface Transaction{
    type : 'income' | 'expense';
    amount : number;
    description ? : string;
}

interface AppState{
    transactions : Transaction[];
}

interface AppContextType{
    state : AppState;
    setState : React.Dispatch<React.SetStateAction<AppState>>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children} : {children : ReactNode}){
    const [state, setState] = useState<AppState>({
        transactions : []
    });

    return(
        <AppContext.Provider value={{state, setState}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext);
    if(!context){
        throw new Error(`useAppContext must be used within an AppProvider`);
    }
    return context;
}