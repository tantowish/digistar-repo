// npm install mongoose uuid

const Role = require('../models/role_model');

// Function to save a new role
async function create(role) {
  try {

    // Create a new user
    const newRole = new Role(role);

    // Save the user to the database
    const savedRole = await newRole.save();
    return savedRole;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

// Function to get a role by role id
async function getOneByRoleId(roleId) {
    try {
        const role = await Role.findOne({ role_id: roleId });
        return role;
    } catch (error) {
        console.error('Error getting role by role_id:', error);
        throw error;
    }
}

// Function to get a role by role name
async function getOneByName(name) {
  try {
      const role = await Role.findOne({ name: name });
      return role;
  } catch (error) {
      console.error('Error getting role by role_id:', error);
      throw error;
  }
}

// Function to find all roles
async function findAll() {
  try {
    const roles = await Role.find();
    return roles;
  } catch (error) {
    console.error('Error finding roles:', error);
    throw error;
  }
}

// Function to update a role by id
async function updateRole(id, updateData) {
  try {
    // Find the role by ID
    const existingRole = await Role.findOne({ role_id: id });
    if (!existingRole) {
      throw new Error('Role not found');
    }

    // Allowed fields for update
    const allowedFields = ['name', 'position', 'stacks'];

    // Check for unexpected fields
    const updateFields = Object.keys(updateData);
    const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Update the role's data
    Object.assign(existingRole, updateData);

    // Save the updated role to the database
    const updatedRole = await existingRole.save();
    return updatedRole;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
}

// Function to delete a role by 
async function deleteOneById(id) {
  try {
    // Find the role by name and delete it
    const deletedRole = await Role.findOneAndDelete({ id: id });

    // Check if the role was found and deleted
    if (!deletedRole) {
      throw new Error('Role not found');
    }

    return deletedRole;
  } catch (error) {
    console.error('Error deleting role by name:', error);
    throw error;
  }
}

module.exports = { create, getOneByRoleId, getOneByName, findAll, deleteOneById, updateRole };
