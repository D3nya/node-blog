import express from 'express';
import expressHandlebars from 'express-handlebars';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import compression from 'compression';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';
import { successMsg, errorMsg } from './utils/chalk.js';
import { year } from './utils/date.js';
import contactRouter from './routes/contact-router.js';
import postRouter from './routes/post-router.js';

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || '';

mongoose
  .connect(uri)
  .then(() => console.log(successMsg('Connected to MongoDB')))
  .catch((error) => console.log(errorMsg(error)));

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'unsafe-inline'"],
        'style-src': null,
      },
    },
  })
);
app.use(limiter);

const hbs = expressHandlebars.create({
  extname: '.hbs',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  defaultLayout: 'index',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    year,
  });
});

app.use(contactRouter);
app.use(postRouter);

app.use(function (req, res, next) {
  res.status(404).render('error', {
    title: 'Error',
    year,
    error: 'Sorry cant find that!',
  });
});

app.use(function (error, req, res, next) {
  console.error(errorMsg(error));
  res.status(500).render('error', {
    title: 'Error',
    year,
    error,
  });
});

app.listen(port, (error) =>
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Server listening on ${port}`))
);
