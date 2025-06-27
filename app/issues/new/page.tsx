"use client";

import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "../../validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
    const router = useRouter();

    const { 
        register, 
        handleSubmit, 
        control,
        formState: { errors, isSubmitting }
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
            console.log("API Error:", error);
            toast.error("An error occurred while creating the issue");
        }
    };

    return (
    <div className="flex flex-col gap-2 max-w-xl">
        <h1>New Issue</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
                <TextField.Root 
                    variant="surface" 
                    placeholder="Title" 
                    {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>
            <div className="space-y-1">
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
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                Submit New Issue
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    </div>
    );
}