/** @module HandleMessage */

const configs = require('../../configs/credentials/whatsapp.json');
var req = require('request');

class HandleMessage {
  /**
   * Sends a message
   * @param {string} message 
   * @param {string} type 
   * @param {string} destination 
   * @param {string} channel
   * @return boolean
   */
  send(message, type, destination, channel = "whatsapp") {
    var options = {
      'method': 'POST',
      'url': `${configs.url}/msg`,
      'headers': {
        'apikey': configs.apikey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'channel': channel,
        'source': configs.source,
        'destination': destination,
        'message': message,
        'type': type
      }
    };

    req(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

  }
}

module.exports = new HandleMessage();
