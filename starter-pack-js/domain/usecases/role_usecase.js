// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

// Function to update a role by id
const updateOne = async (roleId, updateData) => {
    try {
        const updatedRole = await repositories.updateRole(roleId, updateData);
        return updatedRole;
    } catch (error) {
        throw new Error('Failed to update role');
    }
}

// Function to delete a role by id
const deleteOne = async (roleId) => {
    try {
        const role = await repositories.deleteOneById(roleId);
        return role;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

module.exports = { create, getList, deleteOne, updateOne };