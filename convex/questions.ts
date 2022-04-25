import { mutation, query } from "convex-dev/server";
import { Id } from "convex-dev/values";

export type Question = {
    id: Id,
    text: string,
    votes: number,
}

export const loadQuestions = query(async ({db}): Promise<Question[]> => {
    const ret: Question[] = [];
    for (const question of await db.table("questions").collect()) {
        ret.push({
            id: question._id,
            text: question.text,
            votes: question.votes,
        })
    }
    ret.sort((a, b) => b.votes - a.votes);
    return ret;
});

export const upvote = mutation(async ({db}, id: Id) => {
    const doc: Question | undefined = await db.get(id);
    if (!doc) {
        return;
    }
    doc.votes += 1;
    db.update(id, doc);
})

export const downvote = mutation(async ({db}, id: Id) => {
    const doc: Question | undefined = await db.get(id);
    if (!doc) {
        return;
    }
    doc.votes -= 1;
    db.update(id, doc);
})
