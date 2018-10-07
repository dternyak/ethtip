import { createHmac } from 'crypto';
import { IMiddleware } from 'koa-router';
export const handleChallengeResponse: IMiddleware = ctx => {
  console.log('handing response challenge');
  const { crc_token } = ctx.request.query;

  const hmac = createHmac(
    'sha256',
    '5She0Y71mAwAFFWqbGextenTR8Ji9CVyBdPEUlYARCRd8oj1po',
  );
  hmac.update(crc_token);

  const digest = hmac.digest('base64');
  ctx.status = 200;
  ctx.body = { response_token: `sha256=${digest}` };
};
