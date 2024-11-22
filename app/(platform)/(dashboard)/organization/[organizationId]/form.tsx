"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { create } from "@/actions/create-board";

// Define the state type
type FormState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export const Form = () => {
  const [formState, setFormState] = useState<FormState>({ message: null, errors: {} });
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors before submission
    setFormState({ message: null, errors: {} });

    const formData = new FormData();
    formData.append("title", title);

    try {
      // Call the `create` function
      const response = await create(formState, formData);

      if (response.error) {
        setFormState((prev) => ({
          ...prev,
          errors: response.error,
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          //message: "Board created successfully!",
        }));
      }
    } catch (error) {
      console.error("Failed to create board:", error);
      setFormState((prev) => ({
        ...prev,
        //message: "An error occurred while creating the board.",
      }));
    }
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
        {formState.errors?.title && (
          <div>
            {formState.errors.title.map((error: string) => (
              <p key={error} className="text-rose-500">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <Button type="submit">Submit</Button>
      {formState.message && <p>{formState.message}</p>}
    </form>
  );
};
