class ChangeBodyCompositionsTimeIndexToUnique < ActiveRecord::Migration[8.0]
  def change
    remove_index :body_compositions, column: :time
    add_index :body_compositions, :time, unique: true
  end
end
