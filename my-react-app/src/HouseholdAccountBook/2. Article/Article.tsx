import { useState, useEffect } from 'react'
// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faWallet } from '@fortawesome/free-solid-svg-icons';
// 컨텍스트
import { useAppContext } from './AppContext';

// 화면 크기 감지 hook
function useWindowSize() { // 창 크기를 감지하는 커스텀 훅
    const [windowSize, setWindowSize] = useState({ // 창 크기를 상태로 관리
        width: typeof window !== 'undefined' ? window.innerWidth : 1200, // 기본값으로 1200px 설정 / innerWidth : 창의 너비를 나타내는 속성, 창이 존재하는 경우 현재 창의 너비로 초기화, 그렇지 않으면 1200으로 초기화
    }); // 창 크기를 상태로 관리하는 useState 훅 사용

    
    useEffect(() => { // useEffect 훅을 사용하여 창 크기 변경 이벤트를 감지하고 상태를 업데이트
        function handleResize() { // 창 크기 변경 시 호출되는 함수
            setWindowSize({ // 창 크기 업데이트
                width: window.innerWidth, // 창의 현재 너비로 업데이트
            });
        } 

        window.addEventListener('resize', handleResize); // 창 크기 변경 이벤트 리스너 등록
        handleResize(); // 초기 창 크기 설정

        return () => window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

    return windowSize; // 현재 창 크기를 반환
}

export default function Article() { // Article 컴포넌트
    // 컨텍스트에서 상태 가져오기
    const { state } = useAppContext(); // AppContext에서 상태 가져오기
    const { width } = useWindowSize(); // 창 크기 가져오기
    const isMobile = width < 768; // 모바일 여부 판단 (창 너비가 768px 미만인 경우 모바일로 간주)
    
    // 수입, 지출, 잔액 계산
    const totalIncome = state.transactions // 수입 총액 계산
        .filter(t => t.type === 'income') //  수입 거래만 필터링 / income : 거래 유형이 수입인 거래를 나타내는 문자열, filter 함수를 사용하여 거래 목록에서 수입 거래만 추출
        .reduce((sum, t) => sum + t.amount, 0); // 수입 거래의 금액을 모두 더하여 총액 계산 / amount : 거래 금액을 나타내는 속성, reduce 함수를 사용하여 거래 금액을 모두 더함, 초기값은 0

    
    const totalExpense = state.transactions // 지출 총액 계산
        .filter(t => t.type === 'expense') // 지출 거래만 필터링
        .reduce((sum, t) => sum + t.amount, 0); // 지출 거래의 금액을 모두 더하여 총액 계산

    
    const balance = totalIncome + totalExpense; //  잔액 계산 (수입과 지출의 합)

    // 스타일 정의
    const MainMenu = { // 메인 메뉴 스타일
        marginTop : isMobile ? '30px' : '50px', // 모바일에서는 30px, 데스크톱에서는 50px
        display : 'flex', // 플렉스 박스 사용
        flexDirection: isMobile ? 'column' as 'column' : 'row' as 'row', // 모바일에서는 세로 방향, 데스크톱에서는 가로 방향
        justifyContent : 'space-evenly', // 아이템 사이에 균등한 간격
        gap: isMobile ? '20px' : '0', // 모바일에서는 아이템 사이에 20px 간격, 데스크톱에서는 간격 없음
    }

    const itemstyle = { // 각 항목 스타일
        width : isMobile ? '100%' : '60%', // 모바일에서는 전체 너비, 데스크톱에서는 60% 너비
        padding : isMobile ? 20 : 30,// 모바일에서는 20px 패딩, 데스크톱에서는 30px 패딩
        backgroundColor : 'white',// 배경색 흰색
        borderRadius : 20, // 테두리 둥글게
        boxShadow : '0 0 10px rgba(22, 5, 253, 0.1)', // 그림자 효과
        float : isMobile ? 'none' as 'none' : 'left' as 'left', // 모바일에서는 플로트 없음, 데스크톱에서는 왼쪽으로 플로트
        boxSizing: 'border-box' as 'border-box', // 박스 사이징을 border-box로 설정하여 패딩과 테두리를 포함한 크기 계산
    }

    const itemicon = { // 아이콘 스타일
         display : 'flex', // 플렉스 박스 사용하여 아이콘과 텍스트를 가로로 정렬
    }
  return (
    <div style={MainMenu}> {/* 메인 메뉴 컨테이너 */}
        <div style={itemstyle}> {/* 수입 항목 */}
            <div style={itemicon}> {/* 아이콘과 텍스트를 감싸는 컨테이너 */}
                <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#006be6ff", padding : 13, backgroundColor : 'rgba(26, 115, 232, 0.1)', borderRadius : '30%'}} /> {/* 수입 아이콘 */}
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>수입</span> {/* 수입 텍스트 */}
            </div>
            <h2 style={{color : '#006be6ff', paddingTop : 20,}}>+{totalIncome.toLocaleString()}원</h2> {/* 수입 금액 표시 */}
        </div>

         <div style={{...itemstyle, margin : isMobile ? '0' : '0 20px'}}> {/* 지출 항목 (수입 항목과 스타일 공유, 데스크톱에서는 좌우에 20px 마진 추가) */}
           <div style={itemicon}> {/* 아이콘과 텍스트를 감싸는 컨테이너 */}
                 <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: "#e60000ff", padding : 13, backgroundColor : 'rgba(217, 48, 37, 0.1)', borderRadius : '30%'}} /> {/* 지출 아이콘 */}
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>지출</span> {/* 지출 텍스트 */}
           </div>
            <h2 style={{color : '#e60000ff', paddingTop : 20,}}>{totalExpense.toLocaleString()}원</h2> {/* 지출 금액 표시 */}
        </div>

         <div style={itemstyle}> {/* 잔액 항목 (수입 항목과 스타일 공유) */}
            <div style={itemicon}> {/* 아이콘과 텍스트를 감싸는 컨테이너 */}
                <FontAwesomeIcon icon={faWallet} style={{ color: "#00b12cff", padding : 13,  backgroundColor : 'rgba(24, 128, 56, 0.1)', borderRadius : '30%'}} /> {/* 잔액 아이콘 */}
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>잔액</span> {/* 잔액 텍스트 */}
            </div>
            <h2 style={{color : '#00b12cff', paddingTop : 20,}}>{balance >= 0 ? '+' : ''}{balance.toLocaleString()}원</h2> {/* 잔액 금액 표시 (잔액이 양수인 경우 '+' 기호 추가) */}
        </div>
    </div>
  )
}
