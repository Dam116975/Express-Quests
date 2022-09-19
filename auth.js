const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};


const hashPassword = (req, res, next) => {
  argon2
//    récupérer le mot de passe à hacher à partir de req.body.password.
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
// stocker le mot de passe haché dans req.body.hashedPassword.
      req.body.hashedPassword = hashedPassword;
    //   mot de passe en clair ne pourra plus être utilisé après ton middleware, supprime-le.
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};

