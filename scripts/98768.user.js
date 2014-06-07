// ==UserScript==
// @name		Defgrip Gallery Navigation
// @description	Keyboard navigation to the Defgrip photo gallery.
// @version		1.0
// @author		Jere Salonen / jeresalonen.com / hellojere.com
// @include		http://blog.defgrip.net/*
// ==/UserScript==

function GetChar(e){
	key = e.keyCode ? e.keyCode : e.which;
	switch(key){
		// user presses the "next[39]" key
		case 39:	
			u = getElementsByClassName('contentjumplink');
			if(u[1].href) window.location=(u[1].href);
			return false;
			break;	

		// user presses the "previous[37]" key
		case 37:	
			u = getElementsByClassName('contentjumplink');
			if(u[0].href) window.location=(u[0].href);
			return false;
			break;
	}
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

window.addEventListener('keydown', GetChar, true);