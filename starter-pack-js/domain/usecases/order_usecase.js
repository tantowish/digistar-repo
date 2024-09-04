// npm install mongoose uuid

const orderRepository = require('../repositories/order_repository');
const { v4: uuidv4 } = require('uuid');

// Function to create a new order
const create = async (orderData) => {
    try {
        const orderId = uuidv4();
        const order = {
            order_id: orderId,
            ...orderData
        };
        const createdOrder = await orderRepository.create(order);
        return createdOrder;
    } catch (error) {
        throw new Error('Failed to create order');
    }
};

// Function to get list of orders
const getList = async () => {
    try {
        const orders = await orderRepository.findAll();
        return orders;
    } catch (error) {
        throw new Error('Failed to get list of orders');
    }
}

// Function to get an order by order id
const getOneByOrderId = async (orderId) => {
    try {
        const order = await orderRepository.getOneByOrderId(orderId);
        return order;
    } catch (error) {
        throw new Error('Failed to get order by order_id');
    }
}

// Function to update an order by order id
const updateOneByOrderId = async (orderId, updateData) => {
    try {
        const updatedOrder = await orderRepository.updateOneByOrderId(orderId, updateData);
        return updatedOrder;
    } catch (error) {
        throw new Error('Failed to update order');
    }
};

// Function to delete an order by order id
const deleteOneByOrderId = async (orderId) => {
    try {
        const deletedOrder = await orderRepository.deleteOneByOrderId(orderId);
        return deletedOrder;
    } catch (error) {
        throw new Error('Failed to delete order');
    }
};

module.exports = { create, getList, getOneByOrderId, updateOneByOrderId, deleteOneByOrderId };