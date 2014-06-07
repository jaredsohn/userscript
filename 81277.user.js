// ==UserScript==
// @name           ToolTip Fixer
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://economy.erepublik.com/*/market/*/1/*
// @include        http://economy.erepublik.com/*/market/*/3/*
// ==/UserScript==

var health = document.getElementById('wellnessBar').getElementsByTagName('span')[0].innerHTML;


health = 1.5-(health/100);


var happiness = document.getElementsByClassName('citizen_attributes')[0].getElementsByTagName('span')[1].innerHTML;

happiness = 1.5-(happiness/100);
	var x = 0;

document.addEventListener("DOMNodeInserted", nodeInsertedHandler, false);

function nodeInsertedHandler(event) {
var strong = event.target.getElementsByTagName("strong");

	if(strong.length > 0)
	{

	for(var i=0; i < strong.length; i++) 
	{
	var test = strong[i].title.split(" ");

	if(test[2] == "day"){

	if(x == 1){

	strong[i].innerHTML = test[0] * happiness;
x = 0;
return;
	}

	if(x == 0){

	strong[i].innerHTML = test[0] * health;
	x++;
	}


	}


}

}

}