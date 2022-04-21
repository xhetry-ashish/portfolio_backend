import { expressjwt } from "express-jwt";

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      `${api}/user/login`,
      `${api}/user/register`,
      { url: /\/api\/v1\/user(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
}

export default authJwt;
