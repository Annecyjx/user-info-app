const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');//middle ware must be installed via npm install --save body-parser
// const pug = require('pug'); we need to install pug but not require
const app = express();
app.use(bodyParser.json()); // for parsing application/json app.use is to use middleware
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//setting views folder and view engine
app.set('views', __dirname + '/views');
app.set('view engine','pug');
app.use(express.static('static'))

//home page
app.get('/home',(request,response) => {
	console.log('Render index pug page');
	response.render('index'); //render the index.pug
});

//route 1 request
app.get('/aboutUsers',(request,response) => {
	console.log('Render index pug page');
	fs.readFile('./users.json','utF-8',(error,data) =>{
		console.log('readFile is called');
		if(error) throw error;
		var usersdata = JSON.parse(data);
		response.render('about-users',{usersInfo:usersdata});
	});
});

//route 2 request
app.get('/search',(request,response)=>{
	console.log('render the search pug');
	response.render('search')
});

//Autocomplete Part
app.post('/search',(request,response) => {
	var result=[];
    console.log('post a search request')
    const inputLetter = request.body.suggestion;//get the ajax post
	const inputLetterLowerCase =inputLetter.toLowerCase()
	fs.readFile('./users.json','utF-8',(error,data) =>{
		console.log('readFile is called');
		if(error) throw error;
		var usersdata = JSON.parse(data);
		for(var i= 0; i<usersdata.length; i++){
		  var firstnameLowerCase = usersdata[i].firstname.toLowerCase();
		  var lastnameLowerCase = usersdata[i].lastname.toLowerCase();
		  var apple = firstnameLowerCase.indexOf(inputLetterLowerCase);
		  var banana = lastnameLowerCase.indexOf(inputLetterLowerCase);
		  if(apple>-1 || banana>-1){
		  	result.push({'firstname':usersdata[i].firstname,'lastname':usersdata[i].lastname})//matches
		  }
		}
		response.send({suggestion:result})//send these data to the callback in ajax call
		//we can only have one response, so this should out of the for loop
    })
});

//route 3 request
app.post('/searchResult',(request,response) =>{
	var results=[];
	console.log('Post a search result request');
	const inputUserName = request.body.searchbar; //searchbar is the name of the search form
	fs.readFile('./users.json','utF-8',(error,data) =>{
		if(error) throw error;
		var usersdata = JSON.parse(data);
		
		for(var i=0; i<usersdata.length; i++){
			if (inputUserName==usersdata[i].firstname ||
			    inputUserName==usersdata[i].lastname || 
			    (inputUserName==usersdata[i].firstname + ' '+ usersdata[i].lastname)){
				results.push({'firstname':usersdata[i].firstname, 'lastname':usersdata[i].lastname,'email':usersdata[i].email});
				console.log('compared inputUserName with usersdata')
			}
		}	
	response.render('search-result',{usersInfo:results});

});	
})

// route 4
app.get('/addUsers',(request,response) =>{
	console.log('Render add-users pug page');
	response.render('add-users');
});

//route 5
 app.post('/addUsers',(request,response) =>{
 	console.log('Post a request');

 	fs.readFile('./users.json','utF-8',(error,data)=>{
 		if(error) throw error;
 		const inputFirstName = request.body.firstname;
		const inputLastName = request.body.lastname;
		const inputEmail = request.body.email;
 		var obj = {'firstname':inputFirstName, 'lastname':inputLastName,'email':inputEmail};
 		var usersdata = JSON.parse(data); //data is string, parser is making usersdata into array/object;
 		console.log('got new users');
 		usersdata.push(obj);

		fs.writeFile('./users.json',JSON.stringify(usersdata),(error)=>{
			if(error) throw error;
		})
 	})
 	response.render('add-users-success');
 })


//set up port to locally run the app
app.listen(3000,() => {
	console.log('Server has started');
})