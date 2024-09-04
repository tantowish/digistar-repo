const roleUsecase = require('../domain/usecases/role_usecase');

// Handler to create a new role
async function create(req, res) {
  try {
    const { name, position, stacks } = req.body;
    if (!name || !position || !stacks) {
      return res.status(400).json({ message: "Name, Position, and Stacks are required" });
    }
    const role = { name, position, stacks };
    const newRole = await roleUsecase.create(role);
    res.status(201).json({ message: "Role created successfully", roleId: newRole.role_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get all roles
async function getList(req, res) {
  try {
    const roles = await roleUsecase.getList();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a role by id
async function updateOneById(req, res) {
  try {
    const roleId = req.params.id;
    const updateData = req.body;

    // Check if at least one field is provided for update
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Attempt to update the role
    const updatedRole = await roleUsecase.updateOne(roleId, updateData);

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role updated successfully", role: updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete role by id
async function deleteOneById(req, res) {
  try {
    const roleId = req.params.id;
    const role = await roleUsecase.deleteOneById(roleId);
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, updateOneById, deleteOneById };