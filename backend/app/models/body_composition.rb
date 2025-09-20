class BodyComposition < ApplicationRecord
  validates :time, presence: true, uniqueness: true
  validates :weight, :body_fat, :body_fat_mass, :visceral_fat_level, :basal_metabolism,
            :muscle_mass, :bone_mass, :body_water_percentage,
            numericality: { greater_than: 0 }, allow_nil: true
  validates :body_age, :muscle_quality_score_all,
            numericality: { greater_than: 0 }, allow_nil: true

  scope :ordered, -> { order(time: :desc) }
  scope :on_date, ->(date) { where(time: date.all_day) }

  def to_display_hash
    attributes.except('id', 'created_at', 'updated_at')
  end
end
