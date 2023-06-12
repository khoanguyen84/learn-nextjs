import React, { useState } from "react";
import { StudentDetailPage } from "../../components/swr";

export default function SWRPage() {
    const [studentList, setStudentList] = useState([1, 1, 1])
    const handleAddDetailClick = () => {
        setStudentList(prev => [...prev, 1])
    }
    return (
        <div>
            <h1>SWR Playground</h1>
            <button onClick={handleAddDetailClick}>Add Detail</button>
            <ul>
                {
                    studentList.map((value, index) => (
                        <li key={index}>
                            <StudentDetailPage studentId={"lea11ziflg8xoizb"} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}