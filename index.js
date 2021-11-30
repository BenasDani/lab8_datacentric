var express = require('express')

var mySQLDAO = require ('./mySQLDAO')
var app = express()

app.set('view engine', 'ejs')



app.get('/', (req,res)=>{
    mySQLDAO.getStudents()
    .then((result)=>{
        console.log(result)
        res.render('showStudents', {students:result})

    })
    .catch((error)=>{
        res.send(error)

    })
   
})

//very important
app.get('/students/:student',(req,res)=>{
    mySQLDAO.getStudent(req.params.student)
    .then((result)=>{
        if(result.length > 0){
            res.send(result)
        }else {
            res.send("<h3>No such student with ID: " + req.params.student)
        }
        

    })
    .catch((error)=>{
        console.log("not ok")
        res.send(error)

    })
    
})

app.get('/colleges/:college', (req,res)=>{
    mySQLDAO.deleteCollege(req.params.college)
    .then((result)=>{
        if(result.affectedRows == 0){
            res.send("<h3>College " + req.params.college + "doesnt exist</h3>")
        }else{
            res.send("<h3>College: "+ req.params.college + "deleted</h3>")
        }
        

    })
    .catch((error)=>{
        if(error.code == "ER_ROW_IS_REFERENCED_2"){
            res.send("<h3>ERROR: " +error.errno + " cant delete colle with ID:" +req.params.college + " as it has associated courses</h3>")
        }
        res.send("<h3>ERROR: " +error.errno + " "  + error.sqlMessage + "</h3>")

    })

})


app.listen(3004, ()=>{
    console.log("Listening on port 3000")
})