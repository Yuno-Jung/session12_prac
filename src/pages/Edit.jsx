import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";

const Edit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const data = useContext(DiaryStateContext);
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const diaryId = parseInt(id);

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const targetDiary = data.find((item) => item.id === diaryId);
    if (targetDiary) {
      setOriginalData(targetDiary);
    } else {
      nav("/", { replace: true });
    }
  }, [data, diaryId, nav]);

  const deleteButtonClick = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(diaryId);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    onUpdate(diaryId, input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={deleteButtonClick} text={"삭제하기"} type={"NEGATIVE"} />}
      />
      {/* originalData가 로딩되기 전에는 에디터 안 보여주도록 조건부 렌더링 */}
      {originalData && <Editor onSubmit={onSubmit} initialData={originalData} />}
    </div>
  );
};

export default Edit;

// import Header from "../components/Header";
// import Button from "../components/Button";
// import Editor from "../components/Editor";
// import { useNavigate, useParams } from "react-router-dom";
// import { useContext, useState } from "react";
// import { DiaryStateContext, DiaryDispatchContext } from "../App";

// const Edit = () => {
//   const nav = useNavigate();
//   const { id } = useParams();
//   const data = useContext(DiaryStateContext);
//   const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
//   const [originalData, setData] = useState(null);

  

//   const deleteButtonClick = () => {
//     if(confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
//       onDelete(parseInt(id));
//       nav("/", {replace: true});
//     }
//   }

//   const onSubmit = ( input ) => {
//     onUpdate(
//       parseInt(id),
//       input.createdDate.getTime(), //타임스탬프 형식으로 저장되도록 해주는 메서드
//       input.emotionId,
//       input.content
//     );
//     nav("/", {replace : true});
//   };
  
//   return (
//     <div>
//       <Header title={"일기 수정하기"} 
//       leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>}
//       rightChild={<Button onClick={deleteButtonClick} text={"삭제하기"} type={"NEGATIVE"} />}
//       />
//       <Editor onSubmit={onSubmit} />
//     </div>
//   );
// };

// export default Edit;