
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books')
.then(() => console.log('Connection Successfully'))
.catch((err) => console.log('Connection failed:', err.message))

const author = new mongoose.Schema({
    name: String,
    website: String
})

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    website: String
}))

const Book = mongoose.model('Books', new mongoose.Schema({
    name: { type: String, required: true },
    author: author,
    numberInStock: { type: Number, required: true},
    rentalperDay: Number,
    price: { type: Number, required: true}
}))

async function addBook(name, author, numberInStock, rentalperDay, price){
    const book = new Book({ name, author, numberInStock, rentalperDay, price })
    const result = await book.save()
    console.log(result)
}

addBook( 'Transforming Your Pastoral Ministry', new Author ({ name: 'Dag Heward Mills', website: 'www.Dag Heward Mills.com' }), 87, 12, 89.99)
 addBook( 'Principle and Power of Vision', new Author ({ name: 'Dr Myles Munroe', website: 'www.Dr Myles Munroe.com' }), 87, 12, 89.99)
 addBook( 'Unmerited Favor', new Author ({ name: 'Joseph Prince', website: 'www.Joseph Prince.com' }), 87, 12, 89.99)
 addBook( 'Holy Spirit and You', new Author ({ name: 'Benny Hinn', website: 'www.Benny Hinn.com' }), 87, 12, 89.99)
 addBook( 'Join This Chario', new Author ({ name: 'Chris Oyakilome', website: 'www.Chris Oyakilome.com' }), 87, 12, 89.99)
 addBook( 'Golden Heart for Golden Relationship', new Author ({ name: 'Sefam Lawrence Tamakloe', website: 'www.Sefam Lawrence Tamakloe.com' }), 87, 12, 89.99)
