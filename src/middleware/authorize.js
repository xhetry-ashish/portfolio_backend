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
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/user(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/contact(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/contact(.*)/, methods: ["POST", "OPTIONS"] },
      { url: /\/api\/v1\/github(.*)/, methods: ["GET", "PATCH", "OPTIONS"] },
    ],
  });
}

export default authJwt;
