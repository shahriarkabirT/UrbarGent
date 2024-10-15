import express from "express";
import protectMiddlewere from "../middleware/protectMiddleware.js";
import {
  getProducts,
  getProductBySlug,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getTrendingProducts,
  getProductById,
  updateProductQuantity
} from "../controllers/productController.js";

const productRouter = express.Router();

// Define routes
productRouter
  .route("/")
  .get(getProducts)
  .post(protectMiddlewere("admin"), createNewProduct);

productRouter.route("/:slug").get(getProductBySlug);
productRouter.route("/id/:id").get(getProductById);

productRouter
  .route("/:id")
  .delete(protectMiddlewere("admin"), deleteProduct)
  .patch(protectMiddlewere("admin"), updateProduct);
productRouter.route("/top/trending").get(getTrendingProducts);

productRouter
  .route("/quantity/:id")
  .patch(protectMiddlewere(),updateProductQuantity);

export default productRouter;
