
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert([
        {product_name: 'gucci', product_price: '5000', product_path: 'http://res.cloudinary.com/donlini/image/upload/v1616599138/test-two-asset/frnp4lyrjkh7iswtol9d.jpg'},
        {product_name: 'bag', product_price: '7500', product_path: 'http://res.cloudinary.com/donlini/image/upload/v1616604868/test-two-asset/ed32wupi91bg5zqi1lr8.jpg'},
        {product_name: 'bag-red', product_price: '7500', product_path: 'http://res.cloudinary.com/donlini/image/upload/v1616603701/test-two-asset/r2uiuyjmtyn1tdrqg6kt.jpg'}
      ]);
    });
};
