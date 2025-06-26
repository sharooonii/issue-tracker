import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    // validate request body
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 }); // client error
    }

    // create issue in database
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 }); // success response
}