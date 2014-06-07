// ==UserScript==
// @name	  Message Saver
// @description	  Able to save and load up to 10 different messages.
// @author	  Endy
// @namespace	  http://e-sim.org/newspaper.html?id=3876
// @include       http://e-sim.org/*
// ==/UserScript==

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome == false){
	if(document.getElementById("messageForm") != null){
		document.getElementById("messageForm").removeAttribute("maxlength");
	}
}

var patt1=new RegExp("http://e-sim.org/composeMessage.html");



if(patt1.test(document.location) == true){

var parent = document.getElementById("messageForm").parentNode;


parent.innerHTML = parent.innerHTML + ' &nbsp; <input id="saveButton" value="Save" type="button"> &nbsp; <input id="loadButton" value="Load" type="button"> &nbsp; <select id="selectNum"><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>';

 
 

document.getElementById("saveButton").addEventListener(
    "click",
    function() {
	var e = document.getElementById("selectNum");
	var num = e.options[e.selectedIndex].value;


	strName = "saveTitle" + num;
	localStorage[strName] = document.getElementById('titleInput').value;
	
	var strName = "saveBody" + num;
	localStorage[strName] = document.getElementById('messageForm').value;


        return false;
    },
    false
);


document.getElementById("loadButton").addEventListener(
    "click",
    function() {
	var e = document.getElementById("selectNum");
	var num = e.options[e.selectedIndex].value;

	strName = "saveTitle" + num;
	document.getElementById('titleInput').value = localStorage[strName];

	var strName = "saveBody" + num;
	document.getElementById('messageForm').value = localStorage[strName];

        return false;
    },
    false
);



}