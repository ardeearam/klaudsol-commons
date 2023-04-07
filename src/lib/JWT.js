import jwt from "jsonwebtoken";
import TokenExpiredError from "../errors/TokenExpiredError";
import JsonWebTokenError from "../errors/JsonWebTokenError";

// Let's reuse SECRET_COOKIE_PASSWORD instead of creating another one
const SECRET = process.env.KS_SECRET_COOKIE_PASSWORD ?? process.env.SECRET_COOKIE_PASSWORD;

export const generateToken = (tokenValues) => {
    const token = jwt.sign(
        tokenValues,
        SECRET,
        { expiresIn: 14400 }
    );

    return token;
};

export const verifyToken = (token) => {
    const error = (err, decoded) => {
        if (!err) return;

        if (err.name === "JsonWebTokenError") throw new JsonWebTokenError();
        if (err.name === "TokenExpiredError") throw new TokenExpiredError();

        throw err;
    };

    const decodedToken = jwt.verify(
        token,
        SECRET,
        error
    );

    return decodedToken;
};
