import React, { useRef, useState } from "react";
import style from "../styles/style.js";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

// 사용하는 폰트 사이즈
const textSize = {
  base: style.fontSizes.base,
  title: style.fontSizes.xxl,
};

const UploadForm = (props) => {
  // 프로젝트 제목 및 소개 최소길이
  const TITLE_MIN_LENGTH = 1;
  const INTRO_MIN_LENGTH = 20;

  // Editor DOM 선택용
  const introRef = useRef();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState({
    error: false,
    message: "",
  });

  // 프로젝트 소개 텍스트 에디터 placeholder DOM
  const introPlaceholderHTML = introRef.current?.getInstance().getHTML();

  // 프로젝트 제목 유효성 검사
  const checkTitleValid = () => {
    const newTitleError = { ...titleError };
    let result = "invalid";

    if (title.length < TITLE_MIN_LENGTH) {
      newTitleError.error = true;
      newTitleError.message = "제목을 1글자 이상 작성해주세요.";
    } else {
      newTitleError.error = false;
      newTitleError.message = "";
      result = "valid";
    }
    setTitleError(newTitleError);
    return result;
  };

  // 프로젝트 소개 유효성 검사
  const checkIntroValid = () => {
    const curruntIntroHTML = introRef.current?.getInstance().getHTML();
    let result = "invalid";

    if (curruntIntroHTML !== introPlaceholderHTML) {
      // curruntIntroHTML을 DOM 객체로 변형 후 텍스트만 추출
      const introText = new DOMParser()
        .parseFromString(curruntIntroHTML, "text/html")
        .querySelector("body").innerText;

      if (introText.length >= INTRO_MIN_LENGTH) {
        result = "valid";
      }
    }

    if (result === "invalid") {
      alert("프로젝트 소개를 20자 이상 작성해주세요.");
    }

    return result;
  };

  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    if (checkTitleValid() === "valid" && checkIntroValid() === "valid") {
      // DB에 업로드
      alert("저장되었습니다.");
      // 이후 디테일페이지 혹은 메인페이지로 이동
      return;
    }
  };

  // 프로젝트 제목 input 핸들러
  const handleTitleInput = (event) => {
    const value = event.target.value;
    setTitle(value);
    checkTitleValid();
  };

  return (
    <Paper sx={{ p: 2, pl: 3, pr: 3 }}>
      <FormControl
        sx={{
          width: "100%",
        }}
        component="fieldset"
        variant="standard"
      >
        <Box mb={2}>
          <Typography variant="h4" component={"h2"} className="a11y-hidden">
            프로젝트 제목
          </Typography>
          <TextField
            placeholder="프로젝트 제목"
            id="text-title"
            variant="standard"
            margin="normal"
            sx={{
              mb: 3,
            }}
            fullWidth
            required
            error={titleError.error}
            helperText={titleError.message}
            inputProps={{
              style: { fontSize: textSize.title },
              maxLength: 40,
            }}
            onInput={handleTitleInput}
          />
        </Box>
        <Box>
          <Typography variant="h4" component={"h2"} mb={1}>
            프로젝트 소개
          </Typography>
          <Typography variant="h6" component={"p"} mb={2}>
            프로젝트에 대한 한줄 소개, 팀 소개, 사용한 기술 스택, 프로젝트 구조,
            핵심 기능, 개발 중 마주친 문제들과 해결한 과정 등을 자유롭게
            소개해보세요.
          </Typography>
          <Editor
            ref={introRef} // DOM 선택용 useRef
            initialValue=" "
            placeholder="프로젝트를 멋지게 소개해보세요. (20자 이상 작성)"
            previewStyle="tab" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" //
            toolbarItems={[
              // 툴바 옵션 설정
              ["bold", "italic", "strike"],
              ["quote", "code", "codeblock"],
              ["ul", "ol"],
              ["table", "image", "link"],
            ]}
            language="ko"
            useCommandShortcut={false} // 키보드 입력 컨트롤 방지
          ></Editor>
        </Box>
        <Box
          mt={3}
          mb={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            id="save"
            variant="text"
            sx={{ mr: 1, fontSize: textSize.base }}
          >
            임시저장
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: textSize.base }}
            onClick={handleRegisterButton}
          >
            등록
          </Button>
        </Box>
      </FormControl>
    </Paper>
  );
};

export default UploadForm;