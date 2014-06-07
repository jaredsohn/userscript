// ==UserScript==
// @name           Press key for next Village
// @namespace      Ninos
// @description    
// @include		http://de*.die-staemme.de/*
// @include		http://ch*.staemme.ch/*
// @exclude		http://ae*.tribalwars.ae/*screen=memo*
// @exclude		http://de*.die-staemme.de/*screen=mail*mode=view*
// @exclude		http://de*.die-staemme.de/*screen=ally*mode=forum*
// @exclude		http://de*.die-staemme.de/forum.php*
// @exclude		http://ch*.staemme.ch/*screen=memo*
// @exclude		http://ch*.staemme.ch/*screen=mail*mode=view*
// @exclude		http://ch*.staemme.ch/*screen=ally*mode=forum*
// @exclude		http://ch*.staemme.ch/forum.php*
// ==/UserScript==

String.prototype.trim = function() {return this.replace(/^s+|s+$/g, "");};
document.addEventListener('keyup', aKeyWasPressed, false);

function getGameDoc()
{
    getdoc = window.document;
    
    if(!getdoc.URL.match('game\.php'))
	{
        for(var i=0; i<window.frames.length; i++)
		{
            if(window.frames[i].document.URL.match('game\.php'))
			{
                getdoc = window.frames[i].document;
            }
        }
    }
    return getdoc;
}

// handler
function aKeyWasPressed(e)
{
    var key = e.keyCode;
    var thechar = String.fromCharCode(key);
		switch (thechar)
		{    
			case "z":
				getElementByClass('village_switch_link', 'left');
				break;
			case "x":
				getElementByClass('village_switch_link', 'right');
				break;
		}
}

var allHTMLTags = new Array();
var link = new Array();
function getElementByClass(theClass,keynextvillage)
{
	var allHTMLTags = document.getElementsByTagName("*");
	for (i=a=0; i<allHTMLTags.length; i++)
	{
		if (allHTMLTags[i].className==theClass)
		{
			link[a] = allHTMLTags[i].href;
			a++
		}
	}
	if (keynextvillage == "left" && typeof(link[0]) != "undefined")
		{
			window.document.location = link[0];
		}
	else if (keynextvillage == "right" && typeof(link[1]) != "undefined")
		{
			window.document.location = link[1];
		}
}