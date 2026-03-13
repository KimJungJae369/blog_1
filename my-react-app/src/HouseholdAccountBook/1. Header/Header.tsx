import React from 'react'

export default function Header() {
    const subMemu = {
        color : '#333',
        fontSize  : 18,
        marginTop : 5,
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const formattedDate = `${year}년 ${month}월 ${date}일`;
  return (
    <>
        <h1>나만의 가게부</h1>
        <p style={subMemu}>{formattedDate}</p>
    </>
  )
}
