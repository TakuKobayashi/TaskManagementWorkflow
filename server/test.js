var asana = require('asana');

// replace with your personal access token. 
var personalAccessToken = '0/4e7420f9149346659e4309a52a27cbf4';


// Construct an Asana client
var client = asana.Client.create().useAccessToken(personalAccessToken);


// Get your user info
client.users.me()
  .then(function(me) {
    // Print out your information
    console.log('Hello world! ' + 'My name is ' + me.name + ' and my primary Asana workspace is ' + me.workspaces[0].id + '.');
    console.log(client.webhooks.create(me.workspaces[0].id,request().get('host') + "/events/incoming/"+me.workspaces[0].id));

  }
  
)

;