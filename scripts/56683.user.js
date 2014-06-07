// version 1.0
// Copyright (c) 2009, Narga Labs. http://www.narga.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Social News: Re-Direct Target Link
// @namespace      http://www.narga.net
// @description    Forward you to target page and skip Social news website when you browser it via Internet Browser and RSS Reader.
// @include			http://digg.com/*/*
// @include			http://linkhay.com/link*/*
// @include			http://dzone.com/links/*
// @include			http://www.dzone.com/links/*
// @exclude			http://linkhay.com/tin-hot/*


// ==/UserScript==function getDomain(){
	var idx2 = location.href.indexOf("://");
	var urlLink2=location.href.substring(0, idx2+3);
	var sDomain = location.href.substring(idx2+3, 500);
	idx2 = sDomain.indexOf("/");
	return urlLink2+sDomain.substring(0, idx2);
}

function getElementsByStyleClass (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}
function forwardit () {
	var domain = getDomain();
	switch(domain){
    case "http://dzone.com":
		location.href = getElementsByStyleClass('ldTitle')[0].firstChild.href;
        break;
    case "http://www.dzone.com":
		location.href = getElementsByStyleClass('ldTitle')[0].firstChild.href;
        break;
    case "http://digg.com":
		location.href =  document.getElementById('title').getElementsByTagName('a')[0].href;
        break;
    case "http://linkhay.com":
		location.href = getElementsByStyleClass('title')[0].firstChild.href;
        break;
    default:
        break;
    }
}
addEventListener('load',forwardit,false);

// Script Auto Updater
// http://userscripts.org/scripts/show/7180
var version_scriptURL = "http://userscripts.org/scripts/source/7180.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1202998701; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

if (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime())) // Checks once a day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
{
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: version_scriptURL + "?" + new Date().getTime(),
        headers: {'Cache-Control': 'no-cache'},
        onload: function(xhrResponse)
        {
            GM_setValue("lastUpdate", new Date().getTime() + "");
            if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1]) > version_timestamp)
            {
                if (confirm("There is an update available for the Greasemonkey script \"" + xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g, "") + ".\"\nWould you like to go to the install page now?"))
                    {GM_openInTab(version_scriptURL);}
            }
        }
    });
}