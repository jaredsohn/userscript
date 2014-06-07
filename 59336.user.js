// ==UserScript==
// @name           What.CD :: Add PM Link on Forums
// @namespace      idkwhattoputhere
// @include        http*://*what.cd/forums.php?action=viewthread*
// @include		   http*://*what.cd/forums.php?page=*&*viewthread*
// ==/UserScript==

// What.CD :: Add PM Link on Forums
//              By: Rain724
// 
// Last update: 10-13-09

// Do Not Edit Beyond This Point

var pmImage = "R0lGODlhDwANAMQRAB8fHxISEjw8PFdXV2FhYUpKSi0tLdLS0uDg4O3t7ff396ioqLW1tcPDwwgICGlpaQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA0AAAVEYCSOZGme5KOu7EMSkCLPCkSQQwIlPL8PpAICARkShwWS4MCEOJkHAcnQqFqtBhKAwe12AaTAYkwmB0iOtHrtQLnfpRAAOw==";
var idHolder = [];
var myID;
start();

function start()
{
	var links = getLinks();
	for (var i=0, link; link = links[i++]; )
	{
		if (matcher(link.href))
		{
			if (link.previousSibling != "[object XPCNativeWrapper [object Text]]")
			{
				var pmLink = makepmLink(link);
				link.parentNode.insertBefore(pmLink, link.nextSibling);
			}
		}
	}
}

function makepmLink(link) {
	var pmLinker  = document.createElement('a');
	pmLinker.href = link.href.replace("user.php?id=","inbox.php?action=compose&to=");
	pmLinker.innerHTML = " <img src='data:image/gif;base64,"+pmImage+"' />";
	return pmLinker;
}

function getLinks()
{
   var doc_links = document.links;
   var links = [];
   for (var i=0, link; link = doc_links[i++];) {
		if(link.href.match("action=edit"))
		{
			//alert("Match!");
			idHolder = link.href.split("=");
			//alert(idHolder[2]);
			myID = idHolder[2];
		}
		links.push(link);
   }
   return links;
}

function matcher(url) {
	if(url.match("user.php") && !url.match(myID) && !url.match("notify") && !url.match("invite") && !url.match("sessions"))
	{
		return 1;
	}
}