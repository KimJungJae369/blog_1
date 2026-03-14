import React from 'react'

export default function Header() {
    const subMenu =  {
        color : '#333',
        fontSize : 14,
        marginTop : 5,
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const formattedDate = `${year}년 ${month}월 ${day}일`
  return (
    <>
        <h1>나의 가게부</h1>
        <p style={subMenu}>{formattedDate}</p>
    </>
  )
}
