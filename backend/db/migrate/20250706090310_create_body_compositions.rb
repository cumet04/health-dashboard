class CreateBodyCompositions < ActiveRecord::Migration[8.0]
  def change
    create_table :body_compositions do |t|
      t.datetime :time, null: false
      t.decimal :weight, precision: 16, scale: 10
      t.decimal :body_fat, precision: 16, scale: 10
      t.decimal :body_fat_mass, precision: 16, scale: 10
      t.decimal :visceral_fat_level, precision: 16, scale: 10
      t.decimal :basal_metabolism, precision: 16, scale: 10
      t.decimal :muscle_mass, precision: 16, scale: 10
      t.decimal :bone_mass, precision: 16, scale: 10
      t.integer :body_age
      t.decimal :body_water_percentage, precision: 16, scale: 10
      t.integer :muscle_quality_score_all

      t.timestamps

      t.index :time
    end
  end
end
