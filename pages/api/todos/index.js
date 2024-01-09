import DBConnection from "@/database/config";

const todoLists = [
  {
    id: 1,
    title: "halo satu",
    description: "description halo satu",
    endTime: new Date("2023-01-08").getTime(),
  },
  {
    id: 2,
    title: "halo dua",
    description: "description halo dua",
    endTime: new Date("2023-01-09").getTime(),
  },
  {
    id: 3,
    title: "halo tiga",
    description: "description halo tiga",
    endTime: new Date("2023-01-10").getTime(),
  },
];

const auth = (username, password) => {
  if (username === "admin" && password === "qweqweasd") return true;
  return false;
};

export default async function handler(req, res) {
  const { query } = req;
  const { username, password } = query;
  let data = [];

  if (auth(username, password)) {
    data = todoLists;
    const DB = await DBConnection();
    const [result] = await DB.execute("SELECT * FROM todos", []);
    console.log(result);
    data = result;
  }

  return res.json({
    code: 200,
    status: "OK",
    data: data,
  });
}
