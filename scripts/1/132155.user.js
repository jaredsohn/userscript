// ==UserScript==
// @name Ikariam First Last Messages Navigator (ITA)
// @version 2.3
// @namespace FirstLastMsg
// @description Adds two links, "Start" (start) and "End", to diplomacy messages navigator bar
// @include http://s*.ikariam.*/index.php*
// @include s*.ikariam.*/index.php*
// @require http://yui.yahooapis.com/combo?2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js&2.8.0r4/build/logger/logger-min.js&2.8.0r4/build/yuitest/yuitest-min.js
// @history 1.0 initial release
// @history 2.0 updated for Ikariam 0.5.0
// @history 2.1 fixed refresh detection bugs
// @history 2.2 using MutationObservers; all translated to English
// @history 2.3 updated for Ikariam 0.5.9
// ==/UserScript==

// update part 
var scriptName = "Ikariam First Last Messages Navigator (ITA)"
var scriptID = 63350;
var thisVersion = "2.3";
var update = "system" // change this if minor updates should be notified


//-----------------------------------------------------------------------------
var translatedStringsMap_ALL = {
	"org": {
		"firstMsg"	: "First",
		"lastMsg"	: "Last"
	},
	"es": {
		"firstMsg"	: "Principio",
		"lastMsg"	: "Fin"
	},
	"it": {
		"firstMsg"	: "Inizio",
		"lastMsg"	: "Fine"
	},
	"fr": {
		"firstMsg"	: "Premier",
		"lastMsg"	: "Dernier"
	},
	"de": {
		"firstMsg"	: "Start",
		"lastMsg"	: "Ende"
	}
};

var diploVisible = false;
var server = document.domain;
var parts = server.split(".");
var translatedStringsMap = translatedStringsMap_ALL[parts[parts.length-1]];
if (typeof(translatedStringsMap) == "undefined")
{
    var lang = parts[0].split("-")[1];
	translatedStringsMap = translatedStringsMap_ALL[lang]; // for sn,lang.ikariam.com
	if (typeof(translatedStringsMap) == "undefined")
		translatedStringsMap = translatedStringsMap_ALL["org"];
}

function integerDivide(numerator, denominator)
{
	//remainder subtraction makes the division exact
	var remainder = numerator % denominator;
    return ( numerator - remainder ) / denominator;
}

function addButtonsToNavBar(numMessages)
{
	//http://s3.it.ikariam.com/index.php?view=diplomacyAdvisor&start=X
	//X = 0 => goes to FIRST message
	//For going to LAST, use Y, where
	//if numMessages % 10 = 0 => Y = X - 10
	//else Y = numMessages \ 10 * 10 (es. 23 => 2 => 20; 45 => 4 => 40 ecc.)
	
	//1. find the "a" element with href="javascript:markAll('all');"
	//2. go to parent element (block containing links "Tutto | Leggi | Non letto | Nessuno" ("All", "Read", "Not read", "None")
	//3. append new links
	
	var baseUrl = String(window.location).split('?')[0];
	var goToFirstUrl = baseUrl + "?view=diplomacyAdvisor&start=0";
	
	var lastMsg = 0;
	if(numMessages % 10 == 0)
		lastMsg = numMessages - 10;
	else
		lastMsg = integerDivide(numMessages, 10) * 10;
	
	var goToLastUrl  = baseUrl + "?view=diplomacyAdvisor&start=" + lastMsg;
	
	var nodeList = document.evaluate("//a[@href=\"javascript:markAll('none', 'deleteMessages');\"]", document, null, XPathResult.ANY_TYPE, null);
	
	var nodeItem = nodeList.iterateNext();
	
	var msgMngButtons = nodeItem.parentNode;
	
	var newMarkupGoToFirst = " | <a id=\"goToFirstMessage\" href=\"" + goToFirstUrl + "\">" + translatedStringsMap["firstMsg"] + "</a>";
    var newMarkupGoToLast = " | <a id=\"goToLastMessage\" href=\"" + goToLastUrl + "\">" + translatedStringsMap["lastMsg"] + "</a>";
	if(msgMngButtons.innerHTML.indexOf("\"goToFirstMessage\"") == -1)
	{
    	msgMngButtons.innerHTML += newMarkupGoToFirst;
    }
    if(msgMngButtons.innerHTML.indexOf("\"goToLastMessage\"") == -1)
	{
    	msgMngButtons.innerHTML += newMarkupGoToLast;
    }
}

function checkMessagesAndAddLinks()
{
	var diploAdv = document.getElementById("tab_diplomacyAdvisor");

	
	var msgNumLabel = diploAdv.children[0].children[1].children[0].children[0].children[0].children[0].children[1];
	if(msgNumLabel != null)
	{
		var itemText = msgNumLabel.innerHTML;
		var strNumMessages = itemText.replace(/^.*\(/, "").replace(/\).*$/, "");
		var numMessages = parseInt(strNumMessages);
				
		if(numMessages > 10)
		{
			addButtonsToNavBar(numMessages);
		}
	}
}

/*function log(message)
{
	GM_log(message);
	console.log(message);
}*/

var linksPresent = false;


//The "added node" event for diplomacyAdvisor fires twice: when it's added to its parent, and when its parent is added to "container" div
//Links will be added when SECOND event fires
function handleMutations(mutations)
{
    var diploNode = null;
	mutations.forEach(function(mutation)
	{        		
		if(mutation.addedNodes != null)
		{
			for(var i = 0; i < mutation.addedNodes.length; i++)
			{
				var node = mutation.addedNodes[i];
				if(node.id != null && node.id.length > 0)
				{
					if(node.id == "diplomacyAdvisor_c" && mutation.target.id == "container")
					{
						//detected creation of diplomacyAdvisor window
						diploVisible = true;
					}
				}
			}
		}
		if(mutation.removedNodes != null)
		{
			for(var i = 0; i < mutation.removedNodes.length; i++)
			{
				var node = mutation.removedNodes[i];
				if(node.id != null && node.id.length > 0)
				{
				    if(node.id == "diplomacyAdvisor_c" && mutation.target.id == "container")
					{
    					log("handleMutations removedNode diplo");
					    diploVisible = false;
					}
				}
		    }
		}

		if(diploVisible == true)
		{
    		checkMessagesAndAddLinks();
    	}
		
	});
}


function mainFunc()
{
    var target = document.querySelector("#container");
    var observer = new MutationObserver(handleMutations);
    var config = { childList: true, subtree: true };
    observer.observe(target, config);
}

//Program starting point
mainFunc();
