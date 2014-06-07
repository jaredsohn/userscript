// ==UserScript==
// @name          Handy ExHentai
// @namespace     handyexhentai
// @version       2013.11.10
// @description   Handy ExHentai.org
// @match         http://exhentai.org/s/*
// @match         http://g.e-hentai.org/s/*
// @run-at        document-end
// @grant         none
// @noframes
// ==/UserScript==

function $(id) {return document.getElementById(id);} // for StupidFox

// hide top panel
$("i1").firstElementChild.style.display = "none";
$("i2").style.display = "none";

// hide scrollbar
document.body.style.overflow = "hidden";
function onkeydownP(b) 
{
	switch (b.keyCode) 
	{
	case KeyEvent.DOM_VK_UP:
		window.scrollBy(0, -50);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_DOWN:
		window.scrollBy(0, 50);
		cancelEvent(b);
		break;
	case 112: // KeyEvent.DOM_VK_F1
		if(!document.webkitFullscreenElement && !document.mozFullScreenElement)
		{
			var el = document.documentElement;
			var rfs = el.webkitRequestFullScreen || el.mozRequestFullScreen;
			rfs.call(el);
		}
		else
		{
			if (document.webkitCancelFullScreen) 
			{
				document.webkitCancelFullScreen();
			}
			else if (document.mozCancelFullScreen) 
			{
				document.mozCancelFullScreen();
			}
		}
		cancelEvent(b);
		break;
    }
}
window.addEventListener("keydown", onkeydownP, true);
if(navigator.userAgent.indexOf('Firefox') != -1) // firefox disables mouse wheel scroll if scrollbar is invisible, let's fix this
{
	function onWheel(e) 
	{
		window.scrollBy(0, e.detail*2);
	}
	document.addEventListener ("MozMousePixelScroll", onWheel, false);
}

// auto detect failed images
var DT;
function ad()
{
	if(DT){clearTimeout(DT);}
	DT = setTimeout(function() { if($("img").naturalWidth == 0){$("i6").lastChild.previousSibling.click();}DT=0; }, 2000);
}
ad();

// preload 1 next page
function makeframe()
{
	if(typeof pff === 'undefined')
	{
		var iframe; 
		iframe = document.createElement('iframe');
		iframe.id = "pff";
		iframe.style.display = "none";
		document.body.appendChild(iframe);
	}
	if(history.length != 1) // no preload right after direct page open from gallery with CTRL
	{
		if(parseInt(img.parentNode.href.split("-").pop()) > parseInt(pff.location.href.split("-").pop()) || !pff.location.hostname) // not: reached last page || going backwards
		{
			if(typeof pff.img === 'undefined' || pff.img.complete || !pff.img.naturalWidth) // image loaded or not started loading
			{
				pff.location.href = img.parentNode.href;
			}
			else
			{
				setTimeout(function() { makeframe(); }, 555);
			}
		}
	}
}
delete history.replaceState;
history.EXreplaceState = history.replaceState;
history.replaceState = function (a,b,c) 
{
	history.EXreplaceState(a,b,c);
	setTimeout(function() { makeframe(); }, 222);
	ad();
}
