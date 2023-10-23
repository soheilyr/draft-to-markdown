// pages/drafts.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/component/axiosConfig/axiosConfig";
import ReactMarkdown from "react-markdown";
import { draftToMarkdown } from "markdown-draft-js";

const renderContent = (rawContent) => {
  const contentState = JSON.parse(rawContent);
  const markdownContent = draftToMarkdown(contentState);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

const DraftsPage = () => {
  const [drafts, setDrafts] = useState<any>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/draft")
      .then((response) => {
        setDrafts(response.data.drafts);
      })
      .catch((error) => {
        console.error("Error fetching drafts", error);
      });
  }, []);

  return (
    <div>
      <h1>Drafts</h1>
      {drafts.map((draft, index) => (
        <div key={index}>{renderContent(draft.content)}</div>
      ))}
    </div>
  );
};

export default DraftsPage;
