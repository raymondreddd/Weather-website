const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https = require("https");

//38ed35145f520310531ea5c63ae57f7e

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityname;
  const apikey="ad70713ad5f05662f3cc51cb18b870de";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;

  https.get(url,function(response){
    //console.log(response.statusCode);
  
    response.on("data",function(data){
      const wd=JSON.parse(data);
      const temp=wd.main.temp;
      const wdesc=wd.weather[0].description;
      const icon=wd.weather[0].icon;
      const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>temp is:"+temp+" <br>and weather is: "+wdesc+"</h1>");
      res.write("<img src="+imgurl+"> ");

      res.send();
    });
  });
});

app.listen(3000,function(){console.log("served");});
