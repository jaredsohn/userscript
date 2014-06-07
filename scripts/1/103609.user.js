// ==UserScript==
// @name           google_fiance_mover_highlighter
// @description    Highlights large movers in Google Finance
// @namespace      smalltalk80.uc
// @include        http://www.google.com*/finance*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function highlight() {
	var pattern = /(\d{1,2})\.\d{2}%/;
	var threshold = 2;
    $('*', 'body')
        .contents()
        .filter(function(){
            return this.nodeType === 3;
        })
        .filter(function(){
            if (this.nodeValue.length > 10) {
				return false;
			}
			var match = this.nodeValue.match(pattern);
			if (match == null) {
				return false;
			}
			var digit = parseInt(match);
			return digit >= threshold;
        })
        .each(function(){
			$(this).parent().css('font-weight', 'bolder');
        });
	setTimeout(highlight, 1000);
}


$(document).ready(function() {
	highlight();
});
