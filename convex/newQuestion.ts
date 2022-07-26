import { mutation } from "./_generated/server";

export default mutation(async ({db}, text: string) => {
    db.insert("questions", { text, votes: 0 });
})