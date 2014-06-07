// ==UserScript==
// @name           BaseCamp ToDo Count
// @namespace      jamespgilbert
// @include        http://*.basecamphq.com/*
// ==/UserScript==

var gurl = window.location.href;
var uparts = gurl.split("/");
if(uparts.length > 4)
{
	gurl = "http://" + uparts[2] + "/" + uparts[3] + "/" + uparts[4] + "/todo_lists.xml";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: gurl,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(responseDetails.responseText, "application/xml");
			var completed = doc.getElementsByTagName("completed-count");
			var uncompleted = doc.getElementsByTagName("uncompleted-count");
			var done = doc.getElementsByTagName("complete");
			var total = 0;
			for(var i = 0; i < completed.length; i++)
			{
				//var c = parseInt(completed[i].textContent);
				var u = parseInt(uncompleted[i].textContent);
				var d = (done[i].textContent == "true");
				if(!d)
					total += u;
			}
			var tabset = document.getElementById("MainTabs")
			var tabs = tabset.getElementsByTagName("li");
			for(var tab in tabs)
			{
				if(tabs[tab].firstChild.innerHTML.substr(0,5) == "To-Do")
				{
					tabs[tab].firstChild.innerHTML = "To-Do (" + total + ")";
					break;
				}
			}
			
		}
	});
}