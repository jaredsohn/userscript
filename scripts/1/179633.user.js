// ==UserScript==
// @name       Mirkofiltr
// @namespace		http://www.wykop.pl/ludzie/arcn/
// @description		Tryb NSFW do wypoku
// @author		arcn
// @version		0.1
// @grant		none
// @include		http://www.wykop.pl/mikroblog*
// @include		http://www.wykop.pl/wpis*
// @include		http://www.wykop.pl/tag*
// @include		http://wykop.pl/ludzie*
// @run-at 		document-stop
// ==/UserScript==

//dzięki @xcccx za pomoc z localStorage ( ͡° ͜ʖ ͡°)

//filtr NSFW, możesz dodać własne tagi do filtrowania wg. tego schematu
var nsfw = [];
    nsfw[0] = "nsfw";
    nsfw[1] = "ladnapani";
    nsfw[2] = "prokuratorboners";
    nsfw[3] = "kontenerynamleko";
    nsfw[4] = "cycki";
    nsfw[5] = "tyleczki";

//funkcja do czyszczenia
function czyscMirka(filtr){

	var niszczWpisy = function(filtr){
	var tag = document.getElementsByClassName("showTagSummary");
	for (x=0; filtr.length >x; x++) {
		for (i=0; tag.length >i; i++) {
    		if(tag[i].innerHTML === filtr[x]) {
    			tag[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"   
    			};
		};
	};
    }
	niszczWpisy(filtr);
	//niszczy nowe wpisy które się załadują
	$( document ).ajaxStop(function() {
  	niszczWpisy(filtr);
	});
}



//funkcja dodające checkboxa nsfw, np. przy komencie /nsfw checkbox
function addCheckBox(){
var tagMenu = document.getElementsByClassName("newtagmenu");;
var formLi = document.createElement("li");
var form = document.createElement("form");
form.style.display="inline";
var checkBox = document.createElement("input");
checkBox.setAttribute("type", "checkbox");
checkBox.id = "chBox";
var txt = document.createTextNode("NSFW");
form.appendChild(checkBox);
form.appendChild(txt);
formLi.appendChild(form);
tagMenu[0].appendChild(formLi);
}

addCheckBox();

$('#chBox').change(function() {
  localStorage.chbxchecked = $(this).prop('checked');
   czyscMirka(nsfw);
});


$(document).ready(function(){
    var chbx = document.getElementById("chBox");
	if (localStorage.getItem("chbxchecked") == 'true'){ chbx.checked = true; czyscMirka(nsfw);};
    
});