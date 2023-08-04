const express = require("express");
const cors = require("cors");

const clientesRoutes = require("./src/clientes/routes");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/clientes", clientesRoutes);

app.listen(port, () => console.log(`app observando port ${port}`));
