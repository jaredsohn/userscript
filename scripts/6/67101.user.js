// ==UserScript==
// @name           Insert Name Here
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://ww*.erepublik.com/*/messages/compose/*
// @description	   "CitizenName" will be replaced with citizen's actual name in messages, can be automatic and directed by button press
// @author         Endy
// ==/UserScript==

//Based on: http://userscripts.org/scripts/review/65329

// 

// Initial Run, for mass messaging tools


var junk = document.getElementsByClassName('nameholder');

	junk = junk[0].getElementsByClassName('smalldotted')[0].innerHTML;
var body = document.getElementById("message_body");
var subject = document.getElementById("message_subject");

	body.value = body.value.replace(/CitizenName/ig, junk);
	subject.value = subject.value.replace(/CitizenName/ig, junk);


// button press directed run

function replace(e){

var junk = document.getElementsByClassName('nameholder');

	junk = junk[0].getElementsByClassName('smalldotted')[0].innerHTML;

var subject = document.getElementById("message_subject");

	body.value = body.value.replace(/CitizenName/ig, junk);
	subject.value = subject.value.replace(/CitizenName/ig, junk);

return true;
}

// button creation
	var button = document.createElement("input");	
		button.setAttribute("type","button");	
		button.setAttribute("value","CitizenName Replace");
		button.setAttribute("class","button");	
		button.addEventListener("click", replace, true);
	
		body.parentNode.appendChild(button);