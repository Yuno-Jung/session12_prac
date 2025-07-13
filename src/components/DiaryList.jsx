
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react"

const DiaryList = ({ data }) => {
    const nav = useNavigate();
    // default 값은 최신순
    const [sortType, setSortType] = useState("latest");
  
    //이벤트 객체 e의 target.value를 사용하여 새로운 정렬 타입을 sortType에 저장합니다
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    //정렬 필터를 고를 때마다 일기 리스트가 바뀌도록 설정
    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    };
    //toSorted는 원본 배열을 바꾸지 않음 , 새로운 변수에 저장
    const sortedData = getSortedData();


    return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={() => nav("/new")} 
            text={"새 일기 쓰기"} 
            type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
            <DiaryItem key={item.id}{...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
