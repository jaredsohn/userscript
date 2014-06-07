// ==UserScript==
// @name          FORM-enabled
// @namespace     
// @description	  Shows hidden fields in forms and shows the name as label, enables buttons and fields and makes readonly-fields writable
// @include       *
// ==/UserScript==
GM_registerMenuCommand( "Add Form-Buttons", add_form_buttons, "b", "control shift");

(function() {
	var i=document.getElementsByTagName('input');
	for (var j=0; j<i.length; j++) {

		i[j].removeAttribute('disabled');
		i[j].removeAttribute('readonly');
	}
	var i=document.getElementsByTagName('select');
	for (var j=0; j<i.length; j++) {
		i[j].removeAttribute('disabled');
	}
	var i=document.getElementsByTagName('form');
	for (var j=0; j<i.length; j++) {

	}
})();
function newlabel(name){
	var label=document.createElement('label');
	label.innerHTML = name;

}

function newlabel(name,color){
	var label=document.createElement('label');
	label.innerHTML = name;
	label.style.color=color;

}

function newinput(name,type){

}

function add_form_buttons(){
	var i=document.getElementsByTagName('form');

}