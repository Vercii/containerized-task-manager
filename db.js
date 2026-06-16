const { Pool } = require("pg");

const pool = new Pool({
    user: "taskuser",
    host: "127.0.0.1",
    database: "taskdb",
    password: "User123!",
    port: 5432,
});

module.exports = pool;