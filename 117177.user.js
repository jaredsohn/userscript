// ==UserScript==
// @name           Reddit open all in tabs
// @namespace      reddit
// @include        http://www.reddit.com/*
// ==/UserScript==


window.addButton = function () {

	var newDiv = document.createElement('div');
	newDiv.setAttribute('id','buttonDiv');
		
	var inputButton = document.createElement('input');
	inputButton.type = 'button';
	inputButton.value = 'Start the Magic';
	inputButton.setAttribute("onclick", "openAlltheTABS();");
	
	// Append the button to the div
	document.getElementsByTagName("body")[0].appendChild(newDiv);
	document.getElementById("buttonDiv").appendChild(inputButton); 
}
addButton();

var myButtonDiv = document.getElementById("buttonDiv");
myButtonDiv.style.position = "fixed";
myButtonDiv.style.left = "0px";
myButtonDiv.style.bottom = "0px";
myButtonDiv.style.backgroundColor = "black";

unsafeWindow.openAlltheTABS = function (){

		var alltheas = document.getElementsByTagName('a');
		
		for (var j = 0;j<alltheas.length;j++){
			
			if (alltheas[j].className.indexOf("title") > -1){
												
					F = window.open('','_blank');
					F.document.write('<html><head><title>'+ alltheas[j].text +'</title></head><body style="margin:0;padding:0;">');
					F.document.write('<div width="100%" height="30px" style="color: white; background-color:black;" id="titlediv">'+alltheas[j].text+'</div>');					
					F.document.write('<iframe width="100%" height="100%" src="'+alltheas[j].href+'"></iframe>');
					F.document.write('</body></html>');
			
			}
		}
}


