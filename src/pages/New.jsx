import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const nav = useNavigate();
  
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = ( input ) => {
    onCreate(
      input.createdDate.getTime(), //타임스탬프 형식으로 저장되도록 해주는 메서드
      input.emotionId,
      input.content
    );
    nav("/", {replace : true});
  };
  
  return (
    <div>
      <Header title={"새 일기 쓰기"} 
      leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>}/>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;