// Gmail2 Larger Labels
// aka LabelsFix
// version 1.6
// 2008-07-02
// by Diego De Vita
//
// ==UserScript==
// @name          Gmail2 Larger Labels
// @description   set\enlarge the width of the labels panel on your gmail account
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

//constants
var labelsWidth=270;
var mainInterval=2000;

var canvasBody;

function initCanvas(){				
		canvas=document.getElementById('canvas_frame');			
		if(canvas!=null){				
			//HTML>BODY	
			canvasBody = canvas.contentDocument.childNodes[1].childNodes[1];
			if(canvasBody!=null)return true;			
		}
		return false;
}

function enlarge(){				
		mainWidth=window.innerWidth-labelsWidth-34;			
					
		whole = canvasBody.childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0];
		labels = whole.childNodes[1];
		main  = whole.childNodes[2];
		
		labels.style.width = labelsWidth+'px';
		main.style.width = mainWidth+'px';
}

function mainLoop(){
	if(initCanvas()==true)enlarge();	
}

function onLoadHandler(){
	setTimeout(mainLoop,mainInterval);
}
function onResizeHandler(){
	if(canvasBody!=null)enlarge();		
}

window.addEventListener('load',onLoadHandler,true);
window.addEventListener('resize',onResizeHandler,true);