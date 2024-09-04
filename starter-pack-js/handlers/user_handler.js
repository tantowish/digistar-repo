const userUsecase = require('../domain/usecases/user_usecase');

// Handler to find a user by their ID
async function getOneByUserId(req, res) {
  try {
    const userId = req.params.id;
    const user = await userUsecase.getOneByUserId(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to find a user by their email
async function getOneByEmail(req, res) {
  try {
    const email = req.params.email;
    const user = await userUsecase.getOneByEmail(email);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to find all users
async function getList(req, res) {
  try {
    const users = await userUsecase.getList();
    res.json(users);
  } catch (error) {
    console.error('Error finding users:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to register a new user
async function register(req, res) {
  try {
    const user = req.body;
    const savedUser = await userUsecase.register(user);
    res.status(201).json({ message: "User created successfully", userId: savedUser.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to log in a user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userUsecase.login({ email, password });
    res.json({ message: "Success login!", token });
  } catch (error) {
    console.error('Error login: ', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a user by their ID
async function updateOne(req, res) {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userUsecase.updateOne({ user_id: userId, ...updateData });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a user by their ID
async function deleteOne(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await userUsecase.deleteOne(userId);
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { getOneByUserId, getOneByEmail, getList, register, login, updateOne, deleteOne };