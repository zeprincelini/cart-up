
exports.up = function(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments();
    table.string('product_name').notNullable();
    table.decimal('product_price', [8], [2]).notNullable();
    table.string('product_path').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
