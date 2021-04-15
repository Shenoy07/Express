const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());//Adding middleware

const courses = [
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
  {id:4, name:'course4'}
];
app.get('/',(req, res)=>
{
  res.send('Hello World!');
});

app.get('/api/course',(req,res)=>
{
  res.send([1,2,3]);
});

app.get('/api/course/:id',(req,res)=>
{
  res.send(req.params.id);
});

app.get('/api/course/:year/:month',(req,res)=>
{
  res.send(req.params);
});
//need to start from here
app.get('/api/courses',(req,res)=>
{
  res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>
{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('The course with given is not found');//404
  res.send(course);
});
//-------------------------------------------------------------------------------------------
app.post('/api/courses', (req, res)=>{

  const { error} = validateCourse(req.body);
    if(error) return  res.status(400).send(result.error.details[0].message);

/*
  console.log(result);
  if(!req.body.name || req.body.name.length < 3){
    //400 Bad Request
    res.status(400).send('Name is required and should be minimum 3 characters.')
    return;
  }*/
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});//now we ll do it using JOI

//-----------------------------------------------------------------------------------------------
app.put('/api/courses/:id', (req, res)=>{
  //look up the course
  //If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given is not found');//404


const { error} = validateCourse(req.body);
  if(error) return res.status(400).send(result.error.details[0].message);

  //update course
  //Return the updated course
  course.name = req.body.name;
  res.send(course);


});

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}


//-----------------------------------------------------------------------------------------

app.delete('/api/courses/:id',(req,res)=>{
  //look up the course
  //not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('The course with given is not found');//404

  //delete
const index = courses.indexOf(course);
courses.splice(index, 1);

res.send(course);
  //return same course
})








const port = process.env.PORT || 3000;//it means either use env port variable or use 3000
app.listen(port,()=>console.log(`listening on port ${port}...`));//we dont have any env port number here, so we set it by going to terminal and giving
//set PORT=5000
