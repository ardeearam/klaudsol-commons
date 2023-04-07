"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _TokenExpiredError = _interopRequireDefault(require("../errors/TokenExpiredError"));
var _JsonWebTokenError = _interopRequireDefault(require("../errors/JsonWebTokenError"));
var _process$env$KS_SECRE;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Let's reuse SECRET_COOKIE_PASSWORD instead of creating another one
var SECRET = (_process$env$KS_SECRE = process.env.KS_SECRET_COOKIE_PASSWORD) !== null && _process$env$KS_SECRE !== void 0 ? _process$env$KS_SECRE : process.env.SECRET_COOKIE_PASSWORD;
var generateToken = function generateToken(tokenValues) {
  var token = _jsonwebtoken["default"].sign(tokenValues, SECRET, {
    expiresIn: 14400
  });
  return token;
};
exports.generateToken = generateToken;
var verifyToken = function verifyToken(token) {
  var error = function error(err, decoded) {
    if (!err) return;
    if (err.name === "JsonWebTokenError") throw new _JsonWebTokenError["default"]();
    if (err.name === "TokenExpiredError") throw new _TokenExpiredError["default"]();
    throw err;
  };
  var decodedToken = _jsonwebtoken["default"].verify(token, SECRET, error);
  return decodedToken;
};
exports.verifyToken = verifyToken;