import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <main>
        <h1 className="font-bold m-2">ToDO</h1>
        <div className="flex m-2">
          <input type="text" placeholder="新しいタスクを入力" /><button>追加</button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg m-2 w-xs">
          <h2 className="text-center m-3 font-semibold">今日やること</h2>
          <ul>
            <div className="flex m-2">
              <input type="checkbox" />
              <li>買い物</li>
            </div>
          </ul>
        </div>
        <div className="border-2 border-gray-500 rounded-lg m-2 w-xs">
          <h2 className="text-center m-3 font-semibold">仕事</h2>
          <ul>
            <div className="flex m-2">
              <input type="checkbox" />
              <li>タスク整理</li>
            </div>
          </ul>
        </div>

        
      </main>
  </>
  );
}
