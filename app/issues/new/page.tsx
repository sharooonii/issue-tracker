"use client";

import { TextField, Button, TextArea } from "@radix-ui/themes";

export default function NewIssuePage() {
    return (
    <div className="flex flex-col gap-2 max-w-xl">
        <h1>New Issue</h1>
        <TextField.Root variant="surface" placeholder="Title" />
        <TextArea variant="surface" placeholder="Description" rows={5} />
        <Button>Submit</Button>
    </div>
    );
}