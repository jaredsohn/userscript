// ==UserScript==
// @name           AboutUs, MyWikiBiz, BluWiki rollback Page History
// @namespace      urn:rotemliss:greasemonkey:scripts:wikirollbackpagehistory
// @description    Enable rolling back automatically in the Page History page of MediaWiki-based wikis.
// @include        http://www.aboutus.org/index.php?title=*&action=history
// @include        http://www.mywikibiz.com/index.php?title=*&action=history
// @include        http://bluwiki.com/index.php?title=*&action=history
// ==/UserScript==

(function()
{
	//Query String Handling
	function queryString(URL)
	{
		this.get = function(variable)
		{
			return (data[variable]) ? data[variable] : null;
		};
		this.length = function()
		{
			return length;
		}
		var data = [];
		var length = 0;
		URL = "" + URL;
		
		if (URL.indexOf("?") > -1)
		{
			var queryStringData = URL.split("?")[1].split("&");
			if (queryStringData.indexOf("#") > -1)
			{
				queryStringData = queryStringData.split("#")[0];
			}
			for (i = 1; (i <= queryStringData.length); i++)
			{
				length++;
				data[queryStringData[i - 1].split("=")[0]] =
				 unescape(queryStringData[i - 1].split("=")[1]);
			}
		}
	}
	var currQueryString = new queryString(location.href);
	var referrerQueryString;
	if (document.referrer)
	{
		referrerQueryString = new queryString(document.referrer);
	}
	
	var rollBackButton;
	var historyItem;
	var i;
	for (i = 1; (i <= document.getElementById("pagehistory").childNodes.length); i++)
	{
		historyItem = document.getElementById("pagehistory").childNodes[i - 1];
		var previousHistoryItem = historyItem;
		do
		{
			previousHistoryItem = previousHistoryItem.nextSibling;
		}
		while (previousHistoryItem && (previousHistoryItem.nodeName.toLowerCase() != "li") &&
		 (previousHistoryItem.nextSibling));
		if ((historyItem.nodeName.toLowerCase() == "li") && previousHistoryItem &&
		 (previousHistoryItem.nodeName.toLowerCase() == "li"))
		{
			historyItem.appendChild(document.createTextNode(" "));
			
			rollBackButton = document.createElement("a");
			rollBackButton.href = "javascript:void(0);";
			rollBackButton.appendChild(document.createTextNode("[rollback]"));
			rollBackButton.style.fontWeight = "bold";
			if (document.all)
			{
				rollBackButton.attachEvent("onclick", rollBack);
			}
			else
			{
				rollBackButton.addEventListener("click", rollBack, true);
			}
			historyItem.appendChild(rollBackButton);
		}
	}
	
	function rollBack(e)
	{
		e = (e) ? e : event;
		
		var currentHistoryItem;
		if (document.all)
		{
			currentHistoryItem = e.srcElement;
		}
		else
		{
			currentHistoryItem = e.target;
		}
		currentHistoryItem = currentHistoryItem.parentNode;
		
		var previousHistoryItem = currentHistoryItem;
		do
		{
			previousHistoryItem = previousHistoryItem.nextSibling;
		}
		while (previousHistoryItem && (previousHistoryItem.nodeName.toLowerCase() != "li") &&
		 (previousHistoryItem.nextSibling));
		
		var currentEditor;
		for (i = 1; ((!currentEditor) && (i <= currentHistoryItem.childNodes.length)); i++)
		{
			if (currentHistoryItem.childNodes[i - 1].className == "history-user")
			{
				currentEditor = currentHistoryItem.childNodes[i - 1].firstChild.firstChild.nodeValue;
			}
		}
		var previousEditor;
		for (i = 1; ((!previousEditor) && (i <= previousHistoryItem.childNodes.length)); i++)
		{
			if (previousHistoryItem.childNodes[i - 1].className == "history-user")
			{
				previousEditor = previousHistoryItem.childNodes[i - 1].firstChild.firstChild.nodeValue;
			}
		}
		
		var previousOldID;
		for (i = 1; ((!previousOldID) && (i <= previousHistoryItem.childNodes.length)); i++)
		{
			if (previousHistoryItem.childNodes[i - 1].name == "oldid")
			{
				previousOldID = previousHistoryItem.childNodes[i - 1].value;
			}
		}
		
		var summary;
		summary = "Reverted edits by [[Special:Contributions/" + currentEditor + "|" +
		 currentEditor + "]] ([[User talk:" + currentEditor + "|Talk]]) to last version " +
		 "by [[User:" + previousEditor + "|" + previousEditor + "]]";
		summary = prompt("Summary:", summary)
		if (summary == null)
		{
			return;
		}
		
		var editWindow = window.open("/index.php?title=" + escape(currQueryString.get("title")) +
		 "&action=edit&oldid=" + escape(previousOldID));
		var editWindowInterval = setInterval(function()
		{
			if ((!editWindow.document) || (!editWindow.document.body) ||
			 (editWindow.document.body.innerHTML == "") ||
			 (!editWindow.document.getElementById("editform")) ||
			 (!editWindow.document.getElementById("disclaimer")))
			{
				return;
			}
			clearInterval(editWindowInterval);
			
			editWindow.document.getElementById("wpSummary").value = summary;
			if (editWindow.document.getElementById("wpMinoredit"))
			{
				editWindow.document.getElementById("wpMinoredit").checked = true;
			}
			editWindow.document.getElementById("wpSave").click();
			
			var editWindowSubmitInterval = setInterval(function()
			{
				if ((!editWindow.document) || (!editWindow.document.body) ||
				 (editWindow.document.body.innerHTML == "") ||
				 (editWindow.document.getElementById("editform")) ||
				 (!editWindow.document.getElementById("disclaimer")))
				{
					return;
				}
				clearInterval(editWindowSubmitInterval);
				
				editWindow.close();
				location.reload();
			}, 100);
		}, 100);
	}
})();