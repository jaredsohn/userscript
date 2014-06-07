// ==UserScript==
// @name Dramalinks Ticker
// @description Displays a groovy little ticker for dramalinks on the topic list. Updated for new template.  Created by citizenray.  Updated by shoecream.  Modified by Psyduck.
// @include http://boards.endoftheinter.net/topics/LUE*
// ==/UserScript==

function nextRealSibling(node)
{
	var cnode=node.nextSibling;
	while (cnode.nodeName=="#text")
	{
		cnode=cnode.nextSibling;
	}
	return cnode;
}

prefix = parent.location.protocol;
var ticker=document.createElement("center");
var update=document.createElement("center");
ticker.innerHTML="Dramalinks loading...";
ticker.id="dramalinks_ticker";
update.innerHTML="";
update.id="dramalinks_update";
var divs=document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++)
{
	if (divs[i].className=="userbar")
	{
		divs[i].parentNode.insertBefore(ticker,divs[i]);
		divs[i].parentNode.insertBefore(update,divs[i]);
		break;
	}
}

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://dramalinks.beginningoftheinter.net/version.txt',
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Dramalinks Script Updater',
	},
	onload: function(response) {
		var newver=response.responseText;
		var up="";
		var version=3287.6;
		if (newver>version)
		{
		up="<br/>Dramalinks ticker update available: <a href='http://dramalinks.beginningoftheinter.net/dramalinksticker_psyduck_bg.user.js'>Download</a><br/>Afterwards, check to see if the old version was overwritten.  If it wasn't, uninstall it.";
		}
		document.getElementById("dramalinks_update").innerHTML=up;
	}
});

GM_xmlhttpRequest({
	method: 'GET',
	url: prefix + '//wiki.endoftheinter.net/index.php?title=Dramalinks/current&action=raw&section=0&maxage=300',
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Dramalinks Script',
	},
	onload: function(responseDetails) {
		var t=responseDetails.responseText;
		t=t.replace(/\*/,"");
		t=t.replace(/\[\[(.+?)(\|(.+?))\]\]/g,"<a href=\"" + prefix + "//wiki.endoftheinter.net/index.php/$1\">$3</a>");
		t=t.replace(/\[\[(.+?)\]\]/g,"<a href=\"" + prefix + "//wiki.endoftheinter.net/index.php/$1\">$1</a>");
		t=t.replace(/\[(.+?)\]/g,"<a href=\"$1\" style=\"padding-left: 0px\"><img src=\"" + prefix + "//wiki.endoftheinter.net/skins/monobook/external.png\"></a>");
		t=t.replace(/href="\/index\.php/g,"href=\"" + prefix + "//wiki.endoftheinter.net/index.php");
		t=t.replace(/http:/gi,prefix);
		t=t.replace(/style=/gi,"");
		t=t.replace(/<script/gi,"<i");
		t=t.replace(/(on)([A-Za-z]*)(=)/gi,"");
		t=t.slice(t.indexOf("<!--- NEW STORIES GO HERE --->")+29);
		var dramas=t.slice(0,t.indexOf("<!--- NEW STORIES END HERE --->"));
		t=t.slice(t.indexOf("<!--- CHANGE DRAMALINKS COLOR CODE HERE --->"));
		t=t.slice(t.indexOf("{{")+2);
		var bgcol=t.slice(0,t.indexOf("}}"));
		var col;
		var kermit=false;
		switch (bgcol)
		{
			case "kermit":
			document.getElementById("dramalinks_ticker").style.border="2px solid #990099";
			bgcol="black";
			kermit=true;
			case "black":
			case "blue":
			case "green":
			col="white";
			break;
			default:
			col="black";
			break;
		}
		if (kermit==false)
		{
		dramas="<div style='background-color: "+bgcol+"; color: "+col+";'>" + dramas.slice(2).replace(/\*/g,"<br/>")+"</div>";
		}

		if (kermit==true)
		{
		dramas="<div style='background-color: "+bgcol+"; color: "+col+";'>" + dramas.slice(2).replace(/\*/g,"<br/>")+"</div>";
		}

//		document.getElementById("dramalinks_ticker").style.backgroundColor=bgcol;
//		document.getElementById("dramalinks_ticker").style.color=col;
		document.getElementById("dramalinks_ticker").innerHTML=dramas;
	}
});