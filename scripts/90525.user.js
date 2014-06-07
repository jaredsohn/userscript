// ==UserScript==
// @name           own3d live
// @namespace      oberon
// @description    Adds information to own3d links about whether they're live
// @include        *
// ==/UserScript==

function ParseInfo( s )
{
	var infos = s.split("&");
	var parsed = {};
	for ( var i = 0 ; i < infos.length ; i++ )
	{
		var keyval = infos[i].split("=");
		parsed[keyval[0]] = keyval[1];
	}
	return parsed;
}

function GetLinkRequestObject( link )
{
	return {
		method: "GET",
		url: GetURL,
		onload: function(response) {
			if ( ParseInfo(response.responseText)["liveStatus"] == "true" )
			{
				var mySpan = document.createElement("span");
				mySpan.style.color = "#ee0000";
				mySpan.style.backgroundColor = "#eeeeee";
				mySpan.style.padding = "3px";
				mySpan.style.fontWeight = "bold";
				mySpan.innerHTML = "(LIVE)";
				link.appendChild( mySpan );
			}
		}
	};
}

var links = document.getElementsByTagName("a");
var own3dRegex = /http:\/\/www\.own3d\.tv\/live\/(\d+)/;
for ( var i in links )
{
	var link = links[i];
	var own3dMatches = own3dRegex.exec( link.href );
	if ( own3dMatches != null )
	{
		var GetURL = "http://static.ec.own3d.tv/live_tmp/"+own3dMatches[1]+".txt?"+Math.floor(Math.random()*1000000000000);
		GM_xmlhttpRequest(GetLinkRequestObject(link));
	}
}