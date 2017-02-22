//Part O:
var fruit =['apple', 'orange', 'pineapple'];

function findFruit(inputName){
	for (i=0;i<fruit.length;i++){
		if(inputName==fruit[i]){
			return 1
		}else{
			return -1
		}
	}
}


var fruit =['apple', 'orange', 'orange','pineapple'];
var result =[]
function findFruitPosition(inputName){
	for (i=0;i<fruit.length;i++){
		if(inputName==fruit[i]){
	     result.push(i)
		}
	}
	console.log(result)
}

//JS Morning Warmups . Write a function that determines if a string starts with an upper-case letter A-Z
function determineFirstLetter(text){
	var character=text.charAt(0);
	// if (isdigit(character)){
	// 	console.log('the string starts with an number')
	// }else 
	if (character==character.toUpperCase()) {
		console.log('the string starts with an upper-case letter')
	}else if(character==character.toLowerCase()){
		console.log('the string starts with an lower-case letter')
	}
}
determineFirstLetter('good')
determineFirstLetter('Morning')


//document.getElementsByName in jQuery $("[name=Name]");
//document.getElementsById in jQuery $("#IdofElement");
//document.getElementsByClass in jQuery $(".ClassofElement");