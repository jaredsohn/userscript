// ==UserScript==
// @name           Postcount
// @namespace      NDSS
// @include        http://ndss.nl/viewtopic.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var pattern = /<!--[^0-9]*([0-9]+).*-->/i;
var replacement = "<dd><strong>Berichten:</strong> $1</dd>"
$(".postprofile")
	.each(function() {
		var text = this.innerHTML;
		this.innerHTML = text.replace(pattern, replacement);
	});