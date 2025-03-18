const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");  
const routes = require("./routes");  

const app = express();

app.use(cors());


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "../frontend"))); 

app.use("/api", routes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
