"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/issues/route";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IssueForm {
    title: string;
    description: string;
}

export default function NewIssuePage() {
    const router = useRouter();

    const { 
        register, 
        handleSubmit, 
        control
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            toast.success("Issue created successfully");
            console.log("submitted", data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="flex flex-col gap-2 max-w-xl">
        <h1>New Issue</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <TextField.Root 
                variant="surface" 
                placeholder="Title" 
                {...register("title")} />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE 
                        placeholder="Description" 
                        {...field}
                    />
                )}
            />
            <Button type="submit">Submit New Issue</Button>
        </form>
    </div>
    );
}