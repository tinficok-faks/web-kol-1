const express = require("express");
const port = 3000;

const app = express();

app.get("/api/test", (req, res) => {
    res.send({ message: "Communication works" });
});

app.listen(port);