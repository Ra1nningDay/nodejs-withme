import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    user: "test",
    host: "localhost",
    database: "test",
    password: "Kitchenrice2547p",
    port: 5432,
});

client
    .connect()
    .then(() => console.log("Connect Success!"))
    .catch((e) => console.log("Connection Failed", e))
    .finally(() => client.end());
