// ==UserScript==
// @name          FORM Help
// @namespace     http://www.black-silence.ch
// @description	  Shows hidden fields in forms and shows the name as label, enables buttons and fields and makes readonly-fields writable
// @include       *
// ==/UserScript==
GM_registerMenuCommand( "Add Form-Buttons", add_form_buttons, "b", "control shift");

(function() {
	var i=document.getElementsByTagName('input');
	for (var j=0; j<i.length; j++) {
		if ('hidden'==i[j].type) {
			i[j].type='';
			i[j].parentNode.insertBefore(newlabel(i[j].name + ': '),i[j]);
		}
		if ('password'==i[j].type) i[j].type='';
		i[j].removeAttribute('disabled');
		i[j].removeAttribute('readonly');
	}
	var i=document.getElementsByTagName('select');
	for (var j=0; j<i.length; j++) {
		i[j].removeAttribute('disabled');
	}
	var i=document.getElementsByTagName('form');
	for (var j=0; j<i.length; j++) {
		i[j].style.borderStyle = 'solid';
		i[j].style.borderColor = 'red';
		i[j].insertBefore(newlabel('Form-Action: ' + i[j].action,'Red'),i[j].firstChild);
	}
})();
function newlabel(name){
	var label=document.createElement('label');
	label.innerHTML = name;
	return label;
}

function newlabel(name,color){
	var label=document.createElement('label');
	label.innerHTML = name;
	label.style.color=color;
	return label;
}

function newinput(name,type){
	var input=document.createElement('input');
	input.name=name;
	input.type=type;
	return input;
}

function add_form_buttons(){
	var i=document.getElementsByTagName('form');
	for (var j=0; j<i.length; j++) {
		i[j].insertBefore(newinput(i[j].name,'submit'),i[j].firstchild);
	}
}
