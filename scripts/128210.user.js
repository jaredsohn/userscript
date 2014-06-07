// ==UserScript==
// @name        Eve BulkGate
// @author 		ChrisWF
// @date 		2014
// @namespace   evewf
// @include     https://gate.eveonline.com/*
// @grant 		none
// ==/UserScript==

(function()
{
try {

if(!window.BulkGate)
   window.BulkGate = {};
   
window.BulkGate.addPilotEnemy = function(link) 
{ 
	$.ajax( { 
		type: "POST", 
		dataType: "json", 
		data: { "__RequestVerificationToken": postToken, "selectedStanding": "-10", "addToWatchlist": "true", "sendNotify": "false", "message": "", "approvedCost": "0" }, 
		url: link + "/AddContact", 
		success: function (b) { window.location.reload() }, 
		error: function (a, b, c) { window.location.reload() }
	}); 
};

window.BulkGate.addPilotFriend = function(link) 
{ 
	$.ajax( { 
		type: "POST", 
		dataType: "json", 
		data: { "__RequestVerificationToken": postToken, "selectedStanding": "10", "addToWatchlist": "true", "sendNotify": "false", "message": "", "approvedCost": "0" }, 
		url: link + "/AddContact", 
		success: function (b) { window.location.reload() }, 
		error: function (a, b, c) { window.location.reload() }
	}); 
};

window.BulkGate.deletePilot = function(link) 
{ 
	$.ajax( { 
		type: "DELETE", 
		dataType: "json", 
		data: { "__RequestVerificationToken": postToken }, 
		url: link + "/DeleteContact", 
		success: function (b) { window.location.reload() }, 
		error: function (a, b, c) { window.location.reload() } 
	}); 
};

function run()
{
	var href;
	var allLinks = document.getElementsByTagName("a")
	var allProfileLinks = new Array();	
	for(var i = 0; i < allLinks.length; i++)
	{
		href = allLinks[i].getAttribute("href");
		if(href != null && href.indexOf("/Profile/") > -1 && href.indexOf("?tab") <= 0)
		{
			allProfileLinks.push(allLinks[i]);
		}
	}
	for(var i = 0; i < allProfileLinks.length; i++)
	{
		href = allProfileLinks[i].getAttribute("href");
		allProfileLinks[i].insertAdjacentHTML( "afterEnd", "<a href=\"javascript:BulkGate.deletePilot('" + href + "')\">[X]</a> " );
		allProfileLinks[i].insertAdjacentHTML( "afterEnd", "<a href=\"javascript:BulkGate.addPilotEnemy('" + href + "')\">[-10]</a> " );
		allProfileLinks[i].insertAdjacentHTML( "afterEnd", "<a href=\"javascript:BulkGate.addPilotFriend('" + href + "')\">[+10]</a> " );
	}
};

setTimeout(run(), 200);

} catch (eErr) {
alert ("Greasemonkey error: " + eErr);
}

return;
}
) (); 