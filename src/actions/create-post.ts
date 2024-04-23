"use server";
import { db } from "@/db";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import paths from "@/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostProps {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function CreatePost(
  slug: string,
  formState: CreatePostProps,
  formData: FormData
): Promise<CreatePostProps> {
  const session = await auth();

  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["cannot find topic"],
      },
    };
  }
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        userId: session.user.id,
        topicId: topic.id,
        title: result.data.title,
        content: result.data.content,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }
  revalidatePath(paths.topicShowPath(slug));
  redirect(paths.postShow(slug, post.id));
}
