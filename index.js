import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "7217d7792bd0804b415afaad4f435629" ;
// const apiURl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiKey}`; This is for reference

app.use(express.static("public"));



app.get("/", async (req,res)=> {
    
    try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=${apiKey}&units=metric`);
        const temperature = Math.round(JSON.stringify(result.data.main.temp));
        const humidity = JSON.stringify(result.data.main.humidity);
        const name = (result.data.name);
        const windSpeed = JSON.stringify(result.data.wind.speed) ; 
        const weatherCondition = (result.data.weather[0].main) ;
        console.log(weatherCondition);
        res.render("index.ejs", {humid : humidity, temp: temperature, cityname : name , speed : windSpeed, condition : weatherCondition });   
        
    } catch (error) {
        res.send("Error");
    }
})

app.post("/submit", async (req,res)=> {
    const cityName = req.body["city"];
    // console.log(cityName);
    // res.send(cityName)
    
    try {
        // console.log(cityName);
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const temperature = Math.round(JSON.stringify(result.data.main.temp));
        const humidity = JSON.stringify(result.data.main.humidity);
        const name = (result.data.name);
        const windSpeed = JSON.stringify(result.data.wind.speed) ; 
        const weatherCondition = (result.data.weather[0].main) ;
        res.render("index.ejs", {humid : humidity ,temp : temperature, cityname: name, speed : windSpeed, condition: weatherCondition });
    
    } catch (error) {
        res.send("Enter city name")
    }
})

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
})