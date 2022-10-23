import { PrismaClient } from "@prisma/client";
import { NextFunction, Router } from "express";
import { validateBodyArgs } from "../utils/utils";

export default function courseRouter(db: PrismaClient) {
    const router = Router();

    router.post("/new", async (req, res, next: NextFunction) => {
        console.log(req.body);

        const { course, total_fee } = req.body;

        if (!validateBodyArgs(course, total_fee)) {
            return res.status(400).json({
                message: "Invalid json body",
            });
        }

        if (course.length <= 0) {
            return res.status(400).json({ message: "Invalid course name" });
        }

        try {
            await db.course.create({
                data: {
                    title: course,
                    pending_fee: 0,
                    total_fee: Number(total_fee),
                },
            });
        } catch (e) {
            return next(e);
        }

        res.status(200).json({ message: "Added course successfully" });
    });

    router.get("/get/all", async (req, res, next: NextFunction) => {
        try {
            let output = await db.course.findMany();
            return res.status(200).json(output);
        } catch (e) {
            return next(e);
        }
    });

    return router;
}
