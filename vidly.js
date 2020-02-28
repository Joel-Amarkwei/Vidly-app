
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connection Successfully'))
.catch((err) => console.log('Connection failed:', err.message))

const autoGenre = new mongoose.Schema({
    name: String,
    ratingPerStar: Number
})

const Genre = mongoose.model('Genre', autoGenre)

const Movies = mongoose.model('Vidly', new mongoose.Schema({
    name: { type: String, required: true },
    genre: autoGenre,
    numberInStock: { type: Number, required: true},
    dailyRentalRate: Number
}))

async function createVidly(name, genre, numberInStock, dailyRentalRate){
    const movie = new Movies({
        name, genre, numberInStock, dailyRentalRate
    })
    const results = await movie.save()
    console.log(results)
}

createVidly( 'Nana Kojo', new Genre ({ name: 'The hobbit', ratingPerStar: 4.2 }), 14, 20 )
createVidly( 'Yaw Dua', new Genre ({ name: 'The Avengers', ratingPerStar: 4.7 }), 97, 120 )
createVidly( 'Josephine Mansah', new Genre ({ name: 'This is it', ratingPerStar: 3.3 }), 17, 8 )
createVidly( 'Kelvin Asah', new Genre ({ name: 'Game of Thrones', ratingPerStar: 4.8 }), 134, 112 )
createVidly( 'Derick Brempong', new Genre ({ name: 'Venom', ratingPerStar: 4.4 }), 60, 102 )
createVidly( 'Tammie Abraham', new Genre ({ name: 'The Life Cylcy of Chelsea', ratingPerStar: 3.4 }), 21, 2 )
createVidly( 'Skinny Fraser', new Genre ({ name: 'Green Friday', ratingPerStar: 4.0 }), 23, 16 )
