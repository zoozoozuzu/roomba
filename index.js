//to run: install node, save index.js and input.txt in a folder to your computer, and using a mac on terminal, run, node index.js
//this expects valid inputs

//fs is the file system module which allows CRUD with the file systems on your computer
var fs = require('fs');
//convert text file to string and split on new line
var textToString = fs.readFileSync('input.txt').toString().split("\n");

//split room dimension by space and convert to number
var roomDimensions = textToString[0].split(" ").map(Number);
var roomDimensionsX = roomDimensions[0];
var roomDimensionsY = roomDimensions[1];

//split hoover start position by space and convert to number
var hooverPosition = textToString[1].split(" ").map(Number);
var hooverPositionX = hooverPosition[0];
var hooverPositionY = hooverPosition[1];

//to find NESW directions
var letters = /^[A-Za-z]+$/;

//store dirt patches in new array
var dirtPatches = [];

//after grid size and hoover location, push numbers into empty array and split letters into directions
for (var i = 2; i < textToString.length; i++) {
	if (textToString[i].match(letters)) {
		// split into individual letters
		var drivingInstructions = textToString[i].split("");
	} else {
	//split by space and convert to number, push into empty array
		var individualDirtPatches = textToString[i].split(" ").map(Number);
		dirtPatches.push(individualDirtPatches);
	}
}

//tally to see how many patches the hoover went through
var tally = 0;

// interpret driving instructions
for (var i = 0; i < drivingInstructions.length; i++) {
	//if east move hoover one space to the right
	if (drivingInstructions[i] === "E") {
		hooverPositionX = hooverPositionX + 1;
		//make sure hoover does not go off the board
		//roomDimensionsX - 1 to count for space 0,0
		if (hooverPositionX > roomDimensionsX - 1) {
			hooverPositionX = roomDimensionsX - 1;
		}
	//if west move hoover one space to the left
	} else if (drivingInstructions[i] === "W") {
		hooverPositionX = hooverPositionX - 1;
		if (hooverPositionX < 0) {
			hooverPositionX = 0;
		}
	//if north move hoover one space up
	} else if (drivingInstructions[i] === "N") {
		hooverPositionY = hooverPositionY + 1;
		//if Y is greater than the edge of the grid, move Y back to the edge of the grid
		if (hooverPositionY > roomDimensionsY - 1) {
			hooverPositionY = roomDimensionsY - 1;
		}
	} else {
	//if south move hoover one space down
		hooverPositionY = hooverPositionY - 1;
		if (hooverPositionY < 0){
			hooverPositionY = 0;
		}
	} 

	//each time the hooever lands on a position, check if there is dirt there
	for (var k = 0; k < dirtPatches.length; k++) {
		if (dirtPatches[k][0] === hooverPositionX && dirtPatches[k][1] === hooverPositionY) {
			//count how many times it has landed on dirt with a tally
			tally = tally + 1;
			//do not repeat hoover dirt patches by removing them after they have been hoovered
			//remove 1 element at index k
			dirtPatches.splice(k, 1);
		}
	} 
 }
 

//final position of hoover
console.log(hooverPositionX, hooverPositionY);

//number of patches of dirt the robot cleaned up
console.log(tally);
