import React from "react";
import useSWR from "swr";

export interface StudentDetailProps{
    studentId: string
}

export function StudentDetailPage({studentId} : StudentDetailProps){
    const { data, error, mutate, isValidating } = useSWR(`students/${studentId}`, {
        revalidateOnFocus: false, //không gọi lại khi mất focus khỏi trang,
        dedupingInterval: 2 * 1000 // sẽ gọi lại api sau mỗi 2 giây
    })

    const handleMutateClick = () => {
        mutate({name: 'Khoa Nguyễn'}, true) 
            // sử dụng mutate , tham số thứ là là true để cập nhật ngay giao diện với dữ liệu tạm thời rồi sau đó sẽ call API cập nhật lại sau
            // false thì sẽ ko call
    }
    return (
        <div>Name: {data?.name || '--'}
            <button onClick={handleMutateClick}>Mutate</button>
        </div>
    )
}