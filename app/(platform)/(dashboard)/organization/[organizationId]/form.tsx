"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

// Define the state type
type FormState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export const Form = () => {
  const [formState, setFormState] = useState<FormState>({
    message: null,
    errors: {},
  });
  const [title, setTitle] = useState("");

  // Use the `useAction` hook to handle createBoard logic
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      setFormState({ message: "Board created successfully!", errors: {} });
      setTitle(""); // Clear the form
    },
    onError: (error) => {
      console.error("Failed to create board:", error);
      setFormState((prev) => ({
        ...prev,
        message: "An error occurred while creating the board.",
      }));
    },
    onCompleted: () => {
      if (fieldErrors) {
        setFormState((prev) => ({
          ...prev,
          errors: fieldErrors,
        }));
      }
    },
  });

  const onSubmit = (formData: FormData) => {

const title = formData.get("title") as string;
console.log({ title });
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>
        Save
      </FormSubmit>
    </form>
  );
};
