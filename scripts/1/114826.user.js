// ==UserScript==
// @name           Google Reader to Google Plus
// @namespace      http://dl.dropbox.com/u/13230381/GreaderToGplus.user.js
// @include        http://*google.com*/reader*
// @include        https://*google.com*/reader*
// @author 		   Csepulved4
// @date		   01-10-2011
// ==/UserScript==
addjs();
var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
function nodeInserted(event){	
		if (event.target.tagName=="DIV"){
		//GM_log("Added - "+event.target.className);
		try{
			if (event.target.className!=""){
				
				var linkbar;
				if (event.target.className=="entry-actions"){
					linkbar=event.target;
					mode="list";
				}
				else if (event.target.firstChild && event.target.firstChild.className=="card card-common"){
				
					linkbar=event.target.firstChild.childNodes[2];
					div1=event.target.firstChild.childNodes[2].firstChild;
					mode="expanded";
				}
				url=event.target.firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.href;
				btn=document.createElement("g:plusone");
				btn.setAttribute("size","small");
				btn.setAttribute("href",url);
				divp=document.createElement("div");
				divp.setAttribute('id','content');
				divp.setAttribute('style','width: 5%; float: left;');
				divp.appendChild(btn);
				scr=document.createElement('script');
				scr.type='text/javascript';
				scr.innerHTML="gapi.plusone.go();";
				divp.appendChild(scr);
				linkbar.appendChild(divp);
				div1.setAttribute('style', 'float: left;');
				
			}
		}
		catch(e){

		}
	}
	
}
function addjs() {
    var head, javascr,javascr2;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    javascr = document.createElement('script');
    javascr.type = 'text/javascript';
    javascr.innerHTML='{"parsetags": "explicit", "lang": "es"}';
	javascr.src = 'https://apis.google.com/js/plusone.js';
	head.appendChild(javascr);
	javascr2 = document.createElement('script');
    javascr2.type = 'text/javascript';
    javascr2.innerHTML='{"parsetags": "explicit"}';
	head.appendChild(javascr2);
}