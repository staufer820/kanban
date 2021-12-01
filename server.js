'use strict'
import {Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts";

const app = new Application();
const router = new Router();
router.get("/",(context)=>{
        return send(context,"/frontend/index.html");
});
app.use(router.routes());
app.listen({port:8000});