const express = require("express");
const cors = require("cors");

const route = require("./routes/route");
const cityRoute = require("./routes/city");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", route);
app.use("/api", cityRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});