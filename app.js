const bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express();

// App Config
mongoose.connect("mongodb://localhost/rest_blog", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose/Model fonfig
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "This is a New Post",
// 	image:
// 		"https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
// 	body: "Hello World!",
// });

// Routes

// INDEX Route
app.get("/", (req, res) => {
	res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { blogs: blogs });
		}
	});
});

// NEW Route
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

// CREATE Route
app.post("/blogs", (req, res) => {
	// Create Blog
	Blog.create(req.body.blog, (err, newBlog) => {
		if (err) {
			res.render("new");
		} else {
			// Redirect to Index
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, () => {
	console.log("Server is Running");
});
