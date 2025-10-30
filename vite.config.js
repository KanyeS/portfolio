import { defineConfig, loadEnv } from "vite";
import plugins from "./plugin.ts";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), ["VITE_"]);

    return {
        plugins: plugins(mode),
        build: {
            outDir: 'build'  
        },
        server: {
            port: 3000, 
            open: true
        },
    };
});