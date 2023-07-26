import { Router } from "express";
let router = Router();

import { readAll, readOne } from "../controllers/products.js";
import {
  paginateProducts,
  searchByName,
  searchByCategory,
  searchByBrand,
} from "../controllers/products.js";
import {deleteProducts} from '../controllers/products.js'
import create from '../controllers/products.js'

router.get("/all", readAll);
router.get("/one", readOne);
router.post("/create", create)
router.delete("/delete", deleteProducts)

router.get("/paginate", paginateProducts);
router.get("/searchByName", searchByName);
router.get("/searchByCategory", searchByCategory);
router.get("/searchByBrand", searchByBrand);

export default router;