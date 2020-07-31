/** @module MomentHelper */

const moment = require('moment');

class MomentHelper {
  /**
   * Generates a date
   * @param {number} how_much How much days / months / years
   * @param {string} type days / months / years
   * @param {boolean} future Defines if its future or past
   */
  generate_date(how_much, type, future = true) {
    let response = '';

    if (!how_much || !type) {
      response = moment();
    } else {
      if (future) {
        response = moment().add(how_much, type);
      } else {
        response = moment().subtract(how_much, type);
      }
    }

    return response;

  }
}

module.exports = new MomentHelper();
