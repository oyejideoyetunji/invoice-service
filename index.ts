import express from "express";
import cors from "cors"
const app = express();


app.use(cors());
app.use(express.json())
const PORT = 8080;


app.get("/", (_req, _res) => {
    _res.send("Now you'are here")
});

app.get("/home", (_req, _res) => {
    const queryName = _req.query.name;

    if(queryName && typeof queryName === "string"){
        _res.send(`The name is ${queryName}`)
    }else{
        _res.send("Welcome Home!!")
    }
});


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});