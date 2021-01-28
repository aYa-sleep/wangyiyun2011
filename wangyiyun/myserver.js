let express=require("express")();//里面的express是一个方法
let mysql=require("mysql");
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
// 登录
express.get("/login",(request,response)=>{
    // console.log("zheshiyige");
    // response.send("hello")
    let username = request.query.username;//获取请求参数的参数名
    let password = request.query.password;
    //调用数据库
    sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`,(error,data)=>{
        if(error){
            console.log("error");//给后端控制台返回
            response.send("error")
        }else{
            if(!data.length){//如果数据库中没有语句
                console.log("error");
                response.send("error")
            }else{
                response.send("success");
            }
        }
    })
})
express.listen(port);

//规划链接
let sql=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"school"
})
//尝试链接
sql.connect();

//注册
express.get("/add",(request,response)=>{
    let username = request.query.username;//获取请求参数的参数名
    let password = request.query.password;
    if(username && password){
        sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`,(error)=>{
            if(error){
                console.log("error");//给后端控制台返回
                response.send("error")
            }else{
                console.log("success")
                response.send("success");
            }
        })
    }else{
        console.log("error")
        response.send("error")
    }
    
})


//获取编辑推荐商品信息
express.get("/getGoods",(request,response)=>{
    
    let id=request.query.id
    let s=id?`SELECT * FROM bian WHERE id="${id}"`:`SELECT * FROM bian ORDER BY id`
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
//获取热门商品信息
express.get("/addGoods",(request,response)=>{
    
    let id=request.query.id
    let s=id?`SELECT * FROM goodslist WHERE id="${id}"`:`SELECT * FROM goodslist ORDER BY id`
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


//获取商品列表信息
express.get("/lieGoods",(request,response)=>{
    
    let id=request.query.id
    let s=id?`SELECT * FROM liebiao WHERE id="${id}"`:`SELECT * FROM liebiao ORDER BY id`
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






//获取账户信息
express.get("/xinxi",(request,response)=>{
    
    let id=request.query.id
    let s=id?`SELECT * FROM p_center WHERE id="${id}"`:`SELECT * FROM p_center ORDER BY id`
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
// 修改账户信息
express.get("/gai",(request,response)=>{
    console.log("gai")
    // UPDATE 表名 SET 字段名="新值",字段名="新值" WHERE 字段名="某值"
    let id1 = request.query.id;
    let name=request.query.name
    let hoby=request.query.hoby
    let phone=request.query.phone


    if(id && name && phone && hoby){
        let a=`UPDATE p_center SET name="${name}",phone="${phone}",hoby="${hoby}" WHERE id="${id1}"`
        console.log(a)
        sql.query(a,(error)=>{
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