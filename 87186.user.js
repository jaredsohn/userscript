// ==UserScript==
// @name	YouTube Video CoBlitzer
// @description	Uses CoDeeN Content Distribution Network to accelerate video performance on YouTube
// @author	Miko Labalan (skycursor)
// @version	0.1.4
// @include	http://youtube.com/watch?*
// @include	http://*.youtube.com/watch?*
// @include	http://youtube.com.*/watch?*
// @include	http://*.youtube.com.*/watch?*
// ==/UserScript==

(function() {

	with ({
		main : [function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.youtube.com/get_video_info?video_id="+vid+"&fmt=34",
				onload: function(response) {
					var swfHTML = response.responseText;
					var w = swfHTML.split("&");
					for (i=0;i<=w.length-1;i++) {
						if( w[i].split("=")[0] == "fmt_url_map" ) {
							var links = unescape( w[i].split("=")[1] );
							break;
						}
					}
					var abc = links.split(",");
					for (i=0;i<=abc.length-1;i++) {
						var fmt = abc[i].split("|")[0];
						if(fmt==34) {
							var url = abc[i].split("|")[1].replace(/http:\/\//,'');
	  						param1.setAttribute("value","flv=http%3A//coblitz.codeen.org/"+escape(url)+"&title="+escape(document.title)+"&width=640&height=385&autoplay=1&autoload=1&buffer=5&margin=0&showstop=1&showvolume=1");
							new_player.appendChild(param1);
							new_player.insertBefore(param2,param1);
							new_player.insertBefore(param3,param2);
							movie_player.parentNode.replaceChild(new_player, movie_player);
						}
					}
				}
			});
		}]
	     })
	{
	  var movie_player = document.getElementById('movie_player');
	  if (!movie_player) {
		return;
	  }
	  var vid = document.location.href.match(/(\?|\&)v=([^(\&|$)]*)/)[2];
	  var new_player = document.createElement("object");
	  new_player.setAttribute("height","385");
	  new_player.setAttribute("width","640");
	  new_player.setAttribute("data","http://flv-player.net/medias/player_flv.swf");
	  new_player.setAttribute("type","application/x-shockwave-flash");
	  var param1 = document.createElement("param");
	  param1.setAttribute("name","FlashVars");
	  var param2 = document.createElement("param");
	  param2.setAttribute("value","true");
	  param2.setAttribute("name","allowFullScreen");
	  var param3 = document.createElement("param");
	  param3.setAttribute("value","http://flv-player.net/medias/player_flv.swf");
	  param3.setAttribute("name","movie");
	  return main[0];
	}

})()();
