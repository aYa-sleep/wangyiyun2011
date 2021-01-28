let express = require("express")();
let mysql = require("mysql");
const port =8080;
express.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

//规划链接
let sql=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"school",
    timezone:"08:00"
})
//尝试链接
sql.connect()
//登录接口
express.get("/login",(request,response)=>{
    let username=request.query.username;
    let password=request.query.password;
    sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`,(error,data)=>{
        if(error){
            console.log("error");
            response.send("error");
        }else{
            if(!data.length){
                console.log("error");
                response.send("error");
            }else{
                console.log("success");
                response.send("success");
            }
        }
    })
})
//注册接口
express.get("/submit",(request,response)=>{
    let username=request.query.username;
    let password=request.query.password;
    sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`,(error)=>{
        if(error){
            console.log("error");
            response.send("error");
        }else{
            console.log("success");
            response.send("success");
            }
            
    })
})
//信息接口
express.get("/getStudent",(request,response)=>{
    
    let id=request.query.id
    let s=id?`SELECT * FROM content WHERE id="${id}"`:`SELECT * FROM content ORDER BY id`
    sql.query(s,(error,data)=>{
        if(error){
            console.log("error")
            response.send("error")
        }else{
            if(!data.length){
                console.log("error")
                response.send("error")
            }else{
                console.log("success")
                response.send(data)
            }
        }
    })
})
express.listen(port);

//删除接口
express.get("/delStudent",(request,response)=>{
    let id=request.query.id
    sql.query(`DELETE FROM content WHERE id="${id}"`,(error)=>{
        if(error){
            console.log("error");
            response.send("error")
        }else{
            console.log("success")
            response.send("success")
        }
    })
})

//新增接口
express.get("/addStudent",(request,response)=>{
    let name=request.query.name
    let sex=request.query.sex
    let age=request.query.age
    let city=request.query.city
    let joinDate=request.query.joinDate
    if(name && sex && age && city && joinDate){
        sql.query(`INSERT INTO content (name,age,sex,city,joinDate) VALUES ("${name}","${sex}","${age}","${city}","${joinDate}")`,(error,data)=>{
            if(error){
                console.log("error");
                response.send("error")
            }else{
                console.log("success")
                response.send("success")
            }
        })
    }else{
        console.log("error")
        response.send("error")
    }
})

//编辑
express.get("/bian",(request,response)=>{
    // UPDATE 表名 SET 字段名="新值",字段名="新值" WHERE 字段名="某值"
    let id = request.query.id;
    let name=request.query.name
    let sex=request.query.sex
    let age=request.query.age
    let city=request.query.city
    let joinDate=request.query.joinDate


    if(id && name && sex && age && city && joinDate){
        sql.query(`UPDATE content SET name="${name}","sex"=${sex}","age"=${age}","city="${city}","joinDate=${joinDate} WHERE name="aya_sleep",`,(error)=>{
            if(error){
                console.log("error");
                response.send("error")
            }else{
                console.log("success")
                response.send("success")
            }
        })
    }else{
        console.log("error")
        response.send("error")
    }

})