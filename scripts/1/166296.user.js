// ==UserScript==
// @name        Ask.fm stream auto liker
// @namespace   GodDamnIt
// @include     http://ask.fm/account/stream
// @version     1
// ==/UserScript==

var $ = unsafeWindow.jQuery;
	
var count = 5;
$(".like").each(function(i) {
	if( i < count ) {
		var element = this;
		setTimeout(function(){ $(element).click(); 
			if( i >= count - 1 ) {
				setTimeout(function(){ location.reload(); }, ( Math.random()*20000+15000 ) );
			}
		}, ( Math.random() * 5000 + 15000 ) * ( i + 1 ) );
	}
});