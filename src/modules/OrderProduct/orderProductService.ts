import { TOrder } from "./orderProductInterface";
import { Order } from "./orderProductModel";

// const createOrderIntoDB = async (payload: TOrder) => {
//   const createdOrder = await Order.create(payload);
//   const result = await Order.populate(createdOrder, "product.productId");
//   console.log(result.);
//   return result;
// };

const createOrderIntoDB = async (payload: TOrder) => {
  const createdOrder = await Order.create(payload);
  const populatedOrder = await Order.populate(
    createdOrder,
    "product.productId"
  );
  const totalDiscountPrice = populatedOrder.product.reduce(
    (sum, product) =>
      sum + (product.productId as any).discountPrice * product.quantity,
    0
  );
  await Order.updateOne(
    { _id: populatedOrder._id },
    { totalPrice: totalDiscountPrice }
  );
  const updatedOrder = await Order.findById(populatedOrder._id);
  return updatedOrder;
};

const getAllOrder = async () => {
  const result = await Order.find().populate("product.productId");
  console.log(result);
  return result;
};
const singleOrderFormDB = async (email: string) => {
  const result = await Order.find({ email: email }).populate(
    "product.productId"
  );
  return result;
};

export const orderProductService = {
  createOrderIntoDB,
  getAllOrder,
  singleOrderFormDB,
};
