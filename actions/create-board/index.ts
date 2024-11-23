"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId } = auth();

  // if (!userId) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }

  const { title } = data;

  let board;

  try {
    
   // throw new Error("Simulated error");

    board = await db.board.create({
      data: {
        title,
        // userId, // Associate the board with the authenticated user
      },
    });
  } catch (error) {
    console.error("Error creating board:", error);
    return {
      error: "Failed to create board.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
