// ==UserScript==

// @name           Google Music Player Last.fm scrobbling support

// @namespace      http://themightydeity.com/lastfm/

// @author         themightydeity

// @include        http://play.google.com/music/listen*

// @include        https://play.google.com/music/listen*

// @match          http://play.google.com/music/listen*

// @match          https://play.google.com/music/listen*

// @grant          GM_getValue

// @grant          GM_setValue

// @grant          GM_xmlhttpRequest

// @grant          GM_openInTab

// @icon           http://themightydeity.com/lastfm/icon_32x32.png

// @description    Adds Last.fm scrobbling support.

// @version        2.1

// ==/UserScript==



var lastfm = {

	addDivs: function (){

		var elm = document.createElement('div');

		elm.setAttribute('id','lastfmScrobbling');

		//elm.style.cssFloat = "left";

		elm.style.paddingLeft = "15px";
		
		elm.style.paddingTop = "9px";

		elm.style.color = "#777777";

		elm.innerHTML = 'Last.fm scrobbling is active.';

		document.getElementById('insideBox').appendChild(elm);

		oldSong = "";

		thumbedSong = "";

		nowPlaying = 0;

		return this;

	},

	normal: function (){

		api_key = GM_getValue('api_key');

		sk = GM_getValue('sk');

		secret = GM_getValue('secret');

		if(null == document.getElementById('lastfmScrobbling')){

			lastfm.addDivs();

		}

		var elm = document.getElementById('playPause');
			
		if(elm && elm.getAttribute('aria-pressed')== 'true'){

			var elm = document.getElementById('player-artist');

			if (elm) {

				elm = elm.getElementsByTagName('div');

				if (elm) {songArtist = elm[0].innerHTML;songArtist = songArtist.replace("&amp;","&");songArtistU = utf8encode(songArtist);}

			}

			var elm = document.getElementById('playerSongTitle');
            if (elm) {

				elm = elm.getElementsByTagName('div');

				if (elm) {songTitle = elm[0].innerHTML;songTitle = songTitle.replace("&amp;","&"); songTitleU = utf8encode(songTitle);}

				

			}

			if(typeof songTitle!='undefined' && songTitle != "" && oldSong != songTitle){

				if(typeof songArtist=='undefined' || songArtist=="") {songArtist = "Unknown";}
                if(typeof songArtistU=='undefined' || songArtistU=="") {songArtistU = "Unknown";}

				timestamp = Math.round((new Date()).getTime() / 1000);

				method = "track.scrobble";

				api_sig = hex_md5("api_key"+api_key+"artist"+songArtist+"method"+method+"sk"+sk+"timestamp"+timestamp+"track"+songTitle+secret);

				post_data = "api_key="+api_key+"&api_sig="+api_sig+"&artist="+escape(songArtistU)+"&method="+method+"&sk="+sk+"&timestamp="+timestamp+"&track="+escape(songTitleU);

				GM_xmlhttpRequest({

					  method: "POST",

					  url: "http://ws.audioscrobbler.com/2.0/",

					  data: post_data,

					  headers: {

						"Content-Type": "application/x-www-form-urlencoded"

					  },

					  onload: function(r) {

						//GM_log(r);

						document.getElementById('lastfmScrobbling').innerHTML= "Last.fm scrobbling is active.(Updated)";

					  }

					});

				oldSong = songTitle;

				nowPlaying = 10;

			}

			else if(typeof songTitle!='undefined' && songTitle != "" && oldSong == songTitle){

				if(nowPlaying==0){

					if(typeof songArtist=='undefined' || songArtist=="") {songArtist = "Unknown";}

					method = "track.updateNowPlaying";

					api_sig = hex_md5("api_key"+api_key+"artist"+songArtist+"method"+method+"sk"+sk+"track"+songTitle+secret);

					post_data = "api_key="+api_key+"&api_sig="+api_sig+"&artist="+escape(songArtistU)+"&method="+method+"&sk="+sk+"&track="+escape(songTitleU);

					GM_xmlhttpRequest({

					  method: "POST",

					  url: "http://ws.audioscrobbler.com/2.0/",

					  data: post_data,

					  headers: {

						"Content-Type": "application/x-www-form-urlencoded"

					  },

					  onload: function(r) {

						//GM_log(r);

						document.getElementById('lastfmScrobbling').innerHTML= "Last.fm scrobbling is active.(Playing)";

					  }

					});

					oldSong = songTitle;

					nowPlaying=10;

					if(thumbedSong != songTitle){lastfm.thumbsUp();}

				}

				else{nowPlaying--;}

			}

		}

		else{

			document.getElementById('lastfmScrobbling').innerHTML= "Last.fm scrobbling is not active, seems like you have paused the music.";

		}

		window.setTimeout(lastfm.normal,1000);

		return this;

	},

	thumbsUp: function (){

		var elm = document.getElementById('thumbsUpPlayer');

		if(elm && elm.getAttribute('aria-pressed') == 'true'){

			method = "track.love";

			api_sig = hex_md5("api_key"+api_key+"artist"+songArtist+"method"+method+"sk"+sk+"track"+songTitle+secret);

			post_data = "api_key="+api_key+"&api_sig="+api_sig+"&artist="+escape(songArtistU)+"&method="+method+"&sk="+sk+"&track="+escape(songTitleU);

			GM_xmlhttpRequest({

			  method: "POST",

			  url: "http://ws.audioscrobbler.com/2.0/",

			  data: post_data,

			  headers: {

				"Content-Type": "application/x-www-form-urlencoded"

			  },

			  onload: function(r) {

				//GM_log(r);

				document.getElementById('lastfmScrobbling').innerHTML= "Last.fm scrobbling is active.(Thumbs Up)";

			  }

			});

			thumbedSong = songTitle;

		}

		return this;

	},

	

	init: function(){

		if(!(GM_getValue('api_key')) || GM_getValue('api_key')=="0"){

				GM_setValue('api_key',prompt("Your last.fm API KEY\r\n(if you dont know anything DONT CANCEL, JUST PRESS OK/ENTER)",""));

				if(GM_getValue('api_key')==null || GM_getValue('api_key')==""){GM_setValue('api_key',"0");}

		}

		if(!(GM_getValue('secret')) || GM_getValue('secret')=="0"){

			GM_setValue('secret',prompt("Your last.fm api SECRET \r\n(if you dont know anything DONT CANCEL, JUST PRESS OK/ENTER)",""));

			if(GM_getValue('secret')==null || GM_getValue('secret')==""){GM_setValue('secret',"0");}

		}

		if(GM_getValue('api_key') != "0"){

			if(!(GM_getValue('token')) || GM_getValue('token')=="0" || GM_getValue('token')=="1"){

				if(lastfm.getURL('token')){

                    GM_setValue('token',lastfm.getURL('token'));

					lastfm.validate();

				}

				else{

					dontmove=true;

					if(GM_getValue('token')=="1"){ 

						if(confirm("Did you get some error like Invalid API key in lastfm auth page? and want me to reset everything to try again")){

							alert("Everything is resetted, please refresh this page and try again");

							GM_setValue('api_key','0');

							GM_setValue('secret','0');

							GM_setValue('token','0');

							dontmove=false;

						}

					}

					if(dontmove){

						GM_setValue('token',"1");

						alert("After you click ok, you will see a new tab appearing.\r\nIf some auth error occurs in that page refresh this page else if you can authorize your app then just close this page.");

						GM_openInTab("http://www.last.fm/api/auth/?api_key="+GM_getValue("api_key")+"&cb=http://music.google.com/music/listen");

					}

				}

			}

			else{

				lastfm.validate();

			}

		}

		else{

			alert("You have to make an API account in lastfm then you get API KEY and SECRET.\r\nAfter you get those values refresh this page, then submit those values respectively.");

		}

		return this;

	},

	getURL: function(name){

		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

		var regexS = "[\\?&]"+name+"=([^&#]*)";

		var regex = new RegExp( regexS );

		var results = regex.exec( window.location.href );

		if( results == null ){

			return "";

		}

		else{

			return results[1];

		}

	},

	validate: function(){

		if(!(GM_getValue('sk')) || GM_getValue('sk') == "0"){ 

		api_key = GM_getValue('api_key');

		secret = GM_getValue('secret');

		token = GM_getValue('token');

                GM_setValue('sk','0');

		api_sig = hex_md5('api_key'+api_key+'methodauth.getSessiontoken'+token+secret);

		post_data = "api_key="+api_key+"&method=auth.getSession&token="+token+"&api_sig="+api_sig;

  			GM_xmlhttpRequest({

			  method: "POST",

			  url: "http://ws.audioscrobbler.com/2.0/",

			  data: post_data,

			  headers: {

				"Content-Type": "application/x-www-form-urlencoded"

			  },

			  onload: function(r) {

				if(r.responseText.match(/<key>(.*?)<\/key>/)[1]){

					GM_setValue('sk',r.responseText.match(/<key>(.*?)<\/key>/)[1]);

					alert("Everything went fine, ready to scrobble");

					lastfm.normal();

				}

				else{

					GM_setValue('api_key','0');

					GM_setValue('secret','0');

					GM_setValue('token','0');

					GM_setValue('sk','0');

					alert("Something went terribly wrong, need to start again");

					lastfm.init();

				}

			  }

			});

		}

		else{

			lastfm.normal();

		}

		return this;

	}

}

if(unsafeWindow.console){

   var GM_log = unsafeWindow.console.log;

}

window.addEventListener("load", lastfm.init(), false);







/* UTF-8 ENCODE */

function utf8encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext};



/*

 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message

 * Digest Algorithm, as defined in RFC 1321.

 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009

 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet

 * Distributed under the BSD License

 * See http://pajhome.org.uk/crypt/md5 for more info.

 */

var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

