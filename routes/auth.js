const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const authMiddleware = require("../middleware/auth");

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.status(201).json(data);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// Login
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            return res.status(401).json({
                error: "Invalid login credentials"
            });
        }

        return res.status(200).json({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

});

// Logout
router.post("/logout", authMiddleware, async (req, res) => {

    try {

        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.sendStatus(204);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;