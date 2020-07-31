/** @module UserController */

const jwt = require('jsonwebtoken');
const { secret } = require('../configs/credentials/auth.json');

const model = require('../configs/database/connection');

const BcryptHelper = require('../services/bcrypt/BcryptHelper');
const MomentHelper = require('../services/moment/MomentHelper');
const UserVerifications = require('../services/user/UserVerifications');

class UserController {
  /**
   * Show user profile
   * @param {*} request 
   * @param {*} response 
   * @return {JSON}
   */
  async show(request, response) {
    const user = (await model.collection("users").doc(request.user_id).get()).data();
    user.password = undefined;
    return response.json(user);
  }

  /**
   * Register an user
   * @param {*} request 
   * @param {*} response 
   * @return {JSON}
   */
  async register(request, response) {
    let { name, email, password, phone, segmentation } = request.body;

    if (!name || !email || !password || !phone || !segmentation)
      return response.json({ success: false, message: "Empty data" });

    const exists = (await model.collection('users').where('email', '==', email).get()).size;
    if (exists)
      return response.json({ success: false, message: "User already exists" });

    password = BcryptHelper.generate(password);
    const expiration_date = MomentHelper.generate_date(1, 'month');

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

  /**
   * User authentication with JWT
   * @param {*} request 
   * @param {*} response 
   * @return {JSON}
   */
  async signin(request, response) {
    let { email, password } = request.body;

    if (!email || !password)
      return response.json({ success: false, message: "Empty data" });

    let user = await UserVerifications.exists(email);

    if (!user.response)
      return response.json({ success: false, message: "User does not exists" });

    user = user.data;
    
    user.forEach(doc => {
      user = doc.data();
      user.id = doc.id;
    });

    if (!BcryptHelper.compare(password, user.password))
      return response.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 * 7
    });

    user.password = undefined;

    return response.json({ success: true, user, token });
  }
}

module.exports = new UserController();
