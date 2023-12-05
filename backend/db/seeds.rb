# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.find_or_create_by( first_name: 'Admin',
                        last_name: 'User',
                        username: 'admin',
                        birthdate: '2000-01-01',
                        gender: 2,
                        admin: true,
                        email: 'admin@admin.com' )

Offer.destroy_all
100.times do |i|
  min_age = rand(16..40)
  max_age = rand(min_age..70)
  valid_days = rand(60..730)
  Offer.create(
    title: Faker::Marketing.buzzwords,
    description: Faker::Lorem.paragraph(sentence_count: 8,
                                        supplemental: true,
                                        random_sentences_to_add: 8),
    min_age: min_age,
    max_age: max_age,
    gender: rand(0..2),
    status: rand(0..1),
    expiration_date: Date.today + valid_days.days,
  )
end