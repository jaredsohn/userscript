// ==UserScript==
// @name         GReader_OpenBackground_Chrome
// @version      1.01
// @author       Chen Xi
// @e-mail       imchenxi@gmail.com
// @description  GReader - Open feed item in background by pressing 'w'; for Chrome
// @include      http*://www.google.com/reader/view/*
// ==/UserScript==

var x;
var link;

document.addEventListener('keypress', function(event) {
	if( event.which==119) {
		x=document.getElementById('current-entry');
		//if no feed item selected, exit
		if(x==null){
			return;
		}
		x = x.getElementsByTagName('a');
		link=x[0].getAttribute('href');
		event.stopPropagation();
		event.preventDefault();
		window.open(link);
                window.focus();
	}
   
}, true);
