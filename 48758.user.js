// ==UserScript==
// @name           RiX's MouseHunt Timer
// @namespace      robbiedebadeend
// @include        http://apps.facebook.com/mousehunt/*
// @description	   This script shows a box in the upper left corner of the browser with the time remaining for clicking the horn again. Background color points out remaining time: 4mins-yellow, 2mins-orange, 1min-red.
// ==/UserScript==

var rixvalue = 0;
var rixmins = 0;
var rixsecs = 0;

function resetRiXVal(domid) {
	inputs = document.getElementsByTagName("input");
	if(inputs) {
		for(i = 0; i < inputs.length; i++) {
			if(inputs[i].id.indexOf("hornWaitValue") != -1) {
				rixvalue=inputs[i].value;
				if(rixvalue>0) {
					document.getElementById(domid).style.background = "white";
					document.getElementById(domid).style.color = "black";
					if(rixvalue < 241) {
						document.getElementById(domid).style.background = "yellow";
						document.getElementById(domid).style.color = "black";
					}
					if(rixvalue < 121) {
						document.getElementById(domid).style.background = "orange";
						document.getElementById(domid).style.color = "black";
					}
					if(rixvalue < 61) {
						document.getElementById(domid).style.background = "red";
						document.getElementById(domid).style.color = "white";
					}
					rixmins = Math.floor(rixvalue/60);
					rixsecs = rixvalue%60;
					if(rixsecs < 10)
						rixsecs = '0'+rixsecs;
					document.getElementById(domid).innerHTML = rixmins+":"+rixsecs;
				}
				else {
					document.getElementById(domid).innerHTML = "negative waitvalue";
				}
			}
		}
	}
	setTimeout(function(){resetRiXVal('rixdiv');},5000);
}

var rixdiv = document.createElement('div');
rixdiv.id = 'rixdiv';
rixdiv.style.position = "absolute";
rixdiv.style.left = '20px';
rixdiv.style.top = '20px';
rixdiv.style.color = "black";
rixdiv.style.fontSize = "12pt";
rixdiv.style.fontWeight = "bold";
rixdiv.style.width = "100px";
rixdiv.style.border = "1px solid black";
rixdiv.style.padding = "4px";
document.body.appendChild(rixdiv);
resetRiXVal('rixdiv');