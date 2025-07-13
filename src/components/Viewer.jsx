import "./Viewer.css";
import EmotionItem from "./EmotionItem";

const Viewer = ({ content, emotionId, emotionName }) => {
  return (
    <div className="Viewer">
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_wrapper`}>
          <EmotionItem
            emotionId={emotionId}
            emotionName={emotionName}
            isSelected={true}
            onClick={() => {}}
          />
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="diary_content">{content}</div>
      </section>
    </div>
  );
};

export default Viewer;