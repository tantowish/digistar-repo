const orderUsecase = require('../domain/usecases/order_usecase');

// Handler to create a new order
async function create(req, res) {
  try {
    console.log(req);
    const orderData = req.body;
    orderData["created_by"] = req.user.userId;
    const createdOrder = await orderUsecase.create(orderData);
    res.status(201).json({ message: "Order created successfully", orderId: createdOrder.order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get list of orders
async function getList(req, res) {
  try {
    const orders = await orderUsecase.getList();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get an order by order id
async function getOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderUsecase.getOneByOrderId(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update an order by order id
async function updateOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    
    // Attempt to update the order
    const updatedOrder = await orderUsecase.updateOneByOrderId(orderId, updateData);
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete an order by order id
async function deleteOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    
    // Attempt to delete the order
    const deletedOrder = await orderUsecase.deleteOneByOrderId(orderId);
    
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByOrderId, updateOneByOrderId, deleteOneByOrderId };