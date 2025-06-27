"use client";

import { TextField, Button, Callout } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/issues/route";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

interface IssueForm {
    title: string;
    description: string;
}

export default function NewIssuePage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const { 
        register, 
        handleSubmit, 
        control,
        formState: { errors }
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = async (data: IssueForm) => {
        try {
            setError(""); // Clear any previous errors
            await axios.post("/api/issues", data);
            router.push("/issues");
            toast.success("Issue created successfully");
            console.log("submitted", data);
        } catch (error) {
            console.log("API Error:", error);
            setError("An error occurred while creating the issue");
        }
    };

    // Check if there are any validation errors
    const hasValidationErrors = Object.keys(errors).length > 0;

    return (
    <div className="flex flex-col gap-2 max-w-xl">
        <h1>New Issue</h1>
        {(error || hasValidationErrors) && (
            <Callout.Root color="red">
                <Callout.Text>
                    {error || "Please fill in all required fields"}
                </Callout.Text>
            </Callout.Root>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
                <TextField.Root 
                    variant="surface" 
                    placeholder="Title" 
                    {...register("title")} />
            </div>
            <div>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE 
                            placeholder="Description" 
                            options={{
                                spellChecker: false,
                                status: false,
                            }}
                            {...field}
                        />
                    )}
                />
            </div>
            <Button type="submit">Submit New Issue</Button>
        </form>
    </div>
    );
}