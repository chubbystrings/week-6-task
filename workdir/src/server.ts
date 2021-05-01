import app from './app';

const logger = require('simple-node-logger').createSimpleLogger();

const port: number = Number(process.env.PORT) || 4500;
app.listen(port, () => logger.info(`My server is live ${port}`));
