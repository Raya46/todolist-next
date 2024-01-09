import DBConnection from "@/database/config";

const auth = (username, password) => {
  if (username === "admin" && password === "qweqweasd") return true;
  return false;
};

async function POSTHandler(req, res) {
  const { body } = req;
  const query = "INSERT INTO todos VALUES(null, ?,?,?)";
  const DB = await DBConnection();
  const [result, fields] = await DB.execute(query, [
    body.title,
    body.description,
    body.endTime,
  ]);

  console.log(result, fields);

  return res.status(200).json({
    status: "OK",
    data: result,
  });
}

async function GETHandler(req, res) {
  let data = [];
  const DB = await DBConnection();
  const [result] = await DB.execute("SELECT * FROM todos", []);
  console.log(result);
  data = result;
  DB.end();

  return res.status(200).json({
    status: "OK",
    data: data,
  });
}

export default async function handler(req, res) {
  const { query, method } = req;
  const { username, password } = query;

  if (auth(username, password)) {
    if (method === "GET") return GETHandler(req, res);
    if (method === "POST") return POSTHandler(req, res);
  }

  return res.status(400).json();
}
