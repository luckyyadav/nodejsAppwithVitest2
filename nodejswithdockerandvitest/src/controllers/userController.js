// import DB schema
const userDB = [];

export const createUser = (req, res) => {
  const { name, email, phone } = req.body;

  // validation check
  if (!name || !email || !phone) {
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    return res.status(400).json({
      message: `Unable to add user. Missing fields: ${missingFields.join(
        ", "
      )}`,
    });
  }
  // create user object
  let user = {
    name,
    email,
    id: Math.floor(Math.random() * 100),
    phone,
  };

  // push user object to the userDB array
  userDB.push(user);

  // Return response
  res.json({
    status: 201,
    message: "user is created",
    data: user,
  });
};

export const getAllUsers = (req, res) => {
  // return all the users present in the db
  return res.json({
    status: 200,
    message: "Users fetched",
    data: userDB,
  });
};

export const getUserById = (req, res) => {
  // get id of the user from parameter
  const userId = req.params.id;
  const user = userDB.find((item) => item.id == parseInt(userId));
  // validation check if user is not found
  if (!user) {
    return res.json({
      status: 400,
      message: "User does not exists",
    });
  }
  // return the response
  return res.json({
    status: 200,
    message: "Found user",
    data: user,
  });
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  // set the updated value of the founs user
  const user = userDB.find((item) => {
    if (item.id === parseInt(userId)) {
      item.name = name;
      item.email = email;
      item.phone = phone;
    }
    return item;
  });
  if (!user) {
    return res.json({
      status: 400,
      message: "user does not exists",
    });
  }
  // return the response
  return res.json({
    status: 200,
    message: "User is updated",
    data: user,
  });
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  // find index of the user from the db
  const userIndex = userDB.findIndex((item) => item.id == parseInt(userId));

  if (userIndex == -1) {
    return res.json({
      status: 400,
      message: "user does not exists",
    });
  }

  // return the response
  userDB.splice(userIndex, 1);
  return res.json({
    status: 200,
    message: "user is deleted of id" + userId,
  });
};
