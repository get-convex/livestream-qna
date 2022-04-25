import { mutation } from "convex-dev/server";

export default mutation(async ({db}, text: string) => {
    db.insert("questions", { text, votes: 0 });
})