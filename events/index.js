import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function(socket) {
    fs.readdirSync(__dirname).forEach(async function(file) {
        if (file == "index.js")
            return;
        
        console.log("import et");
        const filename = file.split(".")[0];
        const _function = await import(`./${file}`);
        socket.on(filename, (msg) => _function.default(socket, msg));
    });
};
