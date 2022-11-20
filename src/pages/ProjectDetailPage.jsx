import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { selectedArticleSelector } from "../atom/articleAtom.js";

// components import
import PageTemplate from "../template/PageTemplate";
import ProjectInfoBox from "../components/ProjectInfoBox";
import TextViewer from "../components/TextViewer";
import { Paper } from "@mui/material";
import BackButton from "../components/BackButton";

const ProjectDetailPage = (props) => {
  let { id } = useParams();
  const article = useRecoilValue(selectedArticleSelector(id));

  return (
    <PageTemplate
      contents={article && <MainContents article={article} />}
    ></PageTemplate>
  );
};

const MainContents = ({ article }) => {
  return (
    <>
      <BackButton />
      <ThumbnailImage
        src={article.thumbnail || `https://via.placeholder.com/690x400`}
        alt="post-thumbnail"
      />
      <ProjectInfoBox articleId={article.id} />
      <Paper elevation={5} sx={{ mt: 3, mb: 8, p: 5, borderRadius: 8 }}>
        <TextViewer data={article.content} />
      </Paper>
    </>
  );
};

const ThumbnailImage = styled.img`
  max-width: 100%;
  margin: 0px auto 0px;
  object-fit: contain;
  display: block;
`;

export default ProjectDetailPage;
