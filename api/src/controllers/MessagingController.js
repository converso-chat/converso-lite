/** @module MessagingController */

const HandleMessage = require('../services/chat/HandleMessage');

class MessagingController {
  async create(request, response) {
    const { message, type, destination } = request.body;

    HandleMessage.send(message, type, destination);
    
    return response.status(200).json({ success: true, message: "Message has been sent" });
    
    // var request = require('request');
    // var formatted_products = [];
    // var message_products = `*Confira o nosso cardápio:*\n\n`;

    // var options = {
    //   'method': 'GET',
    //   'url': 'https://loja.converso.store/api/restorant/1/items',
    //   'headers': {
    //   }
    // };

    // request(options, function (error, res) {
    //   if (error) throw new Error(error);

    //   let products = JSON.parse(res.body).data[0];

    //   products.map((data) => {
    //     formatted_products.push({
    //       id: data.id,
    //       name: data.name,
    //       image: data.image,
    //       price: data.price,
    //     });

    //     message_products += `*${data.name}* - R$${data.price}\n`;

    //   });

    //   const send = HandleMessage.send(message_products, type, destination);

    //   if (!send)
    //     return response.status(500).json({ success: false, message: "Internal Error" });

    //   return response.status(200).json({ success: true, message: "Message has been sent" });

    // });

  }
}

module.exports = new MessagingController();
