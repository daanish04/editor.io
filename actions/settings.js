"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getSettings() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!user) throw new Error("User is not found");

    const settings = await db.settings.findUnique({
      where: {
        userId: user.id,
      },
    });

    return settings;
  } catch (error) {
    console.error("Error getting settings", error);
    return null;
  }
}

export async function updateSettings(newSettings) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!user) throw new Error("User is not found");

    const updated = await db.settings.upsert({
      where: {
        userId: user.id,
      },
      update: newSettings,
      create: {
        userId: user.id,
        ...newSettings,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating settings", error);
    return { success: false, error: error.message };
  }
}
