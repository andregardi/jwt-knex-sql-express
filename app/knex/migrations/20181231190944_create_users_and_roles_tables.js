exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("username").notNullable();
    table.unique("username");
    table.string("password").notNullable();
    table.string("fullname").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
  await knex.schema.createTable("roles", function(table) {
    table.increments();
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users");
    table.string("role").notNullable();
    table.unique(["role", "userId"]);
  });
  const adminUser = {
    username: "admin",
    password: "admin",
    fullname: "Adminnistrator"
  };
  await knex("users").insert(adminUser);
  const userId = (await knex("users")
    .where(adminUser)
    .first()).id;
  console.log(userId);
  await knex("roles").insert({ userId, role: "ADMIN" });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("roles");
  await knex.schema.dropTable("users");
};
