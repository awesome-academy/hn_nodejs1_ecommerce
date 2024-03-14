/* eslint-disable @typescript-eslint/ban-ts-comment */
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import i18nextBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { engine } from 'express-handlebars';
import i18next from 'i18next';
import router from './routes';
import winston from 'winston';
import session from 'express-session';
import flash from 'connect-flash';
const port = 3000;
const app = express();
import { AppDataSource } from './config/database';
import { Request, Response } from 'express';
import Handlebars from 'handlebars';
import registerI18nHelper from 'handlebars-i18next';
import { registerCustomHelpers } from './untils/handlebars-helpers';

registerI18nHelper(Handlebars, i18next);

registerCustomHelpers();

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});
AppDataSource.initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization', err);
  });
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'vi',
    preload: ['vi', 'en'],
    supportedLngs: ['vi', 'en'],
    saveMissing: true,
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.missing.json'),
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'locale', //query string on url (?locale=en/vi)
      lookupCookie: 'locale',
      ignoreCase: true,
      cookieSecure: false,
    },
  });
app.use(i18nextMiddleware.handle(i18next));

// Use cookie-parser middleware
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: process.env.JWT_SECRET,
  }),
);
app.use(flash());

app.use((req, res, next) => {
  // @ts-ignore
  res.locals.user = req.session.user;
  next();
});

app.set('views', path.join(__dirname, 'views'));
// Template engine
// app.engine('handlebars', exphbs());
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Use router
app.use(router);

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response) => {
  if (err) {
    console.error(err.stack);
  } else {
    res.status(500).send('Đã xảy ra lỗi!');
  }
});

app.all('*', (req: Request, res: Response) => res.json('error'));

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
