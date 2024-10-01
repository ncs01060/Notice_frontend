"use client";

import TopBar from "@/Components/TopBar";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <div>
      <TopBar />
      <h1>Create</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit!");
          const response = await fetch(
            `https://gusa.pythonanywhere.com/Add?title=${title}&data=${data}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setOk(true);
        }}
      >
        <p>
          제목 :{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          내용 :{" "}
          <input
            type="text"
            value={data}
            style={{ width: "500px", height: "200px" }}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </p>
        <button>확인</button>
      </form>
      {ok && (
        <div>
          <h1>성공!</h1>
        </div>
      )}
    </div>
  );
}
