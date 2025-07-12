import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { apiClient } from "../lib/api";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Health Dashboard" },
    { name: "description", content: "健康管理ダッシュボード" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    // バックエンドAPIからヘルスチェックデータを取得
    const healthData = await apiClient.get<{ status: string }>('/up');
    return { healthData, error: null };
  } catch (error) {
    console.error('バックエンドAPI接続エラー:', error);
    return { 
      healthData: null, 
      error: 'バックエンドAPIに接続できませんでした' 
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { healthData, error } = loaderData;

  return (
    <div>
      <Welcome />
      
      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">機能一覧</h2>
        <div className="space-y-2">
          <Link 
            to="/body-compositions" 
            className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <h3 className="font-medium text-blue-900">体組成データ</h3>
            <p className="text-sm text-blue-700">体重・体脂肪率など測定データの表示</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
