// ==UserScript==
// @name  Dragcavecheater
// @description Grab demeggs
// ==/UserScript==


function grabEggs(){
	console.log("Eggs will be identified then grabbed later");
}


$(document).ready(function(){
	if($('p').text() = "As you set off toward the coast, you see a massive pile of eggs. You decide that there are plenty of eggs there, and traveling is unnecessary."){
		console.log("Cave Blocked!");
	}
	else{
		grabEggs();
	}
})

console.log("At least this is running! :D");