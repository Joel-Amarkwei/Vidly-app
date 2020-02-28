
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genreSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, minlength: 5, maxlength: 25 },
  author: { type: String, minlength: 5, maxlength: 40 },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished }
      }
})
const Genre = mongoose.model('Genre', genreSchema)

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    id: req.body.id,
    name: req.body.name,
    author: req.body.author,
    isPublished: req.body.isPublished,
    price: req.body.price
  });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findByIdAndUpdate( req.params.id, { 
      name: req.body.name,
      id: req.body.id,
      author: req.body.author,
      isPublished: req.body.isPublished,
      price: req.body.price,
      new: true } )
      
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove( req.params.id )
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    id: Joi.number().required(),
    name: Joi.string().max(25).min(5).required(),
    author: Joi.string().min(5).max(40),
     isPublished: Joi.boolean(),
    price: Joi.number().required( { function() { return this.isPublished = false } })
  };
  
  return Joi.validate(genre, schema);
}

module.exports = router;

//I took this one off because I've not really found a
// tag: {
  //   type: Array,
  //   validate: {
  //     validator: function (gen) {
  //       return gen && gen.length > 0
  //     }
  //   }
  // },

  //declaring the constant for the genres
  //tag: req.body.tag,
  
//  and now for the validation this is what we get
//  tag: Joi.array().validate( { validate: { validator: function (gen) { return gen && gen.length > 0 }}} ),
   
