import { compareSync } from 'bcrypt'
import User from "../dao/User.js"

export default async function isValidPassword(req, res, next) {
	let verified = compareSync(
		req.body.password,
		req.user.password
	)
	if (verified) {
		return next()
	}
	return res.status(401).json({
		success: false,
		message: 'error de autenticación!'
	})
}