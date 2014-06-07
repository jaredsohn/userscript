// ==UserScript==
// @name        dAmnUpdate
// @namespace   DJ-Zemar
// @description Updates the top bar on deviantART, including: User, Messages, Submit, and Shop.
// @include     *.deviantart.com/*
// @version     1
// ==/UserScript==

//Create a document for storage
var dASwap = document.implementation.createHTMLDocument("dAmnSwap");

function getObject(){
	//Send Request
	var request = XMLHttpRequest();
	request.open("GET", "http://my.deviantart.com/messages/#", false);
	request.send(null);

	//Place response in swap document
	dASwap.documentElement.innerHTML = request.responseText;
	
	swapObject = dASwap.getElementById("overhead").childNodes[0].childNodes[0].childNodes;
	thisObject = document.getElementById("overhead").childNodes[0].childNodes[0].childNodes;
	for(var i=0; i < swapObject.length; i++){
		thisObject[i].innerHTML = swapObject[i].innerHTML;
	}
}

//Call function every 10 seconds
setInterval(getObject,10000);