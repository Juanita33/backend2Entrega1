import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { config } from "./env.js";

export const initializePassport = () => {
  // REGISTER
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          if (!first_name || !last_name || !age || !password)
            return done(null, false, { message: "Missing fields" });

          const exists = await UserModel.findOne({ email });
          if (exists) return done(null, false, { message: "User already exists" });

          const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: null,
            role: "user"
          });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // LOGIN
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: "Invalid credentials" });

        if (!isValidPassword(password, user.password))
          return done(null, false, { message: "Invalid credentials" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  
  // JWT (CURRENT)
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is missing. Check your .env and env.js config export.");
  }
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
      },
      async (jwt_payload, done) => {
        try {
          // Aquí devolvemos el user del token
          return done(null, jwt_payload.user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
