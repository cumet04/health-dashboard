/**
 * BodyComposition型定義とAPI関数
 */

import { apiClient } from './api';

export interface BodyComposition {
  time: string;
  weight?: number;
  body_fat?: number;
  body_fat_mass?: number;
  visceral_fat_level?: number;
  basal_metabolism?: number;
  muscle_mass?: number;
  bone_mass?: number;
  body_age?: number;
  body_water_percentage?: number;
  muscle_quality_score_all?: number;
}

/**
 * 体組成データ一覧を取得
 */
export async function getBodyCompositions(): Promise<BodyComposition[]> {
  return apiClient.get<BodyComposition[]>('/body_compositions');
}