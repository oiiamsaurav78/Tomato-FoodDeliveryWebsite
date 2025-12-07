import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const port = 4000;

// --- CORS MUST COME FIRST ---
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
app.use(cors());
// --- Body Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DB ---
connectDb();

// --- Routes ---
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

// --- Test Route ---
app.get("/", (req, res) => {
    res.send("API Working");
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
