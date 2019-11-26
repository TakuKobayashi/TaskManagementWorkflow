export interface AsanaWebhookPayload {
  events: AsanaEvent[];
}

interface AsanaEvent {
  user: AsanaResource;
  created_at: string;
  action: string;
  resource: AsanaResource;
  parent: AsanaResource;
}

interface AsanaResource {
  gid: string;
  resource_type: string;
  resource_subtype: string | undefined;
}
