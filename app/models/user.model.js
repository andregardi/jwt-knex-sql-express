let users = [
  {
    id: 1,
    username: "admin",
    password: "$2a$08$wDKoLp9SC4Ytuh4M4nedrulW9Qiyo7mBoD9J1p1xzjwBVg/PtNK2K",
    fullname: "Administrator",
    roles: ["ADMIN", "REGULAR"]
  },
  {
    id: 2,
    username: "regular",
    password: "$2a$08$mLvAKduDCnXrGI47SWPqQ.kjsR3nqKheDYYeASCp5oco9jDm2Y.Ia",
    fullname: "Regular User",
    roles: ["REGULAR"]
  }
];

let nextId = 3;

const getAll = () => {
  return { ...users };
};

const getByUsername = username => {
  user = users.find(user => user.username == username);
  return user;
};

const getUserById = id => {
  const user = users.find(user => user.id == id);
  return user;
};

const checkRoleById = (role, id) => {
  const user = getUserById(id);
  if (user && user.roles.indexOf(role) > -1) return true;
  return false;
};

const create = user => {
  user.id = nextId++;
  users.push(user);
  return user;
};

const remove = id => {
  const index = users.findIndex(user => user.id == id);
  if (index > -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

const edit = (id, newValues) => {
  const index = users.findIndex(user => user.id == id);
  if (index == -1) return false;
  users[index] = {...users[index], ...newValues}
  return true;
}

module.exports = {
  getAll,
  getByUsername,
  getUserById,
  checkRoleById,
  create,
  remove,
  edit
};
