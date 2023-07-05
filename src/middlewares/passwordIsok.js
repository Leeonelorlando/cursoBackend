import bcryptjs from 'bcryptjs'

export default (req,res,next)=> {
    try {
        let db_password = req.user.password
        let form_password = req.body.password
        let compare = bcryptjs.compareSync(form_password,db_password)
        console.log(compare)
        console.log({db_password,form_password})
        if (compare) {
            return next()
        } else {
            return res.status(401).json({
                succes:false,message:"Invalid credentials!"
            })
        }
    } catch (error) {
        next(error)
    }
}