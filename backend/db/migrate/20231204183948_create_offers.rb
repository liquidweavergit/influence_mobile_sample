class CreateOffers < ActiveRecord::Migration[7.1]
  def change
    create_table :offers do |t|
      t.string :title
      t.string :description
      t.integer :min_age
      t.integer :max_age
      t.integer :gender
      t.integer :status
      t.date :expiration_date
      t.timestamps
    end
  end
end
