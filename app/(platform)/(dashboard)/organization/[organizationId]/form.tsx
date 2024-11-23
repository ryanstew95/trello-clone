"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";

// Define the state type
type FormState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export const Form = () => {
  const [formState, setFormState] = useState<FormState>({ message: null, errors: {} });
  const [title, setTitle] = useState("");

  // Function to clear the message after a delay
  const clearMessageAfterTimeout = (delay: number = 2000) => {
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        message: null,
      }));
    }, delay);
  };

  // Use the `useAction` hook to handle createBoard logic
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      setFormState({ message: "Board created successfully!", errors: {} });
      setTitle(""); // Clear the form
      clearMessageAfterTimeout(); // Clear success message after 3 seconds
    },
    onError: (error) => {
      console.error("Failed to create board:", error);
      setFormState((prev) => ({
        ...prev,
        message: "An error occurred while creating the board.",
      }));
      clearMessageAfterTimeout(); // Clear error message after 3 seconds
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset form state before submission
    setFormState({ message: null, errors: {} });

    execute({ title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          placeholder="Enter a board title"
          className="border-black border p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* Display field-specific errors */}
        {formState.errors?.title && (
          <div>
            {formState.errors.title.map((error) => (
              <p key={error} className="text-rose-500">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <Button type="submit">Submit</Button>
      {/* Display success or error message */}
      {formState.message && (
        <p className={formState.message.includes("successfully") ? "text-green-500" : "text-red-500"}>
          {formState.message}
        </p>
      )}
    </form>
  );
};
