export interface MailInfo {
  toName: string; // 送りたい人の名前
  toMailAdress: string; //送りたい人のEmailアドレス
  contentType: string; // HTMLメールかとか(デフォルトはtext/html; charset=utf-8)
  mimeVersion: string; //デフォルトは1.0
  subject: string; //タイトル
  body: string; //本文
}
