/** @module ChatVerifications */

const model = require('../../configs/database/connection');
const locale = require('../user/locale.json');

class ChatVerifications {
  /**
   * Checks if a chat already exists
   * @param {string} contact_id
   * @return json 
   */
  async exists(contact_id) {
    let response = true;

    let chat = await model.collection('chat').where('contact_id', '==', contact_id).where('user_id', '==', locale.user_id).get();

    if (chat.empty)
      response = false;

    return { response, data: chat };

  }
}

module.exports = new ChatVerifications();
