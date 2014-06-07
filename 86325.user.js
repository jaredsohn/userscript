// ==UserScript==
// @name           Increment/Decrement
// @namespace      pendevin
// @description    Uses Ctrl+Alt+Shift+Up to increment and Ctrl+Alt+Shift+Down to decrement a URL
// @include        *
// ==/UserScript==

var shiftKey=false;
var ctrlKey=false;
var altKey=false;

function checkKeys(e){
	if(e.which==16)shiftKey=true;
	if(e.which==17)ctrlKey=true;
	if(e.which==18)altKey=true;
	if(shiftKey&&ctrlKey&&altKey&&e.which==38){
		changeNumber(1)
	}
	if(shiftKey&&ctrlKey&&altKey&&e.which==40){
		changeNumber(parseInt("-1"));
	}
}

function changeNumber(direction){
	var begin=0;
	var end=0;
	for(var i=location.href.length;i>=0;--i){
		if(isDigit(location.href.charAt(i))){
			end=i;
			break;
		}
	}
	for(i=end;i>=0;--i){
		if(!isDigit(location.href.charAt(i))){
			begin=i+1;
			break;
		}
	}
	if(end==0)return;
	oldNumber=location.href.substring(begin,end+1);
	newNumber=""+(parseInt(oldNumber,10)+direction);
	while(newNumber.length<oldNumber.length)newNumber="0"+newNumber;
	location.href=location.href.substring(0,begin)+newNumber+location.href.substring(end+1);

	function isDigit(c){
		return("0"<=c&&c<="9")
	}
}

function liftKeys(e){
	if(shiftKey&&e.which==16)shiftKey=false;
	if(ctrlKey&&e.which==17)ctrlKey=false;
	if(altKey&&e.which==18)altKey=false;
}

document.addEventListener('keydown',checkKeys,true);
document.addEventListener('keyup',liftKeys,true);