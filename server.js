const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");
const protectedRoutes = require("./routes/protected");

// const swaggerDocument = require("./swagger.json");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running and connected to Supabase");
});

app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});