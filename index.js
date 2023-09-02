import express from "express";
import { join } from "path";
import serveStatic from "serve-static";
import { readFileSync } from "fs";
import { apiRouter } from "./routes/index.js";
import { PolarisTutrialDB } from "./db/polaris-tutrial-db.js";

const app = express();
const PORT = process.env.PORT || 8080;
const STATIC_PATH = `${process.cwd()}/frontend/dist`;

PolarisTutrialDB.init(); //データベースのinit 

app.use(express.json()); //apiRouterの前に定義しておかないと、bodyを受け取れない
apiRouter(app);


app.use(serveStatic(STATIC_PATH, {index: false}));

app.use("/*", async (req, res, next) => {
    const index = readFileSync(join(STATIC_PATH, "index.html"), "utf8");
    return res
        .status(200)
        .set("Content-Type", "text/html")
        .send(index);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});