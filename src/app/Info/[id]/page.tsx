"use client";

import TopBar from "@/Components/TopBar";
import styles from "../../page.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type DataType = {
  Title: string;
  Data: string;
  heart: number;
  hate: number;
  [key: string]: any; // 기타 다른 데이터가 있을 경우를 대비한 타입 설정
};

export default function Info() {
  const [data, setData] = useState<DataType | null>(null);
  const [hate, setHate] = useState(0);
  const [heart, setHeart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const TriggerHeart = async () => {
    console.log("Heart");
    const response = await fetch(
      `https://gusa.pythonanywhere.com/haert?id=${id}`
    );
    if (!response.ok) {
      throw new Error("API has not define");
    } else {
      setHeart((prevHeart) => prevHeart + 1);
    }
  };

  const TriggerHate = async () => {
    console.log("TriggerHate");
    const response = await fetch(
      `https://gusa.pythonanywhere.com/hate?id=${id}`
    );
    if (!response.ok) {
      throw new Error("API has not define");
    } else {
      setHate((prevHate) => prevHate + 1);
    }
  };

  useEffect(() => {
    if (id === undefined) return; // id가 없을 경우 fetch를 실행하지 않음

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return; // id가 유효한 숫자가 아닐 경우 fetch를 실행하지 않음

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gusa.pythonanywhere.com/page?id=${numericId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResult: DataType = await response.json();
        console.log("Raw response:", jsonResult);

        setData(jsonResult);
        setHate(jsonResult.hate || 0);
        setHeart(jsonResult.heart || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // id가 변경될 때마다 fetch 실행

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div>
      <TopBar />
      <div className={styles.community}>
        {/* 데이터를 표시하는 부분 */}
        <h1>{data.Title}</h1>
        <h4>{data.Date}</h4>
        <p>{data.Data}</p>
        <span className={styles.hateHeart}>
          <p>
            싫어요 : {hate} 좋아요 : {heart}
          </p>
        </span>
      </div>
      <div>
        <button onClick={TriggerHeart}>좋아요</button>
        <button onClick={TriggerHate}>싫어요</button>
      </div>
    </div>
  );
}
