import { mutation, query } from "@convex-dev/server";

export const stopQuestions = mutation(async ({db}) => {
    db.insert("stream", {stopped: true});
});

export const isStopped = query(async ({db}) => {
    const doc = await db.table("stream").first();
    return doc?.stopped ?? false;
})