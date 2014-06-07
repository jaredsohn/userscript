// ==UserScript==
// @name           HackClips Download - by tw8
// @namespace      tw8
// @description    Using this script you can download any video from "http://www.hackclips.com/"
// @include        http://www.hackclips.com/video/*
// ==/UserScript==

/*Made by tw8
Have a look on:
	http://www.hackpedia.info
	http://skullbox.info
	http://rstcenter.com
*/


function get_link()
	{
	var link = document.location.href;
	link = link.substr(link.lastIndexOf("/")+1);
	return "http://www.hackclips.com/fplayer.php?id=" + link;
	}
	
function true_link(source)
	{
	var link = source.substr(0, source.indexOf("</file>"));
	link = link.substr(link.indexOf("<file>")+6);
	document.location = link;
	return 0;
	}

GM_registerMenuCommand
	('Download this video', function() 
		{
		var tw8 = get_link();
		GM_xmlhttpRequest
			({
			method:"GET",url:tw8, headers:{"User-Agent":"Mozilla/5.0", "Accept":"text/xml"}, onload:function(response) 
				{
				var continut = response.responseText;	
				true_link(continut);
				}		
			})

		}
	);