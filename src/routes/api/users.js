import { Router } from "express";
let router = Router();

// Controllers
import { readAll, readOne } from "../../controllers/users/read.js";
import {
  register,
  sendVerificationEmail,
  verifyEmail,
} from "../../controllers/users/register.js";
import login from "../../controllers/users/login.js";
import logout from "../../controllers/users/logout.js";

// Middlewares
import validator from "../../middlewares/validatorRegister.js";
import validator from "../../middlewares/validatorSignin.js";

// Schemas
import { loginSchema, registerSchema } from "../../controllers/auth.js";

router.get("/all", readAll);
router.get("/one", readOne);

router.post("/register", validator(registerSchema), register);
router.post("/send-verification-email/:email", sendVerificationEmail);
router.get("/verify-mail", verifyEmail);

router.post("/login", validator(loginSchema), login);

router.post("/logout", logout);

export default router;