// ==UserScript==
// @name           DailyMotion Download Link
// @namespace      http://userscripts.org/users/103348
// @description    Replace the advertisement to the right with video download links
// @include        *.dailymotion.com
// ==/UserScript==

var header = document.getElementById("mc_title")
header.innerHTML = 'Download Video'

var divs = document.getElementsByTagName("div")
var urlsd =''
var urlhd =''
for (var i = 0; i < divs.length; i++) {
    var vid = divs[i].getAttribute("id")
	
	if (vid)
	{
		if (vid.match("video_player") && !vid.match("video_player_embed_preview")) {		
			var vhtml = unescape(divs[i].innerHTML);
			
			urlsd = vhtml.substring(vhtml.indexOf("video=") + 6, vhtml
									.indexOf("@", vhtml.indexOf("video=") + 6));
			urlhd = vhtml.substring(vhtml.indexOf("spark-mini||") + 12, vhtml
									.indexOf("@", vhtml.indexOf("spark-mini||") + 12))		
			
		}
	}
}

//---- set the url
var dl = document.getElementById("player_middle_ad")
if (dl)
{		
dl.innerHTML = "<a href='"
						+ urlsd
						+ "' class='dm_action_link label get_widget' "
						+ "style=''>Download SD</a>&nbsp;|";
dl.innerHTML += "<a href='"
						+ urlhd
						+ "' class='dm_action_link label get_widget' "
						+ "style=''>Download HD</a>"						
						
}