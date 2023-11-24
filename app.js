const express = require ("express");
const path = require ("path");
const db = require("better-sqlite3")("database.db", {verbose: console.log} )
const bcrypt = require("bcrypt")
const app = express(); 


app.post("/addUser", (req, res) => {
    const insertStatement = db.prepare("INSERT INTO loginTest (name, email, password) VALUES (?, ?, ?)");
    const hash = bcrypt.hashSync(req.body.password, 10)
    insertStatement.run(req.body.name, req.body.email, hash);
    res.send("User addet jippi");
});

app.post("/login", async (req, res) => {
    const userSTMT = db.prepare("SELECT * FROM loginTest WHERE email = ?");
    const user = userSTMT.get(req.body.email);

    // Check if the user exists
    if (!user) {
        res.send("User not found");
        return;
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
        // Password is correct, handle successful login
        res.send("Login successful");
    } else {
        // Password is incorrect
        res.send("Incorrect password");
    }
});


app.use(express.static(path.join(__dirname, "public")));

app.listen(4000, () => {
    console.log("Server is running on port http://localhost:4000");
})



// app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"));
// app.use(session({ 
//     secret: 'your-secret-key', 
//     resave: true, 
//     saveUninitialized: true 
// }));




// app.get("/showusers", (req, res) => {
//     const stat = db.prepare("SELECT * FROM users")
//     const users = stat.all()
//     res.send(users)
// })


// app.post("/login", (req, res) => {
//     const userSTMT = db.prepare("SELECT * FROM users WHERE email = ?")
//     const user = userSTMT.get(req.body.email)

//     // Check if the user exists
//     if (!user) {
//         res.send("User not found");
//         return;
//     }

//     const compare = bcrypt.compareSync(req.body.password, user.password)
//     console.log(compare)

//     if(compare){
//         req.session.user = user
//         res.send("Login worked")
//     } else {
//         res.send("Incorrect password");
//     }
// });

// const insertStatement = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

// insertStatement.run("john doe", "hesmpe@gmail.com", "paddwkdmn")
// insertStatement.run("Janne doe", "skwkwkj3j@gmail.com", "Hehuehh")

// app.post("/addUser", (req, res) => {
//     const insertStatement = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
//     const hash = bcrypt.hashSync(req.body.password, 10)
//     insertStatement.run(req.body.name, req.body.email, hash);
//     res.send("User addet jippi");
// });




