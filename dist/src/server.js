"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger = require('simple-node-logger').createSimpleLogger();
const port = Number(process.env.PORT) || 4500;
app_1.default.listen(port, () => logger.info(`My server is live ${port}`));
