import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { DiaryStateContext } from "../App";


// Editor.js의 emotionList와 동일하게 정의해서 감정 텍스트 표시
const emotionList = [
  { emotionId: 1, emotionName: "완전 좋음" },
  { emotionId: 2, emotionName: "좋음" },
  { emotionId: 3, emotionName: "그럭저럭" },
  { emotionId: 4, emotionName: "나쁨" },
  { emotionId: 5, emotionName: "끔찍함" },
];

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const Diary = () => {
  const { id } = useParams();
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();

  // id가 숫자가 아닐 수도 있으니 형변환
  const diaryId = parseInt(id);

  // id와 일치하는 일기 찾기
  const diary = data.find((item) => item.id === diaryId);

  // 없으면 경고 후 홈으로 이동 (또는 메시지 출력)
  if (!diary) {
    return (
      <div>
        <Header title={"일기 없음"} leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />} />
        <div style={{ padding: "20px", textAlign: "center" }}>존재하지 않는 일기입니다.</div>
      </div>
    );
  }

  // 감정명 찾기
  const emotionData = emotionList.find((e) => e.emotionId === diary.emotionId);

  return (
    <div className="DiaryPage">
      <Header
        title={`${formatDate(diary.createdDate)} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={() => nav(`/edit/${diaryId}`)} text={"수정하기"} />}
      />
      <Viewer
        emotionId={diary.emotionId}
        emotionName={emotionData?.emotionName}
        content={diary.content}
      />

    </div>
  );
};

export default Diary;
