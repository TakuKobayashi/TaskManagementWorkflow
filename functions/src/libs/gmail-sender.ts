import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';
import { MailInfo } from './interfaces/mail-info';

export class GmailApi {
  private credentials: Credentials;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
  }

  async sendGmail(toMailInfo: MailInfo): Promise<void> {
    const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
    oauth2Client.setCredentials(this.credentials);
    const toName = toMailInfo.toName || toMailInfo.toMailAdress;
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const userAccountResponse = await gmail.users.getProfile({ userId: 'me' });
    const mimeVersion = toMailInfo.mimeVersion || '1.0';
    const contentType = toMailInfo.contentType || 'text/html; charset=utf-8';
    const messageArr = [
      ['From:', userAccountResponse.data.emailAddress, ['<', userAccountResponse.data.emailAddress, '>'].join('')].join(' '),
      ['To:', toName, ['<', toMailInfo.toMailAdress, '>'].join('')].join(' '),
      ['Content-Type:', contentType].join(' '),
      ['MIME-Version:', mimeVersion].join(' '),
      ['Subject:', toMailInfo.subject].join(' '),
      toMailInfo.body,
    ];
    const message = messageArr.join('\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    // userIdは誰の名前で送りますか?ということ。認証済みである本人が送る場合'me'で設定して送るといい
    const response = await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encodedMessage } });
    console.log(response);
  }
}
