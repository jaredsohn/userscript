// ==UserScript==
// @name           emocore - visit
// @namespace      emocore.se
// @include        http://www.emocore.se/?*sida=gb
// ==/UserScript==

// ==UserScript==
// @name           helgon - Massvisit
// @namespace      helgon.net
// @include        http://www.helgon.net/Start.aspx
// ==/UserScript==

var xp_profilelink = ""
var xp_menu = "//TD[@nowrap]";
var self = "";
var lastvisited = "";
var expires_in_millisecs = 1000*60*60*24;
visitcache = eval(GM_getValue("emocore_visitcache")) || {};

function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root)
{
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}

function get(url, cb)
{
  GM_xmlhttpRequest({
	method: "GET",
	url:url,
    onload:function(xhr){ cb(xhr.responseText ); }
  });
}

function checkSelf()
{
	with_each(xp_menu, function(menu) {
		try{
			if (menu.firstChild.nextSibling.firstChild.nodeValue == "Inloggad som:")
			{
				self = menu.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nodeValue;
			}
		}catch(e){};
	});
}

function massVisit()
{
	loc = location.href;
	timeout = 0;
	lastvisit = 0;
	with_each(xp_profilelink, function(link) {
		try{
			var temp = link.nextSibling.nodeValue;
			link.sex = temp.substring(temp.indexOf(" - ")+3,temp.indexOf(","));
			link.id = link.href.substr(link.href.indexOf("emocore.se/")+11);
		}catch(e){};
		if (link.sex == "Tjej" && lastvisited != link.id)
		{
			lastvisited = link.id;
			if (!(typeof(visitcache[link.id]) == "number" && (visitcache[link.id] + expires_in_millisecs) > (new Date).getTime()))
			{
				visitcache[link.id] = (new Date).getTime();
				GM_xmlhttpRequest({method: "GET",url:link.href});
			}
		}
	});
	GM_setValue("emocore_visitcache",visitcache.toSource());
}
checkSelf();
xp_profilelink = "//A[@class='title_smal_a' and not(contains(@href,'"+self+"'))]";
massVisit();
