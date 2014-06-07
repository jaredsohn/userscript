// ==UserScript==
// @name           Megavideo no limits
// @namespace      http://userscripts.org/users/97977
// @description    Watch Megavideo video's without limits!
// @include        http://www.meavideo.com
// ==/UserScript==

// Add jQuery
var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://jquery.com/jquery-latest.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

var GM_Player = document.createElement('script');
GM_Player.src = 'http://www.leewayweb.com/megavideo_streaming/flowplayer-3.2.4.min.js';
GM_Player.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_Player);

// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
GM_wait();

// Once document and jQuery are loaded
function GM_ready() {
	$(document).ready(function() {
		$.ajax({
			type: 'POST',
			data: 'url='window.location.href,
			dataType: 'jsonp',
			url: "http://www.leewayweb.com/megavideo_streaming/megavideo_grab.php"
			succes: function(data) {
				var link = $(document.createElement('a'));
				link.attr({
					src: data['url'],
					style: "display:block;width:520px;height:330px",
					id: 'lwwplayer'
				});
				link.appendTo('body');
				flowplayer('lwwplayer', 'http://www.leewayweb.com/megavideo_streaming/flowplayer-3.2.5.swf');
			}
		});
    });
}