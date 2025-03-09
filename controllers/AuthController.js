const pool = require("../config/pool");
const bcrypt = require("bcrypt");

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are requied" });
    }

    try {
        const checkMail = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );
        if (checkMail.rows.length === 0) {
            res.status(401).json({ message: "Email Not Found" });
        }

        const user = checkMail.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid Password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, email: user.email },
        });
    } catch (errr) {
        res.status(500).json({ message: "Bad cred" });
    }
}

module.exports = login;
