import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import courseRouter from "./routes/course";
import { errorRequestMiddleware, logInfo } from "./utils/utils";

const prisma = new PrismaClient();

async function main() {
    dotenv.config();
    const PORT = process.env.PORT || 8080;

    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.send("hi");
    });

    app.use("/course", courseRouter(prisma));

    app.use(errorRequestMiddleware);

    app.listen(PORT, () => {
        logInfo(`Server started on PORT: ${PORT}`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
