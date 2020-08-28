/** @module HandleChat */

const model = require('../../configs/database/connection');
const locale = require('../user/locale.json');

const ModelHelper = require('../helpers/ModelHelpers');
const ChatVerifications = require('./ChatVerifications');

class HandleChat {

  /**
   * Get the contact chat
   * @param {string} contact_id 
   * @return {JSON}
   */
  async get(contact_id) {
    let chat = await model.collection('chat').where('contact_id', '==', contact_id).where('user_id', '==', locale.user_id).get();

    if (!chat.empty) {
      chat = ModelHelper.each_data(chat);
    }
    
    return chat;
  }

  /**
   * Add a contact chat
   * @param {string} contact_id 
   * @return {JSON}
   */
  async add(contact_id) {
    let chat = await ChatVerifications.exists(contact_id);

    if (chat.response)
      return { success: false, message: "Chat with this contact already exists" };

    const add = await model.collection('chat').add({
      user_id: locale.user_id,
      contact_id,
      bot_is_active: true,
      messages: []
    });

    if (!add.id)
      return { success: false, message: "Internal Error" };

    return { success: true, id: add.id };
  }
}

module.exports = new HandleChat();
