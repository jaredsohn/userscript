// ==UserScript==
// @name	YouTube Video Anonymizer
// @description	Anonymizes YouTube Video Streaming with HideMyAss! Proxy
// @author	Miko Labalan (skycursor)
// @version	0.1.2
// @include	http://youtube.com/watch?*
// @include	http://*.youtube.com/watch?*
// @include	http://youtube.com.*/watch?*
// @include	http://*.youtube.com.*/watch?*
// ==/UserScript==

(function() {

	var Base64 = {

		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;

			input = Base64._utf8_encode(input);

			while (i < input.length) {

				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

			}

			return output;
		},

		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		}

	};

	with ({
		main : [function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://"+svr+".hidemyass.com/ip-"+ipn+"/encoded/"+vidx,
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
							var url = escape(Base64.encode(abc[i].split("|")[1].replace(/http:\/\//,"://")));
	  						param1.setAttribute("value","flv=http%3A//"+svr+".hidemyass.com/ip-"+ipn+"/encoded/"+escape(url)+"&title="+escape(document.title)+"&width=640&height=385&autoplay=1&autoload=1&buffer=5&margin=0&showstop=1&showvolume=1");
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
	  var vidx = escape(Base64.encode("://www.youtube.com/get_video_info?video_id="+vid+"&fmt=34"));
	  var svr = Math.floor(Math.random()*4)+1;
	  if (svr==1) { var ipn = Math.floor(Math.random()*9)+1; }
	  else if (svr==2) { var ipn = Math.floor(Math.random()*20)+1; }
	  else if (svr==3) { var ipn = Math.floor(Math.random()*14)+1; }
	  else if (svr==4) { var ipn = Math.floor(Math.random()*2)+1; }
	  else if (svr==5) { var ipn = 1; }
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
