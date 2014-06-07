// Gmail2 RedDelete
// version 0.4b
// 2009-02-04
// by Diego De Vita
// based on Bruno Caimar's idea.
//
// ==UserScript==
// @name          Gmail2 RedDelete
// @description   change the style of the delete button on your gmail account
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

var rCondition = /^(Delete|Delete forever)$/;
var gCondition = /^Not spam$/;
var interval = 1000;

var canvasDocument;

function initState(){		
		canvas=document.getElementById('canvas_frame');		
		if(canvas!=null){						
			canvasDocument=canvas.contentDocument;									
			return true;
		}
		return false;
}

function changeStyle(n,color){
	n.style.background = color;
	n.style.color = 'white';
	n.style.fontWeight = 'bold';
}

function modButtons() {
	buttons = canvasDocument.getElementsByTagName('div');				
	for(i=0;i<buttons.length;i++){
		if (buttons[i].innerHTML.match(rCondition)) changeStyle(buttons[i],'red');			
		if (buttons[i].innerHTML.match(gCondition)) changeStyle(buttons[i],'green');			
	}
}								

function onLoadHandler(){
	if (initState()==true) setInterval(modButtons,interval);
}

window.addEventListener('load',onLoadHandler,true);