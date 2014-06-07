// ==UserScript==
// @name           Gmail-My-Logo
// @namespace      http://mail.google.com/mail/?shva=1#inbox
// @description    Replace Gmail Logo with My Logo
// @include        http://mail.google.com/mail/*
// ==/UserScript==



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

function addMyName(){

	var image = 'http://i386.photobucket.com/albums/oo302/anshul81/anshul.png';
	var divs = canvasDocument.getElementsByTagName('div');

	for(i=0;i<divs.length;i++){
		if(divs[i].title.indexOf('Gmail by Google')!=-1){
			divs[i].style.backgroundImage="url("+image+")"; 
		}
	}	
}

function onLoadHandler(){
	if (initState()==true) 
		setTimeout(addMyName,interval);
		//addMyName();
}

window.addEventListener('load',onLoadHandler,true);