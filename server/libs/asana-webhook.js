const asana = require('asana');

exports.AsanaApiHandler = class AsanaApiHandler {
  constructor(accessToken){
    this.apiClient = asana.Client.create().useAccessToken(accessToken);
  }

  async getWorkSpaces(){
    const userInfo = await client.users.me()
    return userInfo.workspaces;
  }

  async getProjects(workspaceId){
    return client.projects.findAll(workspaceId);
  }

  async registerWebhook(workspaceId){
    return client.projects.findAll(workspaceId);
  }

  async static receiveWebhookPayload(payload){

  }
}