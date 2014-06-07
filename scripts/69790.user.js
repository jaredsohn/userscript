// ==UserScript==
// @name Ram - test - keys
// @description testing in progress
// @include http://p178662.wdf.sap.corp:8080/*
// @match http://p178662.wdf.sap.corp:8080/*
// ==/UserScript==

function onMouseUp(event){
	document.getElementById('nxtbutton').click();
}

function keyPressEvent(event){
		var prevButton = document.getElementById('prevbtn');
		var nextButton = document.getElementById('nxtbutton');
		var keyNum = event.charCode ? event.charCode : event.keyCode;
		//var letter = String.fromCharCode(keyNum).toLowerCase();
		switch (keyNum) {
			case 97: // a
				prevButton.click(); //btn_prev
				//doPrevious();
				break;
			case 115: // s
				nextButton.click(); //nxtbutton
				//doNext();
				break;
			default:
		}
	}

document.addEventListener('onmouseup', onMouseUp, true);
document.addEventListener('keypress', keyPressEvent, true);