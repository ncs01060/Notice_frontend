/* eslint-disable */
"use client";

import TopBar from "@/Components/TopBar";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DataType = {
  [key: string]: any; // 데이터 구조에 맞게 수정
};

export default function Home() {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gusa.pythonanywhere.com/Get");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResult: DataType = await response.json();
        console.log("Raw response:", jsonResult);
        setData(jsonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <TopBar />
      <div className={styles.page}>
        <h1>게시판</h1>
        {data && typeof data === "object" ? (
          <pre>
            {Object.entries(data).map(([key, item]) => (
              <div key={key} className={styles.item}>
                {typeof item === "object" ? (
                  <div
                    onClick={() => {
                      console.log(item.id);
                      router.push(`/Info/${item.id}`);
                    }}
                  >
                    <h4>{item.Title}</h4>
                  </div>
                ) : (
                  <h3>{item}</h3>
                )}
              </div>
            ))}
          </pre>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
