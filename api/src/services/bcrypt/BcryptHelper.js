/** @module BcryptHelper */

const bcrypt = require('bcryptjs');

class BcryptHelper {

  /**
   * Encrypts a password
   * @param {string} password
   * @return string
   */
  generate(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * Comparison of a password and an encrypted password
   * @param {string} password 
   * @param {string} new_password 
   * @return boolean
   */
  compare(password, new_password) {
    let response = true;

    if (!bcrypt.compareSync(password, new_password))
      response = false;

    return response;
    
  }
}

module.exports = new BcryptHelper();
