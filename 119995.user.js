// ==UserScript==
// @name		FTO Starvation
// @namespace		http://userscripts.org/tags/faerytaleonline
// @include		*faerytaleonline.com/main.php
// @version		1.0
// @description		FTO tweak that colours names in Inhabitants window. Orange = Starving or Near Death, Green (optional) = active projects.
// @icon		http://faerytaleonline.com/favicon.ico
// ==/UserScript==

 
function contentEval(source) {
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var str = source.toString();
str=str.replace("function ()", "").replace("function()", "").replace("{", "");
str=str.substring(0, str.length-2)
script.textContent = str;
document.body.insertBefore(script,document.body.firstChild);
}
 
 
contentEval(function(){
var colourworking = 1 //change to 0 to disable colouring of working chars

function starving(who)
{
	return who.children[0].children[0].innerHTML.indexOf("appears to be")!=-1;
}

function working(who)
{
	return who.children[0].children[0].innerHTML.indexOf("Projects: Nothing")==-1;
}

function show_people(list) {
	document.getElementById("people_div").innerHTML = list;
	var people = document.getElementById("people_div").lastChild.children;
	var person;
	for(var i=0;i<people.length;i++) {
		person = document.getElementById(people[i].children[0].getAttribute("onmouseout").match(/\d+/)[0]);
		if(working(person) && colourworking)
			people[i].children[1].style.color="#00FF00";
		if(starving(person)) {
			//blink(people[i].children[2]);
			people[i].children[1].style.color="#E07900";
			//people[i].children[1].style.fontWeight="bold";
			}
		}
	}
		
});

