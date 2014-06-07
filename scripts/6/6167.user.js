// ==UserScript==
// @name          GoogleBoard
// @author	  Erik Goldman
// @namespace     ErikGoldman
// @description   Makes google result pages keyboard-navigable with j/k for up and down, and q/p for next and previous pages
// @include       http://www.google.com/search?*
// ==/UserScript==

var ixLink=-1;
var oOldLink=null;

var rgParagraphs = document.getElementsByTagName("p");

var rgoLinks=new Array();

var oNext;
var oPrev;
if(oNext = document.getElementById("nn"))
	oNext=oNext.parentNode;

if(oPrev = document.getElementById("np"))
	oPrev=oPrev.parentNode;

for(var i=0; i< rgParagraphs.length; ++i)
{
	var para = rgParagraphs[i];
	for(var j=0; j < para.childNodes.length; ++j)
	{
		if(para.childNodes[j].href)
		{
			rgoLinks.push(para.childNodes[j]);
		}
	}
}

function decorate(oLink)
{
	if(!oLink)
		return;

	oLink.focus();
	oLink.style.backgroundColor="#FF0000";
	if(oOldLink && oOldLink != oLink)
		oOldLink.style.backgroundColor="#FFFFFF";
	oOldLink = oLink;
}

document.addEventListener('keypress', 
	function(e){
		var keyNum;

		if(window.event) // IE
		{
			keyNum = e.keyCode;
		}
		else if(e.which)
		{
			keyNum = e.which;
		}

		var keyChar = String.fromCharCode(keyNum);

		if(keyChar == 'j')
		{
			if(ixLink < rgoLinks.length-1)
			{
				ixLink++;
			}
			decorate(rgoLinks[ixLink]);
		}
		else if(keyChar == 'k')
		{
			if(ixLink > 0)
			{
				ixLink--;
			}
			decorate(rgoLinks[ixLink]);
		}
		else if(keyChar == "p")
		{
			decorate(oNext);
		}
		else if(keyChar == "q")
		{
			decorate(oPrev);
		}

	}, true);
