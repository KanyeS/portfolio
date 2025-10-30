import { PluginOption } from "vite";

// For React Support
import react from "@vitejs/plugin-react";

const plugins = (mode: string): PluginOption[] => {
    return [
        react({ include: "./src/" }),
    ];
};

export default plugins;