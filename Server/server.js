const express=require("express");
const bodyparser=require('body-parser');
const cors= require('cors');
const connectionPool=require('./db')
const app=express();


app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors())

app.get('/viewdata',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        myConnection.query('select * from studentdata',(err,result)=>{
            if(err){
                console.error("Erro :",err.message)
            }else{
                console.log(result)
                res.send(JSON.stringify(result))
            }
        })
        myConnection.release();
    })
    
})

app.get('/search/:name',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        myConnection.query("select * from studentdata where firstname='"+req.params.name + "'",(err,result)=>{
            if(err){
                console.error("error:",err.message)
            }else{
                res.send(JSON.stringify(result))
            }
        })
    })
})

app.get('/data/:email',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        myConnection.query("select * from studentdata where email='"+req.params.email + "'",(err,result)=>{
            if(err){
                console.error("error:",err.message)
            }else{
                res.send(JSON.stringify(result))
            }
        })
    })
})

app.put('/updateData/:email',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        const sql = `
        UPDATE studentdata SET 
            firstname = ?, 
            lastname = ?, 
            location = ?, 
            email = ?, 
            dob = ?, 
            education = ?, 
            about = ? 
        WHERE email = ?
    `;
    
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.location,
        req.body.email,
        req.body.dob,
        req.body.education,
        req.body.about,
        req.params.email
    ];
        myConnection.query(sql,values, (err,result)=>{
            if(err){
                console.error("error:",err.message)
            }else{
                console.log('updated')
                res.send(JSON.stringify(result))
            }
        })
        myConnection.release()
    })
})
app.post('/postData',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        let storeData={
                    firstname:req.body.firstName,
                    lastname:req.body.lastName,
                    location: req.body.location,
                    email: req.body.email,
                    dob:req.body.dob,
                    education: req.body.education,
                    about: req.body.about,
        }
        myConnection.query('INSERT INTO studentdata SET ?',storeData,(err,result)=>{
            if(err){
                    console.error("Error:",err.message)
            }else{
                    res.send(JSON.stringify(result))
            }
        })
        myConnection.release();
    })

})
app.delete('/deleteData/:email',(req,res)=>{
    connectionPool.getConnection((err,myConnection)=>{
        if(err){
            console.log("Connection Fail")
        }else{
            console.log("Connected")
        }
        let qry="DELETE FROM studentdata WHERE email='"+req.params.email + "'";
        myConnection.query(qry,(err,result)=>{
            if(err){
                console.error("Error:",err.message)
            }else{
                res.send("Delete Success")
            }
        })
        myConnection.release();
    })
})
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).send('Search term is required');
    }

    connectionPool.getConnection((err, myConnection) => {
        if (err) {
            console.log("Connection Fail");
        } else {
            console.log("Connected");
        }
        const sql = `
        SELECT * FROM studentdata 
        WHERE firstname LIKE ? 
        OR lastname LIKE ? 
        OR location LIKE ? 
        OR email LIKE ? 
        OR education LIKE ? 
        OR about LIKE ?
    `;
        const values = new Array(6).fill(`%${searchTerm}%`);

        myConnection.query(sql, values, (err, result) => {
            if (err) {
                console.error("error:", err.message);
                res.status(500).send('Server error');
            } else {
                res.send(JSON.stringify(result));
            }
        });
        myConnection.release();
    });
});
app.listen(3000,"localhost",()=>{
    console.log('Server is running on http://localhost:3000')
})