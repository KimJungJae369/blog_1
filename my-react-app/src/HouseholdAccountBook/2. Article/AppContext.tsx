import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // ReactNode 타입 가져오기, ReactNode는 React에서 렌더링할 수 있는 모든 요소를 나타내는 타입

interface Transaction { // 거래 인터페이스 정의
    type: 'income' | 'expense'; // 거래 유형 (수입 또는 지출)
    amount: number; // 거래 금액
    description?: string; // 거래 설명 (선택 사항)
}

interface AppState { // 애플리케이션 상태 인터페이스 정의
    transactions: Transaction[]; // 거래 목록
}

interface AppContextType {  // 애플리케이션 컨텍스트 타입 정의
    state: AppState; // 애플리케이션 상태
    setState: React.Dispatch<React.SetStateAction<AppState>>; // 애플리케이션 상태를 업데이트하는 함수
}

const AppContext = createContext<AppContextType | undefined>(undefined); // AppContext 생성, 초기값은 undefined로 설정하여 컨텍스트가 제공되지 않은 경우 오류를 발생시키도록 함

export function AppProvider({ children }: { children: ReactNode }) { // AppProvider 컴포넌트 정의, children을 props로 받음
    const [state, setState] = useState<AppState>({ // 애플리케이션 상태를 관리하는 useState 훅 사용
        transactions: [],// 초기 거래 목록은 빈 배열로 설정
    });

    return (
        <AppContext.Provider value={{ state, setState }}> {/* AppContext.Provider로 상태와 상태 업데이트 함수를 제공 */}
            {children} {/* 자식 컴포넌트 렌더링 */}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext); // AppContext에서 컨텍스트 값 가져오기
    if (!context) { // 컨텍스트가 제공되지 않은 경우 오류 발생
        throw new Error('useAppContext must be used within an AppProvider'); // AppProvider 내에서 useAppContext를 사용해야 한다는 오류 메시지
    }
    return context;
}
