const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
  const course = await Course.update({ _id: courseId}, {
    $set: {
      'author.name': 'Joel Nii Amonquaye',
      'author.bio': 'Jaylor Taylor'
    }
  })
  console.log(course)
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
  console.log(course)
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
  console.log(author) 
}


// createCourse('Regions', [
//   new Author({ name: 'Takoradi', bio: 'Western Side' }), 
//   new Author({ name: 'Legon Campus', bio: 'Greater Accra' })
// ]);

//updateCourse('5e452dfd4053e723a8ce1d0e')

//addAuthor('5e4535b8d244ec23cedc3d73', new Author({name: 'Amie Anderson', bio: 'Single'}))

removeAuthor('5e4535b8d244ec23cedc3d73', '5e4535b8d244ec23cedc3d72')