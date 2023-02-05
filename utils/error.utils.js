module.exports.errorSignup = (err) => {
  let errors = { pseudo: "", password: "", email: "" };
  if (err.message.includes("pseudo")) errors.pseudo = "pseudo est deja pris";
  if (err.message.includes("password"))
    errors.password =
      "le password est plus court il doit superieur ou egal a 6 caractere";
  if (err.message.includes("email")) errors.email = "email est  incorrect ou est deja pris";

  if (err.code === 1100 && Object.keys(err.keyvalue)[0].includes("pseudo"))
    errors.pseudo = "pseudo est deja pris";

  if (err.code === 1100 && Object.keys(err.keyvalue)[0].includes("email"))
    errors.email = "l'email est deja utilisee";
  return errors;
};

module.exports.errorSign = (err) => {
  let errors = { pseudo: "", password: "" };
  if (err.message.includes("pseudo")) errors.pseudo = "votre pseudo est incorrecte";
  if (err.message.includes("password"))
    errors.password = "votre mot de passe est incorrecte";
  return errors;
};
