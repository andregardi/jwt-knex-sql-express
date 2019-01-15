exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", function(table) {
    //Create the ID column
    table.increments();

    //Unique username column
    table.string("username").notNullable();
    table.unique("username");

    //Password, Fullname and Role
    table.string("password").notNullable();
    table.string("fullname").notNullable();
    table.string("role").notNullable();
  });

  //Create the Admin user
  const adminUser = {
    username: "admin",
    password: "$2a$08$wDKoLp9SC4Ytuh4M4nedrulW9Qiyo7mBoD9J1p1xzjwBVg/PtNK2K", //crypted for "admin"
    fullname: "Adminnistrator",
    role: "ADMIN"
  };
  await knex("users").insert(adminUser);

  //Create the Regular user
  const regularUser = {
    username: "regular",
    password: "$2a$08$mLvAKduDCnXrGI47SWPqQ.kjsR3nqKheDYYeASCp5oco9jDm2Y.Ia", //crypted for "regular"
    fullname: "Regular User",
    role: "REGULAR"
  };
  await knex("users").insert(regularUser);
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("users");
};
