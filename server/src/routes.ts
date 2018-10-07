import Router = require('koa-router');
import { handleChallengeResponse } from './handlers/webhooks';
import { Twitter } from 'twit';
enum TRANSFER_TYPE {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
}

interface ExtractedTweet {
  tranferType: TRANSFER_TYPE;
  amount: string; // wei
  destination: string; //twitter username || eth address
  sender: string; // twitter username || eth address
  date: string; // when tip was sent
}

enum ACCOUNT_ACTIVITY {
  TWEET = 'tweet_create_events',
  DM = 'direct_message_indicate_typing_events',
}

export function drawRoutes(r: Router) {
  r.get('/', ctx => (ctx.status = 200));
  r.get('/webhook', handleChallengeResponse);
  r.post('/webhook', ctx => {
    if (!ctx.request.body) {
      return;
    }
    // @ethtip 0.1ETH @dternyak
    if (ctx.request.body[ACCOUNT_ACTIVITY.DM]) {
      console.log('dm received');
    }
    if (ctx.request.body[ACCOUNT_ACTIVITY.TWEET]) {
      const {
        text,
        id_str: tweetId,
        entities: { user_mentions: mentions },
        user: { id_str: userId },
      }: Twitter.Status = ctx.request.body[ACCOUNT_ACTIVITY.TWEET][0];

      if (!text) {
        return;
      }
      if (mentions.length !== 2) {
        return;
      }

      const [botMention, userDest] = mentions;
      if (botMention.id_str !== '2600510642') {
        return;
      }

      const ethAmount = text
        .slice(botMention.indices[1] + 1, userDest.indices[0])
        .replace('ETH', '');
      console.log(ethAmount);

      console.log('tweet mention received');
    }
    ctx.status = 200;
  });
}
