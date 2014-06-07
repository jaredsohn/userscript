// ==UserScript==
// @name            Hide Facebook Sidebar
// @description     Hides the sidebar including Highlights, People you may know, etc.
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(".uiStreamBoulderStyle .uiUfi{width:90%;}");	

function blub()
{
	
	contentcol=document.getElementById("contentCol");
	if(contentcol.className!="noRightCol")
	{
		document.getElementById("rightCol").innerHTML="";
		contentcol.className="noRightCol";
		
	}
}
blub();
document.addEventListener("DOMNodeInserted", blub, true);
