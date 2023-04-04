import express, { json, urlencoded } from 'express';
import path from 'path';
import cors from 'cors';
import fileupload from 'express-fileupload';
import { Server } from 'http';
import { fileURLToPath } from 'url';
import { errorHandler } from './middlewares/error-handler';
import { customLogger } from './middlewares/logger';
import routes from './routes';
import connectMongoDB from './db/mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(cors('*'));
app.use(fileupload());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: false, limit: '50mb' }));
app.use(customLogger);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public'));

app.use(routes);
app.use(errorHandler);

connectMongoDB();

const httpServer = new Server(app);
httpServer.listen(PORT, function () {
  console.log(`[setup] server started on port ${PORT}`);
});