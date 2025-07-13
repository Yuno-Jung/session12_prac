import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
    const nav = useNavigate();

    //다이어리 페이지로 이동하는 함수
    const goDiaryPage = () => {
        nav(`/diary/${id}`);
    };

    //Edit 페이지로 이동하는 함수
    const goEditPage = () => {
        nav(`/edit/${id}`);
    };

  return (
    <div className="DiaryItem">
      <div onClick={goDiaryPage}
      className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div onClick={goDiaryPage}
      className="info_section">
        <div className="created_date">
            {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">
            {content}
        </div>
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
