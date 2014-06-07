// ==UserScript==
// @name          Gmail2 Reply to all Alert
// @description   adds an alert to the "Reply to all" button
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

//constant
var label = 'Reply to all';
var interval = 3000;

var canvasDocument;

function initState(){		
		canvas=document.getElementById('canvas_frame');		
		if(canvas!=null){						
			canvasDocument=canvas.contentDocument;									
			return true;
		}
		return false;
}

function changeStyle(){	  
		var t;
		var clearFlag = false;
		t=setInterval(
			function() {
				buttons = canvasDocument.getElementsByTagName('span');				
				for(i=0;i<buttons.length;i++){
					if(buttons[i].innerHTML==label){
						buttons[i].parentNode.addEventListener( "click",
						    function(event) {
							  alert('You just clicked reply to all.  Are you sure?');
						    },
						    true);
						clearFlag=true;
					}
			  }				
				//if(clearFlag==true)clearInterval(t);				
			}
		,interval);
}

function onLoadHandler(){
	if (initState()==true) changeStyle();		
}

window.addEventListener('load',onLoadHandler,true);