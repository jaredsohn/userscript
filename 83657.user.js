// ==UserScript==
// @name           Automator
// @namespace      Lame noire
// @description    Scan tous les systèmes solaires de toutes les galaxies (mise à jour Xtense)
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

var begin = 1;
var end = 500;
var timeout = 1500;
var finish = false;
var first = true;

var button = document.createElement('input');
button.id = "course";
button.type = "submit";
button.value = "Parcourir";
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(button,document.getElementById('expeditionbutton'));
button.addEventListener("click", function(event){launch();},true);

var beginInput = document.createElement('input');
beginInput.value = begin;
beginInput.size = "2";
var endInput = document.createElement('input');
endInput.value = end;
endInput.size = "2";

var timeoutInput = document.createElement('input');
timeoutInput.value = timeout;
timeoutInput.size = "4";

var open = document.createElement("span");
open.innerHTML = "[";
var close = document.createElement("span");
close.innerHTML = "]";

var space = document.createElement("span");
space.innerHTML = "\u00a0\u00a0\u00a0\u00a0";

var space2 = document.createElement("span");
space2.innerHTML = "\u00a0\u00a0\u00a0\u00a0";

var doublePoint = document.createElement("span");
doublePoint.innerHTML = "\u00a0:\u00a0";


document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(space,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(open,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(beginInput,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(doublePoint,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(endInput,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(close,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(space2,document.getElementById('expeditionbutton'));
document.getElementById('galaxyheadbg').getElementsByTagName('td')[0].getElementsByTagName('div')[0].insertBefore(timeoutInput,document.getElementById('expeditionbutton'));


function launch () {
	if(!first)
		return;
	first = false;
	begin = beginInput.value;
	end = endInput.value;
	timeout = timeoutInput.value;
	changeValue(begin);
	refresh();
	setInterval(course,timeout);
}
function currentShowed () {
	return parseInt(document.getElementById('system_input').value);
}
function changeValue (value) {
	document.getElementById('system_input').value = value;
}
function refresh () {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
	var cb = document.getElementById('showbutton');
	cb.dispatchEvent(evt);
}

function course () {
	if(finish){
		location.href = location.href.replace('galaxy', 'overview');
		alert("Parcours terminé, vous avez été redirigé vers la vue générale")
	}
	
	var next = currentShowed() + 1;	

	if(next == end){
		finish = true;
		return;
	}
	
	changeValue(next);
	refresh();
}