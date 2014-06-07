// ==UserScript==
// @name           4chanInfinite
// @namespace      MediocreGopher
// @include        http://boards.4chan.org/b/
// ==/UserScript==

var OldForm = document.getElementsByName('delform')[0];
var NewForm
var bod = document.getElementsByTagName('body')[0];
var timer;
var remove = false;
startChecking();

function startChecking() {
timer = setInterval(function(){
	var percent = document.body.scrollTop/document.documentElement.clientHeight;
	changeTitle(percent);
	if (percent > .92 || (!NewForm && percent > .87)) {
		clearInterval(timer);
		if (NewForm) {
			bod.removeChild(OldForm);
			OldForm = NewForm;
		}
		MOAR();
	}
},1000);
}

function MOAR() {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (ajax.readyState==4) {
			var res = ajax.responseText;
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML=res;
			NewForm = tempDiv.getElementsByTagName('form')[1];
			bod.appendChild(NewForm);
			startChecking();
		}
	}
	ajax.open("GET","/b/");
	ajax.send();
}

var title = document.getElementsByTagName('title')[0];
function changeTitle(to) {
	title.innerHTML = to;
}
