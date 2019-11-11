const asana = require('asana');

exports.AsanaApiHandler = class AsanaApiHandler {
  constructor(accessToken){
    this.client = asana.Client.create().useAccessToken(accessToken);
  }

  async getWorkSpaces(){
    const userInfo = await this.client.users.me()
    return userInfo.workspaces;
  }

  async getProjects(workspaceId){
    return this.client.projects.findAll(workspaceId);
  }

  async registerWebhook(workspaceId){
    return this.client.projects.findAll(workspaceId);
  }

  async static receiveWebhookPayload(payload){

  }
}