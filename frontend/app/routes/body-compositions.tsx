import type { Route } from "./+types/body-compositions";
import { useNavigation } from "react-router";
import { getBodyCompositions, type BodyComposition } from "../lib/body-composition";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "体組成データ - Health Dashboard" },
    { name: "description", content: "体組成測定データの一覧表示" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    const bodyCompositions = await getBodyCompositions();
    return { bodyCompositions, error: null };
  } catch (error) {
    console.error('体組成データ取得エラー:', error);
    return { 
      bodyCompositions: [], 
      error: '最新の体組成データの取得に失敗しました' 
    };
  }
}

export default function BodyCompositions({ loaderData }: Route.ComponentProps) {
  const { bodyCompositions, error } = loaderData;
  const navigation = useNavigation();
  const isLoadingCurrentRoute =
    navigation.state === "loading" && navigation.location?.pathname === "/body-compositions";

  const LoadingNotice = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p className="text-blue-800 text-sm">最新の体組成データを読み込み中です...</p>
    </div>
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">体組成データ</h1>
        {isLoadingCurrentRoute && <LoadingNotice />}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">体組成データ</h1>
      {isLoadingCurrentRoute && <LoadingNotice />}
      
      {bodyCompositions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">データがありません</p>
        </div>
      ) : (
        <BodyCompositionTable bodyCompositions={bodyCompositions} />
      )}
    </div>
  );
}

interface BodyCompositionTableProps {
  bodyCompositions: BodyComposition[];
}

function BodyCompositionTable({ bodyCompositions }: BodyCompositionTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNumber = (value?: number, unit: string = '') => {
    if (value == null) return '-';
    return `${value.toLocaleString()}${unit}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                測定日時
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                体重 (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                体脂肪率 (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                体脂肪量 (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                内臓脂肪レベル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                基礎代謝量 (kcal)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                筋肉量 (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                推定骨量 (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                体内年齢 (歳)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                体水分率 (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                筋質点数
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bodyCompositions.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(record.time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.weight, 'kg')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.body_fat, '%')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.body_fat_mass, 'kg')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.visceral_fat_level)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.basal_metabolism, 'kcal')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.muscle_mass, 'kg')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.bone_mass, 'kg')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.body_age, '歳')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.body_water_percentage, '%')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(record.muscle_quality_score_all)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          合計 {bodyCompositions.length} 件のデータ
        </p>
      </div>
    </div>
  );
}
