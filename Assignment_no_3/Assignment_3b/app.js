const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const app = express();
 
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vedikabhusari23:23ved%2312ka%40%2A4@zomato.ur9q0.mongodb.net/Zomato?retryWrites=true&w=majority&appName=Zomato')

const StudentSchema = new mongoose.Schema({
    name:String,
    marks:Number
})

const Student = mongoose.model('Student',StudentSchema);

//get home page
app.get('/',(req,res) => {
    res.send('Welcome to api connection');
})

//get all students
app.get('/students',async(req,res) =>{
    const students = await Student.find();
    res.send(students);
})

//get student with name
app.get('/students/:name',async(req,res) =>{
    const {name} = req.params;
    const students = await Student.find({name});
    res.send(students);
})

// add student
app.post('/students',async(req,res) =>{
    const { name, marks} = req.body;
    const student = new Student({name, marks});
    await student.save();
    res.send(student);
})

//delete student with name
app.delete('/delete/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const student = await Student.findOneAndDelete({ name }); 
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send(student); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//delete many student with marks given in code
app.delete('/delete-students',async(req,res) =>{
    try{
        const student = await Student.deleteMany({ marks:{$lt:79} });
        if (student.deletedCount === 0) {
            return res.status(404).send('No students found with marks less than 50');
        }
        res.send(student); 
    } catch (error){
        console.error(error);
        res.status(500).send('Server error');
    }
    
})

//delete many student with less than marks given in url
app.delete('/delete-students/:marks', async (req, res) => {
    const { marks } = req.params;
    try {
        const student = await Student.deleteMany({ marks: { $lt: parseInt(marks) } });
        if (student.deletedCount === 0) {
            return res.status(404).send('No students found with marks less than ' + marks);
        }
        res.send(student);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//to update the student information by id
app.put('/update/:id',async(req,res) =>{
    try{
        const{id} = req.params;
        const {name,marks} = req.body;
        const student= await Student.findByIdAndUpdate(id,{name,marks},{new:true, upsert:true});
        res.status(200).json({message:'Student updated successfully!',student});
    } catch(error){
        res.status(500);
    }
})


app.listen(3000,() =>{
    console.log(`Server is running on http://localhost:3000`)
})