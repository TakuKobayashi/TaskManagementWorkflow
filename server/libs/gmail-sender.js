
const { google } = require('googleapis');
/*
アクセストークンがあればアクセストークンを使い、なければリフレッシュトークンを使う
credentials: {
  refresh_token: リフレッシュトークン,
  access_token: アクセストークン
}
*/

/*
toMailInfo: {
  toName: 送りたい人の名前,
  toMailAdress: 送りたい人のEmailアドレス,
  contentType: HTMLメールかとか(デフォルトはtext/html; charset=utf-8)
  mimeVersion: デフォルトは1.0
  subject: タイトル,
  body: 本文,
}
*/
// TODO今度TypeScript化する
exports.sendGmail = async function sendGmail(credentials, toMailInfo = {}){
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  oauth2Client.setCredentials(credentials);
  const mimeVersion = toMailInfo.mimeVersion || '1.0'
  const contentType = toMailInfo.contentType || 'text/html; charset=utf-8'
  const messageArr = [
    ['From:', toMailInfo.toName, toMailInfo.toMailAdress].join(' '),
    ['To:', toMailInfo.toName, toMailInfo.toMailAdress].join(' '),
    ['Content-Type:', contentType].join(' '),
    ['MIME-Version:', mimeVersion].join(' '),
    ['Subject:', toMailInfo.subject].join(' '),
    toMailInfo.body,
  ]
  const message = messageArr.join('\n');
  const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  // userIdは誰の名前で送りますか?ということ。認証済みである本人が送る場合'me'で設定して送るといい
  return gmail.users.messages.send({userId: "me", requestBody: {raw: encodedMessage}})
}