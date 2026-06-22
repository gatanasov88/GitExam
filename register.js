function login(username, password) {
  // TODO: implement real authentication
  return username === "admin" && password === "admin";
}

module.exports = { login };
