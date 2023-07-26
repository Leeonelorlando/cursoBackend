import { Router } from "express";
import carts_router from "../../controllers/carts.js"
import cookies_router from "../../controllers/cookies.js"
import sessions_router from "../../controllers/sessions.js"
import auth_router from "../../controllers/auth.js"
import products_router from "../../controllers/products.js"

const router = Router()

router.use('/auth',auth_router)
router.use('/products',products_router)
router.use('/carts',carts_router)
router.use('/cookies',cookies_router)
router.use('/sessions',sessions_router)

export default router