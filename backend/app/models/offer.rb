class Offer < ApplicationRecord

  enum :gender => { any: 0,
                    female: 1,
                    male: 2 }

  enum :status => { active: 0,
                    inactive: 1 }
end