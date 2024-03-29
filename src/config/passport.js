
import passport from "passport"
import { Strategy } from 'passport-local'
import GHStrategy from 'passport-github2'
import User from "../dao/User.js"
const callback = 'http://localhost:8080/api/auth/github/callback'
const { GH_CLIENT_ID,GH_CLIENT_SECRET } = process.env

export default function inicializePassport() {
    passport.use(
        'github',
        new GHStrategy(
            { clientID:GH_CLIENT_ID,clientSecret:GH_CLIENT_SECRET,callbackURL:callback },
            async (accessToken,refreshToken,profile,done) => {
                try {
                    //console.log(profile)
                    let one = await User.findOne({ email:profile._json.login })
                    if (!one) {
                        let user = await User.create({
                            name:profile._json.name,
                            email:profile._json.login,
                            age:18,
                            photo:profile._json.avatar_url,
                            password:profile._json.id
                        })
                        return done(null,user)
                    }
                    return done(null,one)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
	passport.use(
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'email' },
            async (req,userName,password,done) => {
                try {
                    let one = await User.findOne({ email:userName })
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null,user)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (userName,password,done) => {
                try {
                    let one = await User.findOne({ email:userName })
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.serializeUser((user,done) => done(null,user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        //console.log(id)
        return done(null,user)
    })
}