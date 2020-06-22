/** @module UserController */

const bcrypt = require('bcryptjs');
const moment = require('moment');

const model = require('../configs/database/database');

class UserController {
  async register(request, response) {
    let { name, email, password, phone, segmentation } = request.body;

    if (!name || !email || !password || !phone || !segmentation)
      return response.json({ success: false, message: "Empty data" });

    const exists = (await model.collection('users').where('email', '==', email).get()).size;
    if (exists)
      return response.json({ success: false, message: "User already exists" });

    password = bcrypt.hashSync(password, 10);
    const expiration_date = moment().add(1, 'month');

    const add = await model.collection('users').add({
      name,
      email,
      password,
      phone,
      subscription_plan_id: 'uf9ZxaNBMSkL6DQWaICo',
      is_active: true,
      expiration_date,
      segmentation
    });

    if (!add.id)
      return response.json({ success: false, message: "Internal Error" });

    return response.json({ success: true, id: add.id });

  }
}

module.exports = new UserController();
