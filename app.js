const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "9e591b0174bcc7e37b9d0329c74542b0";    
    var url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey ;
    https.get(url, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const desc = weatherData.weather[0].description;
          const imageSrc = weatherData.weather[0].icon;
          const imageUrl = "http://openweathermap.org/img/wn/" + imageSrc + "@2x.png";
          res.write("<p>The weather is " + desc + " in " + query + ".</p>");          
          res.write("<h1>The temperature in " + query + " is " + temp + " degree kelvin.</h1>");
          res.write("<img src='" + imageUrl + "' alt='icon-img'>");
          res.send();
       });
    });
});



app.listen(3000, function(){
    console.log("Server is started on port 3000.");
});


