import passport from "passport"
import { Strategy } from "passport-local"
import GHStrategy from "passport-github2"
import jwt from "passport-jwt"
import User from "../models/User.js"

const { GH_CLIENT_ID,GH_CLIENT_SECRET } = process.env
const callback = "http://localhost:8080/api/auth/github/callback"

export default function() {
    passport.serializeUser(
        (user,done)=> done(null,user._id)
    )
    passport.deserializeUser(
        async(id,done)=> {
            const user = await User.findById(id)
            return done(null,user)
        }
    )
    passport.use(         //estrategia de registro
        'register',       //nombre de la estrategia
        new Strategy(     //defino nueva estrategia local que recibe dos parámetros
            { passReqToCallback:true,usernameField:'email' },
            //la primer propiedad es para tener acceso al objeto de requerimientos de la petición
            //la segunda propiedad es para cambiar la propeidad "principal", que en nuestro caso es email
            async(req,username,password,done)=> {
                try {
                    //let one = await User.findOne({ email:req.body.email })
                    let one = await User.findOne({ email:username })
                    if (one) {
                        return done(null,false)
                    } else {
                        let user = await User.create(req.body)
                        delete user.password        //para el registro no es necesario continuar/inyectar la contraseña a la propeidad user del objeto de requerimientos
                        return done(null,user)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )  
    passport.use(       //estrategia de inicio de sesion
        'login',
        new Strategy(
            { usernameField:'email' },
            async(username,password,done)=> {
                try {
                    //console.log(username,password);
                    let one = await User.findOne({ email:username })
                    console.log(one);
                    if(one) {
                        //no hay que eliminar la contraseña!
                        return done(null,one)
                    } else {
                        return done(null,false)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(   //estrategia de registro con github
        'github',           //nombre de la estrategia
        new GHStrategy(     //estrategia a desarrollar
            { clientID:GH_CLIENT_ID,clientSecret:GH_CLIENT_SECRET,callbackURL:callback },   //objeto de configuración
            async(accessToken,refreshToken,profile,done)=> {                                //cb que depende de la respuesta de github, la propeidad mas importante es profile con todos los datos de usuario de la base de datos de github
                try {
                    console.log(profile)
                    let one = await User.findOne({ email:profile._json.login })             //los datos del usuario vienen de github (la propiedad profile: NO DEL FORMULARIO!)
                    if (one) {                                                              //si encuentro un usuario
                        return done(null,one)                                               //inyecto la propiedad req.user con los datos de one para poder directamente LOGUEARLO
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: 'hola1234',
                        photo: profile._json.avatar_url
                    })
                    return done(null,user)                                                  //inyecto el usuario recien creado en la propiedad req.user
                } catch (error) {
                    return done(error)
                }   
            }
        )
    )
    passport.use(     //estrategia para jwt (SOLO SIRVE PARA AUTENTICAR USUARIOS)
        'jwt',
        new jwt.Strategy(
            { secretOrKey:process.env.SECRET_JWT,jwtFromRequest:jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token']])},
            async(jwt_payload,done)=> {
                //jwt_payload es el resultado del desencriptamiento del token
                //done SIEMPRE es el ultimo parámetro de la cb (SIEMPRE)
                try {
                    let one = await User.findOne({ email:jwt_payload.email })
                    if(one) {
                        delete one.password
                        return done(null,one)
                    } else {
                        return done(null,false)
                    }
                } catch (error) {
                    return done(error,false)
                }
            }
        )
    )
}