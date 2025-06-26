"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function NewIssuePage() {
    return (
    <div className="flex flex-col gap-2 max-w-xl">
        <h1>New Issue</h1>
        <TextField.Root variant="surface" placeholder="Title" />
        <SimpleMDE placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
    );
}