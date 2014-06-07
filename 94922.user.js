// ==UserScript==
// @name           linksText
// @namespace      Possumboy
// @include        *
// ==/UserScript==

askFirst = true;

function changeLinks(){
pg = window.location.href;

	anchs = document.getElementsByTagName("a");
	for(i=1;i<=anchs.length;i++){		
		if(anchs[i].getAttribute("href").substr(0,8).match(/:\/\//gi)){
			anchs[i].textContent = anchs[i].getAttribute("href")
		}
		else{
			anchs[i].textContent = unescape(pg) + "/" + unescape(anchs[i].getAttribute("href"));
		}
	}
}

if(askFirst == true){
	GM_registerMenuCommand('Replace Link Text', changeLinks, null, null, "");
}
else{
	changeLinks();
}