// ==UserScript==
// @name           YouTube: Auto-Load More Comments + Toggle Comments
// @version        8.0
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/watch*
// ==/UserScript==

var roots = document.getElementById('watch-discussion');
var tog = document.getElementById('comments-view');
var togs = document.getElementById('comments-loading');
var togt = document.getElementsByClassName('comments-pagination')[0];

if(GM_getValue('togglehide')){
	tog.style.display = "none";
	togs.style.display = "none";
	togt.style.display = "none";
}

/* Get total number of comments */
var snapshot, tryc = document.evaluate('//div/h4', document, null, 6, null);
	for (var i=0; i<tryc.snapshotLength; i++) {
		if (tryc.snapshotItem(i).textContent.match(/All Comments/)) {
			var tnoc = tryc.snapshotItem(i).textContent; // .replace(/\D/g,'');
			break;
		}
	}

/* Auto Load Button */
var BUTTON0 = roots.appendChild(document.createElement("button"));
BUTTON0.className="loads yt-uix-button yt-uix-button-default";
BUTTON0.type="button";
BUTTON0.addEventListener('click', function () { loads(); }, false);
BUTTON0.appendChild(document.createTextNode("Auto Load Comments"));

/* Stop Button */
var BUTTON1 = roots.appendChild(document.createElement("button"));
BUTTON1.className="stops yt-uix-button yt-uix-button-default";
BUTTON1.type="button";
BUTTON1.addEventListener('click', function () { stops(); }, false);
BUTTON1.appendChild(document.createTextNode("Stop"));

/* Toggle Comments Button */
var BUTTON2 = roots.appendChild(document.createElement("button"));
BUTTON2.className="toggle yt-uix-button yt-uix-button-default";
BUTTON2.type="button";
BUTTON2.addEventListener('click', function () { toggle(); }, false);
BUTTON2.appendChild(document.createTextNode("Toggle " + tnoc));

/* Add CSS */
var sheet = document.createElement('style');
sheet.innerHTML = ".loads {color:green; top:70%; left:2%; position:fixed; z-index:999 !important; } .stops {color:red; top:70%; left:13%; position:fixed; z-index:999 !important;} .toggle {color:blue; width:195px; top:65%; left:2%; position:fixed; z-index:999 !important; }";
document.body.appendChild(sheet);

/* Auto Load Function */
function loads() {
int = window.setInterval("document.getElementsByClassName('yt-uix-pager-button yt-uix-pager-show-more yt-uix-button yt-uix-button-default')[0].click();",  1500 );
}

/* Stop Auto Load Function */
function stops() {
window.clearInterval(int);
}

/* Toggle Comments Function */
function toggle() {
		if(GM_getValue('togglehide')){
			tog.style.display = "";
			togs.style.display = "";
			togt.style.display = "";
			GM_setValue('togglehide', false);
		}
		else{
			tog.style.display = "none";
			togs.style.display = "none";
			togt.style.display = "none";
			GM_setValue('togglehide', true);
		}	
 }