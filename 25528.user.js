// ==UserScript==
// @name           BetterEzone
// @namespace      ca.ivey.ezone
// @description    Updates to Ivey's ezone tool
// @include        *ivey.ca/ezone/*
// @include        *ivey.uwo.ca/ezone/*
// ==/UserScript==

function removeOngoingEntries(start)
{
	start = start || 0;
	var nodes = document.evaluate(
	   "//td[(@class='GridHeader' or @class='GridLabel') and starts-with(text(), 'ongoing since')]",
	   document,
	   null,
	   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	   null);
	for (var i = start; i < nodes.snapshotLength; i++)
	{
		var tdNode = nodes.snapshotItem(i);
		var trNode = tdNode.parentNode;
		trNode.parentNode.removeChild(trNode);
	}
}

var url = "" + (window.location || "");

// Calendar Pretty Print
if (url.indexOf("SessionTimeout2.asp") > 0)
{
	window.location="http://www.ivey.ca/ezone";
}
//fix some glaring problems with the menu - specifically the calendar link
else if (url.indexOf("newdesign/menu.asp") > 0)
{
	var aTags = document.getElementsByTagName("a");

	for (var i=0; i < aTags.length; i++)
	{
		var href = aTags[i].href;
		var today = new Date();
		if (href && href.indexOf("IveyCalendarDisplay.asp") > 0)
		{
			href = href.replace(/\d+\/\d+\/\d+/, (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear());
			href = href.replace(/view=\d+/i, "View=3");
			aTags[i].href = href;
			break;
		}
	}
}
// remove the annoying ongoing entries on each entry
else if (url.indexOf("Applets/IveyCalendar/IveyCalendarDisplay.asp") > 0)
{
	removeOngoingEntries(1);
}

// make the print view of the ivey calendar printable (and usable)
else if (url.indexOf("Applets/IveyCalendar/IveyCalendarPrinter.asp") > 0)
{
	var nodes = document.evaluate(
	   "//td[h2][1]|//table[@ID='AutoNumber1']/descendant::tr/td[2]/center/table[2]/descendant::tr/td[table]",
	   document,
	   null,
	   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	   null);

	var newHtml = "";   
	for (var i = 0; i < Math.min(2,nodes.snapshotLength); i++)
		newHtml += nodes.snapshotItem(i).innerHTML;

	document.body.innerHTML = newHtml;
	removeOngoingEntries(0);	
}
//todo: integrate courses & communities submenu

// else if (url.indexOf("Applets/GroupHomePage/GroupHomePage.asp") > 0)
// {
// 	var tables = document.getElementsByTagName("table");
// 	alert(tables[tables.length-1].innerHTML);
// 	tables[tables.length-1].parentNode.removeChild(tables[tables.length-1]);
// 	
// 	var anchors = document.getElementsByTagName("a");
// 	var menuhref;
// 	for (var i = 0; i < anchors.length; i++)
// 	{
// 		var a = anchors[i];
// 		if (a.href.indexOf("menu.asp"))
// 		{
// 			menuhref = a.href;
// 			break;
// 		}
// 	}
// 	if (!menuhref) return;
// 	GM_xmlhttpRequest({
//     	method: 'GET',
//     	url: menuhref,
// 		headers: {'Referer': "" + window.location, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
//       	onload: function (responseDetails)
//       	{
//         	if (responseDetails.status == 200)
// 			{
// 				var match = responseDetails.responseText.match(/<body[^>]+>([^]+)<\/body/i);
// 				if (match && match.length > 1)
// 				{
// 					document.body.innerHTML += match[1].replace(/\.\.\//g, "../../").replace(/menu.asp/g, "../../newdesign/menu.asp");
// 				}
// 			}
// 		}
// 	});
// }
