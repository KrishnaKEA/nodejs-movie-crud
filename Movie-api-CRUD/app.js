// importing required module and initializing.....

const express = require("express");
const app = express();

// telling express to parse json data.
app.use(express.json());

// movies list
const moviesLists = [
	{ id: 1, name: "Matrix", gerne: "Action" },
	{ id: 2, name: "Titanic", gerne: "Romantic" },
];

//Displaying all movies- using GET method.
app.get("/movies", (req, res) => {
	res.json(moviesLists);
});

// Displaying single movie with id -GET method.
app.get("movies/:id",(req,res)=>{
    const id = req.params.id,
    if(id<= moviesLists.length-1){
        res.json(moviesLists[id])
    }else{
        res.json({ message : `The desired movie with id: ${id} is not found.Try again later.`})
    }
})

// Adding new movie- using POST method



app.post("/movies", (req, res) => {
	const newMovie = {
		id: moviesLists.length + 1,
		name: req.body.name,
		gerne: req.body.gerne,
	};
	moviesLists.push(newMovie);
	res.json(newMovie);
});

//updating existing movie using id - PUT method
app.put("/movies/:id", (req, res) => {
	const id = req.params.id - 1;
	if (id <= moviesLists.length - 1) {
		moviesLists[id].name = req.body.name;
		moviesLists[id].gerne = req.body.gerne;
		res.json(moviesLists[id]);
	} else {
		res.json({
			message: `The movie does not exist in our list please check the ${req.params.id} and try again.`,
		});
	}
});

// Deleting movie with id - DELETE method.
app.delete("/:id", (req, res) => {
	const id = req.params.id;
    if(id<= moviesLists.length-1){
        moviesLists.splice(id, 1);
	res.json("Successfully deleted.....");
    } else{
        res.json({ message:`The movie with id - ${id}you tried to delete,does not exists.....`})
    }
	
});

app.listen(8080);
