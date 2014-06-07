
// Shakedown hyves event checker
// version 0.2 BETA!
// 2011-02-16
// Copyright (c) 2011, William Assaad
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//----------------------------------------------------------------
//
// ==UserScript==
// @name          HEChecker
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Check all friends in hyves selectboxes
// @include       http://www.hyves.nl/agenda/*
// ==/UserScript==

alert('Hyves Agenda Bot Loaded - ©William Assaad');
var old;


function selectAll(a)
{
	var ctr = 0;
	var matches = document.querySelectorAll("#taf-friends-list li");
	for (var i = 0; i < matches.length; i++) {	
		if(a){
			matches[i].setAttribute('class','selected');ctr++;
			}else{
			matches[i].setAttribute('class','');
		}
	}
	alert("Je hebt " + ctr + " mensen geselecteerd om uit te nodigen voor het event.");
}
function loadAll() {
	var matches = document.querySelectorAll("#taf-friends-list li");
	if(matches.length>0){		
		var objDiv = document.getElementById("taf-friends-list");		
		if(objDiv.scrollHeight>0)		{
			objDiv.scrollTop = objDiv.scrollHeight;	
		}if(objDiv.scrollHeight==old){	
			clearInterval(timer);
			selectAll(true);	
		}
		old = objDiv.scrollHeight;
	}	
}

var timer = setInterval(loadAll, 1500);



