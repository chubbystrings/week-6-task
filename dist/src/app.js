"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
/* eslint-disable max-len */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan")); // for accessing config in .env file
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const rfs = require('rotating-file-stream');
const app = express_1.default();
app.use(body_parser_1.default.json());
const requestLogStream = rfs.createStream('request.log', {
    interval: '1d',
    path: path_1.default.join(__dirname, 'logs'),
});
// to resolve cross origin resource shearing (CORS) error add folowing to te response header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms', { stream: requestLogStream }));
app.use(morgan_1.default('dev'));
app.use('/api/v1/week-6-task', index_1.default);
app.get('*', (req, res) => { res.end('Server is Live'); });
exports.default = app;
