// ==UserScript==
// @name           Unread GMail Labels
// @namespace      http://vijaydev.wordpress.com
// @description    In GMail, display only labels with at least one unread mail
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

if(document.location != top.location) 
	return;

var timeoutID = null;
var debugMode = false;

function consoleLog(message)
{
	if(debugMode)
		console.info(message);
}
/*
Uses GmailGreasemonkey10API - http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API
*/
function loadGmonkey()
{ 
    var gmailapi = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey 
                    || (frames.js ? frames.js.gmonkey : null);
	
    if (gmailapi == null) 
	{
		consoleLog("Re-try after a second");
		setTimeout(arguments.callee, 1000);
        return;
    } 
	else 
	{
		gmailapi.load("1.0", handler);
		consoleLog(gmailapi);
    }
}

function handler(g) 
{
    g.registerViewChangeCallback(init);
	
	var labelElement = g.getNavPaneElement();	
	labelElement.addEventListener("DOMNodeInserted",re_modify, false);	
	
	var labelhrefs = labelElement.getElementsByTagName("a");
	for (var i = 0, n = labelhrefs.length; i < n; i++)
	{		
		var L = labelhrefs[i];
		var tblRow = L.parentNode.parentNode.parentNode.parentNode;
		if(tblRow.nodeName == "TR") // This check passes only for user defined labels since system labels are not inside a table. 
		{
			var unreadMails = L.textContent.match(/ \([1-9][0-9]*\)$/);
			tblRow.style.display = unreadMails ? "table-row" : "none";			
		}
	}
}

function init() 
{
	loadGmonkey();
}

function re_modify() 
{
    if(typeof timeoutID == "number") 
	{
		window.clearTimeout(timeoutID);
		timeoutID = null;
    }
    timeoutID = window.setTimeout(init, 2000);
}

init();
