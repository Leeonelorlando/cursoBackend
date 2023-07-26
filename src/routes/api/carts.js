import { Router } from "express";
let router = Router();

import { readAll, readOne } from "../controllers/carts.js";
import {
  createCartOnLogin,
  clearCart,
  addProduct,
  delProduct,
  removeProduct,
} from "../controllers/carts.js";

router.get("/all", readAll);
router.get("/one", readOne);
router.post("/createCartOnLogin", createCartOnLogin);
router.put("/clearCart", clearCart);
router.put("/removeProduct", removeProduct);
router.post("/addProduct", addProduct);
router.delete("/delProduct", delProduct);

export default router;