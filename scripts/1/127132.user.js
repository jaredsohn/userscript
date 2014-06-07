// ==UserScript==
// @name           TPB .Torrent Link
// @namespace      cobalt
// @description    adds a .torrent link (they removed them)
// @include        http://thepiratebay.se/torrent/*
// @include        http://thepiratebay.org/torrent/*
// @include        http://www.thepiratebay.se/torrent/*
// @include        http://www.thepiratebay.org/torrent/*
// ==/UserScript==

var version = "1.0";
var key = "127132";


function getElementsByClassName(name,eleType)
{
	if(!eleType)
	{
		eleType = "*";
	}
	var eles = document.getElementsByTagName(eleType);
	var returner = new Array();
	for(i=1;i<eles.length;i++)
	{
		ele = eles[i];
		if(ele.className==name)
		{
			returner[returner.length] = ele;
		}
	}
	return returner;
}




var eles = getElementsByClassName("download","div");

var do_continue;
for(i=0;i<eles.length;i++) // 
{
	ele = eles[i];
	do_continue = true;

	var ele_eles = ele.getElementsByTagName("a");
	//alert(ele_eles.length);
	for(j=0;j<ele_eles.length;j++)
	{
		//alert(ele_eles[j].title.toLowerCase().replace(/^\s+|\s+$/g, ""));
		if(ele_eles[j].title.toLowerCase().replace(/^\s+|\s+$/g, "") == "torrent file")
		{
			do_continue = false;
		}
	}
	//alert(do_continue);
	if(do_continue==false)
	{
		continue;
	}
	var a = document.createElement("a");
	url = document.location.toString();
	url = url.substr(0,url.indexOf("thepiratebay.")) + "torrents." + url.substr(url.indexOf("thepiratebay."),url.length);
	url = url.substr(0,url.indexOf("torrent/")) + url.substr(url.indexOf("torrent/")+"torrent/".length,url.length);
	url = url + ".torrent";
	a.href = url;
	a.innerHTML = "<img src='http://static.thepiratebay.org/img/dl.gif' /> Download .torrent";
	
	ele.appendChild(document.createElement("br"));
	var inserted = ele.insertBefore(a,ele.getElementsByTagName("*")[0]);

}

/*
------------------------------------------------------------------
UPDATE SCRIPT CODE
Created by Justin Strawn, http://userscripts.org/users/cobalt
You may use this code for your own script, but only if you also include these lines.
------------------------------------------------------------------
*/
var url_update = "http://sleekupload.com/greasemonkey/update.php?id="+key+"&v="+version;
GM_xmlhttpRequest({
  method: "GET",
  url: url_update,
  onload: function(response) {
var currentversion = unescape(response.responseText);
if(currentversion!=version)
{
var url = prompt("You are using an outdated version of this script!\nYou have version "+version+", and the current version is "+currentversion+"\nPlease navigate to the url below to update:", "http://userscripts.org/scripts/show/"+key);
}
  }
});
