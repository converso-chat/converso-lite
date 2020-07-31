/** @module UserVerifications */

const model = require('../../configs/database/connection');

class UserVerifications {
  /**
   * Checks if user exists
   * @param {string} email
   * @return json 
   */
  async exists(email) {
    let response = true;

    let user = await model.collection('users').where('email', '==', email).get();

    if (user.empty)
      response = false;
    
    return { response, data: user };

  }
}

module.exports = new UserVerifications();
