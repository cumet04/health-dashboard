class BodyComposition < ApplicationRecord
  validates :time, presence: true
  validates :weight, :body_fat, :body_fat_mass, :visceral_fat_level, :basal_metabolism,
            :muscle_mass, :bone_mass, :body_water_percentage,
            numericality: { greater_than: 0 }, allow_nil: true
  validates :body_age, :muscle_quality_score_all,
            numericality: { greater_than: 0 }, allow_nil: true

  scope :ordered, -> { order(time: :desc) }
  scope :on_date, ->(date) { where(time: date.all_day) }

  def self.fetch_raw_records(since)
    require_relative '../../lib/tanita-rb/lib/tanita'

    tanita = Tanita.new

    tanita.login(
      ENV.fetch('HEALTHPLANET_ID'),
      ENV.fetch('HEALTHPLANET_PASSWORD')
    )

    tanita.fetch_since(since)
  end

  def self.from_raw_record(record)
    new(
      time: record.time,
      weight: record.values['体重'],
      body_fat: record.values['体脂肪率'],
      body_fat_mass: record.values['体脂肪量'],
      visceral_fat_level: record.values['内臓脂肪レベル'],
      basal_metabolism: record.values['基礎代謝量'],
      muscle_mass: record.values['筋肉量'],
      bone_mass: record.values['推定骨量'],
      body_age: record.values['体内年齢']&.to_i,
      body_water_percentage: record.values['体水分率'],
      muscle_quality_score_all: record.values['筋質点数（全身）']&.to_i
    )
  end
end
