// ==UserScript==
// @name           mixwit downloader
// @namespace      http://userscripts.org/scripts/source/24637.user.js
// @description    download mixwit songs
// @include        http://www.mixwit.com/*
// ==/UserScript==
//

var playlist_url = "http://www.mixwit.com/playlists/"+unsafeWindow.flashvars["playlist"]+".xml";

function node_value(root_node, node)
{
	try
	{
		var r = root_node.getElementsByTagName(node)[0].firstChild.nodeValue;
		return r;
	}
	catch(err)
	{
		return "";
	}
}

function display_songs(xml_data)
{
	var parser = new DOMParser();
	var xml = parser.parseFromString(xml_data, 'application/xml');
	var tracks = xml.getElementsByTagName("track");
	
	var song_div = document.createElement('div');

	for(var i=0; i<tracks.length; i++)
	{
		var song_location = node_value(tracks[i], "location");
		var song_artist = node_value(tracks[i], "creator");
		var song_title = node_value(tracks[i], "title");

		var song_a = document.createElement('a');
		if(song_location != null)
		{
			song_a.setAttribute('href', song_location);
			song_a.innerHTML= "<b>"+song_artist+" - "+song_title+"</b>";
			song_div.appendChild(song_a);
			song_div.appendChild(document.createElement('br'));
		}
	}

	var widget = document.getElementById("widget");
	widget.appendChild(song_div);
}

GM_xmlhttpRequest
(
{
	method: 'GET',
	url: playlist_url,
	headers:
	{
		'User-agent': navigator.userAgent,
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(resp)
	{
		var playlist_xml = resp.responseText;
		display_songs(playlist_xml);
	}
}
);