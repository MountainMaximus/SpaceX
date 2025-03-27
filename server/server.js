import jsonServer from "json-server";
import bodyParser from "body-parser";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

// Регистрация пользователя
server.post("/register", (req, res) => {
  const db = router.db;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const users = db.get("users").value();
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { id: users.length + 1, username, password };
  db.get("users").push(newUser).write();

  res.status(201).json({ message: "User registered", user: newUser });
});

// Авторизация пользователя
server.post("/login", (req, res) => {
  const db = router.db;
  const { username, password } = req.body;

  const user = db.get("users").find({ username, password }).value();
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
