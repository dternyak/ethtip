import 'reflect-metadata';
import Twit = require('twit');
import Koa = require('koa');
import { drawRoutes } from './routes';
import Router from 'koa-router';
import koaBody = require('koa-bodyparser');
import http from 'http';

const T = new Twit({
  consumer_key: 'n5CsAwz2oE5Ywo9IjX5yum36x',
  consumer_secret: '5She0Y71mAwAFFWqbGextenTR8Ji9CVyBdPEUlYARCRd8oj1po',
  access_token: '2600510642-h8mjydzw4dRMrxhODhmBZr7382dY8O954xCCrx3',
  access_token_secret: '0NrcRTQlbXmQIsKw8Bxle11DgqL4cwAPJPJT0ZG0Aa5rX',
});

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());
app.use(koaBody());

drawRoutes(router);

app.use(router.routes());

server.listen(3000);
console.log(`Server listening on ${3000}...`);

T.get(
  'account_activity/all/dev/webhooks',
  //  { url: 'https://ethtip.ngrok.io/webhook' },
  (err, res) => {
    if (err) {
      console.error('err', err);
    }
    console.log('webhook', res);
  },
);
// T.get('users/lookup', { user_id: '2600510642' }, (_, res) => console.log(res));
T.post('account_activity/all/dev/subscriptions');
