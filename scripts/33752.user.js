// ==UserScript==

// @name           MPMotion

// @namespace      somebody@somewhere

// @include        http://www.dailymotion.com/*

// ==/UserScript==

/*
CHANGELOG: 2008-09-17
-+ var: width and height like in flash player
*/


var width = 560;

var height = 462;

var player = document.getElementById("video_player");
if(player) {
	var vars = unescape(player.getAttribute("flashvars"));
	var divs = document.getElementsByTagName("div");
	var vid  = vars.substring(vars.indexOf("video=")+6, vars.indexOf("@", vars.indexOf("video=")+6));
	var url  = "http://" + window.location.hostname + vid;
	
	for(var i=0; i<divs.length; i++) {
		var class = divs[i].getAttribute("class")
// Comment this out if you also want to be able to download from dailymotion...or leave it like this if you have another script doing the job
// 		if(class && class.substr(0,20) == "dm_widget_videotools") {
// 			divs[i].innerHTML += "<a href='"+url+"' class='dm_action_link label get_widget' "+"style='background-image:url(/images/icons/add.png)'>download this video</a>"
// 		}
		if(class && class == "dm_widget_box sub_box player_box"){
	
			divs[i].innerHTML = '<div id="watch-player-div" class="flash-player"><object classid="dm_widget_box sub_box player_box" codebase="http://www.apple.com/qtactivex/qtplugin.cab" type="video/quicktime" width="'+width+'" height="'+height+'"><param name="src" value="'+url+'"><param name="autoplay" value="true"><param name="controller" value="true"><param name="loop" value="true"><embed src="'+url+'" autoplay="true" controller="true" loop="true" pluginspage="http://www.apple.com/quicktime/download/" type="video/quicktime" width="'+width+'" height="'+height+'"></object></div>';		

			}
  	}
}
