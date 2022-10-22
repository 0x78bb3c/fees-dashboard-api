import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import feesRouter from "./routes/fees";

const prisma = new PrismaClient();

async function main() {
    dotenv.config();
    const PORT = process.env.PORT || 8080;

    const app = express();

    app.get("/", (req, res) => {
        res.send("hi");
    });

    app.use("/fees", feesRouter(prisma));

    app.listen(PORT, () => {
        console.log(`[INFO] started on PORT: ${PORT}`);
    });
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
