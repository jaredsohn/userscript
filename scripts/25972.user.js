// ==UserScript==

// @name           VLCMotion

// @namespace      somebody@somewhere

// @include        http://dailymotion.alice.it/*

// ==/UserScript==

var js_server = "http://furyy.planet.ee/VLCcontrols/";
var vlc_version = "0.8.6";

var width = 480;

var height = 388;



var player = document.getElementById("video_player");
if(player) {
	var vars = unescape(player.getAttribute("flashvars"));
	var divs = document.getElementsByTagName("div");
	var vid  = vars.substring(vars.indexOf("video=")+6, vars.indexOf("@", vars.indexOf("video=")+6));
	var url  = "http://" + window.location.hostname + vid;
	
	var vlc = document.createElement('div');

	vlc.id = "vlccontent";

	var s0 = document.createElement('script');

	s0.src = js_server + "ExternalLibLoader.js";

	var s1 = document.createElement('script');

	s1.src = js_server + "VLCobject.js";

	var s2 = document.createElement('script');

	s2.src = js_server + "VLCcontrols.js";

	var s3 = document.createElement('script');

	var s4 = 

		' var myvlc = new VLCObject("mymovie", "'+width+'", "'+height+'", "'+vlc_version+'");'+

		' myvlc.addParam("MRL","'+url+'");'+

		' myvlc.write("vlccontent");'+

		' var vlc_controls = new VLCcontrols(myvlc);';

	s3.appendChild(document.createTextNode(s4));

	for(var i=0; i<divs.length; i++) {
		var class = divs[i].getAttribute("class")
// Comment this out if you also want to be able to download from dailymotion...or leave it like this if you have another script doing the job
// 		if(class && class.substr(0,20) == "dm_widget_videotools") {
// 			divs[i].innerHTML += "<a href='"+url+"' class='dm_action_link label get_widget' "+"style='background-image:url(/images/icons/add.png)'>download this video</a>"
// 		}
		if(class && class == "dm_widget_box sub_box player_box"){
	
			divs[i].innerHTML="";		
		
			divs[i].appendChild(vlc);
		
			divs[i].appendChild(s0);
		
			divs[i].appendChild(s1);
		
			divs[i].appendChild(s2);
		
			divs[i].appendChild(s3);
			}
  	}
}
