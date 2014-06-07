// ==UserScript==
// @name           Arrow Key
// @namespace      http://wangii.life365.com
// @description    Use key left or right to browse manul.
// @include        *
// ==/UserScript==

var href_prev=null;
var href_next=null;


function keyHandler(evt){
	if(evt.keyCode==37){
		window.location=href_prev;
	}
	// Right key
	if(evt.keyCode==39){
		window.location=href_next;
	}
}

function check_href(){
	var hrefs=document.getElementsByTagName('A');
	for(var i=0;i<hrefs.length;i++){
		var a=hrefs[i];
		var txt=a.innerHTML.toLowerCase();
		if(txt=='prev' || txt=='previous'){
			href_prev=a.href;
		}

		if(txt=='next'){
			href_next=a.href;
		}
	}
}

check_href();

if(href_prev!=null && href_next!=null){
	document.addEventListener("keypress",keyHandler,true);
}
