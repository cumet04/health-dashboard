# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_06_090310) do
  create_table "body_compositions", force: :cascade do |t|
    t.datetime "time", null: false
    t.decimal "weight", precision: 16, scale: 10
    t.decimal "body_fat", precision: 16, scale: 10
    t.decimal "body_fat_mass", precision: 16, scale: 10
    t.decimal "visceral_fat_level", precision: 16, scale: 10
    t.decimal "basal_metabolism", precision: 16, scale: 10
    t.decimal "muscle_mass", precision: 16, scale: 10
    t.decimal "bone_mass", precision: 16, scale: 10
    t.integer "body_age"
    t.decimal "body_water_percentage", precision: 16, scale: 10
    t.integer "muscle_quality_score_all"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["time"], name: "index_body_compositions_on_time"
  end
end
