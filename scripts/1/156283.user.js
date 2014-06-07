// ==UserScript==
// @name           Explain XKCD
// @description    Adds explainxkcd.com link on xkcd 
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @grant		   none
// @include        /^https?:\/\/(www\.)?xkcd\.com\/(\d*\/)?$/
// @updateURL      https://userscripts.org/scripts/source/156283.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156283.user.js
// @version        2.1
// ==/UserScript==

function main() {
	titleDiv = document.getElementById('ctitle');
	var comicName = titleDiv.innerHTML;
	titleDiv.innerHTML = "";
	var origTitle = document.createElement("span");
		origTitle.innerHTML = comicName;
	titleDiv.appendChild(origTitle);
	var linkTitle = document.createElement("a");
		linkTitle.innerHTML = "(ExplainXKCD)";
		linkTitle.style.display = "none";
		linkTitle.href = "http://www.explainxkcd.com/wiki/index.php?title=" + getComicNumber();		
	titleDiv.appendChild(linkTitle);
	
	origTitle.onmouseover = function(){changeVisibility(this, linkTitle);}
	origTitle.onmouseclick = function(){changeVisibility(this, linkTitle);}
	linkTitle.onmouseover = function(){changeVisibility(origTitle, this);}
	origTitle.onmouseout = function(){changeVisibility(linkTitle, this);}
	linkTitle.onmouseout = function(){changeVisibility(this, origTitle);}
}

function getComicNumber(){
	nmbr = document.getElementById('middleContainer');
	start = nmbr.innerHTML.indexOf("Permanent link to this comic: http://xkcd.com/")+46;
	end = nmbr.innerHTML.indexOf("Image URL (for hotlinking/embedding)")-6;
	return nmbr.innerHTML.slice(start, end);
}

function changeVisibility(hideElem, showElem) {
	hideElem.style.display = "none";
	showElem.style.display = "inline"
}

main();