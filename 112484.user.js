// ==UserScript==
// @name           avatar_58 is sad
// @namespace      http://userscripts.org/users/72838
// @description    Very very sad
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require 	   https://raw.github.com/zachstronaut/jquery-css-transform/master/jquery-css-transform.js
// @require		   https://raw.github.com/zachstronaut/jquery-animate-css-rotate-scale/master/jquery-animate-css-rotate-scale.js
// @require		   https://raw.github.com/happyworm/jPlayer/master/jquery.jplayer/jquery.jplayer.js
// @include        http://www.shacknews.com/chatty*
// @resource      GMwavaudio http://c0bra.net/shacknews/sadviolin.ogg
// ==/UserScript==

var oggB64 = GM_getResourceURL("GMwavaudio");
var ausrc = 'data:audio/ogg;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
var au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
au.setAttribute('volume', '0.1');
document.body.appendChild(au);

$(document).ready(function() {
    $('.olauthor_173590 span.oneline_user').after('<img class="violin" style="margin-left: 5px;" src="http://www.c0bra.net/shacknews/violin-icon.png" />');
    
    $('.violin').hover(
    	function () {
    		rotateMe(this);
    		au.play();
    	},
    	function(){
    		au.pause();
    		$(this).stop();
			$(this).animate({rotate: '0deg'}, 0);
    	}
	);
});

function rotateMe(rotater) {
	$(rotater).animate({rotate: '+=360deg'}, 700, 'linear', function (){ rotateMe(rotater); });
}