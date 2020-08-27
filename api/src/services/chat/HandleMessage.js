/** @module HandleMessage */

const model = require('../../configs/database/connection');
const configs = require('../../configs/credentials/whatsapp.json');
const moment = require('moment');

const HandleChat = require('./HandleChat');
var req = require('request');

class HandleMessage {
  /**
   * Add a message
   * @param {string} contact_id 
   * @param {string} text 
   * @param {string} type 
   * @param {string} url 
   * @param {string} from 
   * @param {boolean} has_seen 
   */
  async add(contact_id, text, type, url = '', from, has_seen = false) {
    let chat = await HandleChat.get(contact_id);

    const timestamp = moment().utc().format();
    chat.messages.push({ text, type, url, from, has_seen, timestamp });

    await model.collection('chat').doc(chat.id).set(chat);
  }

  /**
   * Sends a message
   * @param {string} message 
   * @param {string} type 
   * @param {string} destination 
   * @param {string} channel
   * @return boolean
   */
  async send(message, type, destination, channel = "whatsapp") {
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

    await HandleChat.add(destination);

    await this.add('5513996096926', message, type, '', 'me');

  }
}

module.exports = new HandleMessage();
