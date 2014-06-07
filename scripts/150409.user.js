// ==UserScript==
// @name        StreetInterview Hacks
// @namespace   streeetinterview
// @description creates printable version of the problem statement; shows newest discussion first
// @include     https://ieee.interviewstreet.com/challenges/dashboard/#*
// @version     0.1.3 (2012-10-22)
// @grant       none
// Author: MyKey_
// ==/UserScript==

reverse = function () {
	a = document.getElementsByClassName("discuss-section-view")[0].children;

	len = a.length;
	x=[]
	for(i=2;i<len;i++) {
		x[i-2] = a.item(i);
	}

	prev = a.item(1);
	p = prev.parentElement;
	p.removeChild(prev);
	p.appendChild(prev);
	for(i=0;i<len-2; i++) {
		b = x[i];
		p.removeChild(b);
		p.insertBefore(b, prev);
		prev = b;
	}
	m = document.getElementById("myRev");
	if(m.innerHTML == "/\\ /\\ /\\") m.innerHTML = "\\/ \\/ \\/"; else m.innerHTML="/\\ /\\ /\\";
	
}

registerReverse = function() {
	setTimeout(function(){
		q = document.getElementsByClassName("discuss-section-view")[0].children.item(0);
		q.innerHTML = '<div><a id="myRev" title="Reverse Ordering">/\\ /\\ /\\</a></div>' + q.innerHTML; 
		m = document.getElementById("myRev"); 
		m.onclick=reverse;
	},
	4000);
}



printable = function() {
	title = document.getElementsByClassName("breadcrumb")[0].children.item(1).innerHTML;
	problem = document.getElementsByClassName("problem")[0];
	
	code = document.getElementById("codeshell");
	del = code.previousSibling;
	for (i=0;i<8;i++) {
		prev = del.previousSibling;
		del.parentNode.removeChild(del);
		del = prev;
	}
	del = code;
	while(del) {
		nxt = del.nextSibling;
		del.parentNode.removeChild(del);
		del = nxt;
	}
	
	try{
		r = document.getElementsByClassName("alert-info")[0];
		r.parentElement.removeChild(r);
	}catch(e){}
	
	body = document.getElementsByTagName("body")[0];
	len = body.children.length
	body.innerHTML = '<div class="myNoPrint"><p><a onclick="window.location.reload(true)">(Back)</a></p><p/></div><h2>' + title + '</h2>';
	body.appendChild(problem);
	head = document.getElementsByTagName("head")[0];
	head.innerHTML+='<style type="text/css" media="print">.myNoPrint {visibility:hidden;} </style>';
}

registerPrintable = function() {
	setTimeout(function(){
		q = document.getElementsByTagName("h2")[0].parentElement.parentElement.children.item(1);
		q.innerHTML = '<a id="myPrint">Printer-Friendly Version</a>' + q.innerHTML; 
		m = document.getElementById("myPrint"); m.onclick=printable;
	},
	4000);
}

checkForRegister = function () {
	if(window.location.hash.indexOf("problem/")==1) {
		registerPrintable();
	}
	if(window.location.hash.indexOf("discuss/")==1) {
		registerReverse();
	}
}
window.onhashchange = checkForRegister;
checkForRegister();

