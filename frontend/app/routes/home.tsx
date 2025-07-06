import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { apiClient } from "../lib/api";

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
        <h2 className="text-xl font-semibold mb-2">
          バックエンドAPI接続状況
        </h2>
        
        {error ? (
          <div className="text-red-600">
            <p>❌ {error}</p>
            <p className="text-sm mt-1">
              バックエンドサーバーが起動していることを確認してください。
            </p>
          </div>
        ) : (
          <div className="text-green-600">
            <p>✅ バックエンドAPI接続成功</p>
            <p className="text-sm mt-1">
              ステータス: {healthData?.status || 'OK'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
