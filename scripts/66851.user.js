// ==UserScript==
// @name           TehConnection:: Add Ratio History URL to forums
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu/forums.php?action=viewthread*
// @include        http*://*tehconnection.eu/forums.php?page=*&*viewthread*
// ==/UserScript==

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
				var staturlLink = makestaturlLink(link);
				link.parentNode.insertBefore(staturlLink, link.nextSibling);
			}
		}
	}
}

function makestaturlLink(link) {
	var staturlLinker  = document.createElement('a');

	staturlLinker.href = link.href.replace("tehconnection.eu/user.php?id=","gladosdan.com/tc/stats/index.php?act=stats&user=");
	staturlLinker.innerHTML = " <img src='http://gladosdan.com/tc/stats/stats.png' />";
	return staturlLinker;
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
	if(url.match("user.php") && !url.match("notify") && !url.match("invite") && !url.match("sessions"))
	{
		return 1;
	}
}