import { Id } from "convex/values";
import { query, mutation } from "./_generated/server";

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
    db.replace(id, doc);
})

export const downvote = mutation(async ({db}, id: Id) => {
    const doc: Question | undefined = await db.get(id);
    if (!doc) {
        return;
    }
    doc.votes -= 1;
    db.replace(id, doc);
})

export const rollTheDice = mutation(async ({db}, id: Id) => {
    const doc: Question | undefined = await db.get(id);
    if (!doc) {
        return;
    }
    doc.votes += Math.floor((Math.random() * 10) - 5);
    db.replace(id, doc);
});
