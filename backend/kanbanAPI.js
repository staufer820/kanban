"use strict"
import {serve} from "https://deno.land/std@0.74.0/http/server.ts";

const server = serve({port:8000});

console.log("http://localhost");

for await(const req of server) {
    const text = await Deno.readTextFile('../frontend/index.html');
    req.respond({body: text});
}