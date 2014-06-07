// ==UserScript==
// @name           Facebook Ticker Killer + Add Ons
// @namespace      TheNamelessAccount
// @description    Kills the Ticker and Disables the people you may know tab, etc...
// @include        http://www.facebook.com/
// ==/UserScript== 

var ticker = document.getElementById('pagelet_ticker');
if(ticker) {
	ticker.parentNode.removeChild(ticker);
}

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