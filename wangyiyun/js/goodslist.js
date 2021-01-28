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
express.listen(port);

express.get("/getGoods",(request,response)=>{
    
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

