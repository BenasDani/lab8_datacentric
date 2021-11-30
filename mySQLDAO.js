var mysql = require('promise-mysql');
var pool

//pool to connect to mqsql

mysql.createPool({
  connectionLimit : 3,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'studentdb3'
})
.then((result) =>{
pool = result

})
.catch((error)=>{
    console.log(error)
});


var getStudents = function() {
    return new Promise((resolve, reject)=>{

    
 //sends command to mysql database
 pool.query('select * from student_table')
 .then((result)=>{
     
     resolve(result)
 })
 .catch((error)=>{
 
     reject(error)
 })

})
}



 var getStudent = function(student_id){
     return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'select * from student_table where student_id = ?',
            values: [student_id]
        }



         pool.query('select * from student_table where student_id = ' + student_id)
         .then((result)=>{
            resolve(result)
         })
         .catch((error)=>{
         reject(error)
         })
     })


    
}

var deleteCollege = function(college_id){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'delete from college_table where college_id = ?',
            values: [college_id]
        }
        pool.query(myQuery)
        .then((result)=>{
            resolve(result)

        })
        .catch((error)=>{
            reject(error)

        })
    })
}


 
module.exports = {getStudents, getStudent, deleteCollege }