'use strict'
import {Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import {apiRoutes} from "./backend/kanbanAPI.js";
import {frontendFiles} from "./backend/fileserver.js";

const app = new Application();
const router = new Router();
router.get("/",(context)=>{
        return send(context,"/frontend/index.html");
});

app.use(router.routes());
app.use(apiRoutes);
app.use(frontendFiles);
app.listen({port:8000});