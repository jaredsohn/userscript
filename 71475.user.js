// ==UserScript==
// @name           IRZ WHEEL SCRIPT
// @namespace      WHAT
// @description    IS THIS WHERE WE TALK ABOUT WHEELS?
// @include        http://www.forumwarz.com/idc
// ==/UserScript==

// change this if lines get garbled, it's how long it waits between posts
// (milliseconds)
var pausetime = 1000;


function pause(millis){
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
} 

function add_text(line) {
	var postal = line;
	document.getElementById("boring_stuff").value = postal;
	document.getElementById("dicksinmybutt").click();
	pause(pausetime);
}

function make_wheel(nick,forwards){
	var line = "";
	num = 0;
	wheel = new Array();
	wheel[num] = ":wheel:" + nick;
	while(nick.length){
		line += "_";
		nick = nick.substring(1);
		num++;
		wheel[num] = line+":wheel:"+nick;
	}
	if(forwards)
	for(i=0;i<(num+1);i++){
		add_text(wheel[i]);
	}
	else
	for(i=num;i>(-1);i--){
		add_text(wheel[i]);
	}
}

function IDCwheelWord() {
	var derp = prompt("NUBCAKE TO :WHEEL:","Jalapeno Bootyhole");
	make_wheel(derp,true);
}
function IDCwheelBack() {
	var derp = prompt("NUBCAKE TO :WHEEL:","Jalapeno Bootyhole");
	make_wheel(derp,false);
}

var where, newElement;
where = document.getElementById('idc_form');
if (where) {
    newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "dicksinmybutt");
	newElement.setAttribute("onclick", "javascript: submitform()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	newElement.innerHTML  = '<script type="text/javascript">function submitform(){if(document.forms[0].onsubmit()){document.forms[0].submit();}}</script>';
    where.parentNode.insertBefore(newElement, where.nextSibling);

    newElement = document.createElement('img');
	newElement.setAttribute("src", "http://uploads.forumwarz.com/cdn/58/5d37c49e-36a6-11de-874a-00221924d7d8.gif");
	newElement.setAttribute("id", "CYBER_LAUGH");
	newElement.addEventListener('click', IDCwheelWord, false)
    where.parentNode.insertBefore(newElement, where.nextSibling);
newElement = document.createElement('input');
	newElement.setAttribute("value", "REVERSE");
	newElement.setAttribute("id", "ALDO_IS_GAY");
	newElement.setAttribute("type", "button");
	newElement.addEventListener('click', IDCwheelBack, false)
    where.parentNode.insertBefore(newElement, where.nextSibling);
}