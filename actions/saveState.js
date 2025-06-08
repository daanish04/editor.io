"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function saveCode(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User is not found");

    if (data.id) {
      const existing = await db.code.findUnique({
        where: { id: data.id },
      });
      if (!existing || existing.userId !== user.id) {
        throw new Error("User unauthorized");
      }

      const updated = await db.code.update({
        where: { id: data.id },
        data: {
          name: data.name,
          html: data.html,
          css: data.css,
          js: data.js,
          updatedAt: new Date(),
        },
      });
      return { success: true, data: updated };
    } else {
      const created = await db.code.create({
        data: {
          name: data.name,
          html: data.html,
          css: data.css,
          js: data.js,
          userId: user.id,
        },
      });
      return { success: true, data: created };
    }
  } catch (error) {
    console.error("Error saving code", error);
    return { success: false, error: error.message };
  }
}

export async function getCode(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User is not found");

    const code = await db.code.findUnique({
      where: { id },
    });

    return { success: true, data: code };
  } catch (error) {
    console.error("Error saving code", error);
    return { success: false, error: error.message };
  }
}

export async function saveMd(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User is not found");

    if (data.id) {
      const existing = await db.markdown.findUnique({
        where: { id: data.id },
      });
      if (!existing || existing.userId !== user.id) {
        throw new Error("User unauthorized");
      }

      const updated = await db.markdown.update({
        where: { id: data.id },
        data: {
          name: data.name,
          markdown: data.markdown,
          updatedAt: new Date(),
        },
      });
      return { success: true, data: updated };
    } else {
      const created = await db.markdown.create({
        data: {
          name: data.name,
          markdown: data.markdown,
          userId: user.id,
        },
      });
      return { success: true, data: created };
    }
  } catch (error) {
    console.error("Error saving markdown", error);
    return { success: false, error: error.message };
  }
}

export async function getMd(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User is not found");

    const code = await db.markdown.findUnique({
      where: { id },
    });

    return { success: true, data: code };
  } catch (error) {
    console.error("Error saving code", error);
    return { success: false, error: error.message };
  }
}
