import express from 'express';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", require("./routes/transactionRoutes.js"));

app.listen(5000, () => {
    console.log("server running on port 5000");
})