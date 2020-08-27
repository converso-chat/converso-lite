/** @module ModelHelpers */

class ModelHelper {
  /**
   * Each data and returns from firebase
   * @param {JSON} data 
   * @return {JSON}
   */
  each_data(data) {
    data.forEach(doc => {
      data = doc.data();
      data.id = doc.id;
    });
    return data;
  }
}

module.exports = new ModelHelper();
