// ==UserScript==
// @name          Wide ExHentai
// @namespace     wideexhentai
// @version       2014.01.03
// @description   Wide ExHentai.org - support for wide 1920px monitors
// @match         http://exhentai.org/*
// @match         http://g.e-hentai.org/*
// @exclude       http://g.e-hentai.org/s/*
// @exclude       http://exhentai.org/s/*
// @run-at        document-end
// @grant         unsafeWindow
// @noframes
// ==/UserScript==

function $(id) {return document.getElementById(id);}
function c(id) {return document.getElementsByClassName(id);}

if(window.location.pathname.indexOf("/g/") != 0)
{
	var im = c("id1");
	if(im.length != 0)
	{
		var style = document.createElement("style");
		style.textContent = "a:visited {color: Thistle;} div.id2 {padding: 3px 0px;}div.itg{max-width:1856px;}div.ido{max-width:1875px;}"
		document.head.appendChild(style);
		
		function setVCenter(img)
		{
			if(img.naturalHeight != 0)
			{
				img.style.marginTop = (290-img.naturalHeight)/2 + "px";
			}
			else
			{
				setTimeout(function() {setVCenter(img)}, 100);
			}
		}
		
		setTimeout(function() {
		for(var i=0; i< im.length; i++)
		{
			im[i].style.height = "345px";
			im[i].style.width = "225px";
			im[i].lastChild.previousSibling.style.height = "290px";
			setVCenter(im[i].lastChild.previousSibling.firstChild.firstChild);
		}
		}, 0);
	}
}
else // /g/
{
	c("ptt")[0].style.margin = "45px auto 2px";
	if(c("gdtl").length != 0) // large thumbs hathperk
	{
		$("gdt").style.maxWidth = "1890px";
		var im = c("gdtl");
		for(var i=0; i< im.length; i++)
		{
			im[i].style.width = "234px";  // make place for one more thumb
		}
	}
	else
	{
		$("gdt").style.maxWidth = "1681px";
	}
	
	// open torrents&archiver in new tab instead of little window
	if (typeof unsafeWindow === "undefined"){unsafeWindow = window;}
	delete unsafeWindow.window.open;
	unsafeWindow.window.EXopen = unsafeWindow.window.open; // FireFox may suck here
	unsafeWindow.window.__proto__.open= function (a,b,c)
	{
		unsafeWindow.window.EXopen(a,b);
		//console.warn("opening new window: a( " + a + " ) | b( " + b + " )| c( " + c + " ) ");
	}
}
