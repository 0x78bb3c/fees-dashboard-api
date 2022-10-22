import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export default function feesRouter(db: PrismaClient) {
    const router = Router();

    router.post("/new", async (req, res) => {
        let r = await db.course.create({
            data: {
                title: "Test",
                pending_fee: 0,
                total_fee: 100,
            }
        })
        console.log(r);
        return res.send("it works")
    })

    return router
}