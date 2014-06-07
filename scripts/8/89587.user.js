// ==UserScript==
// @name           Mafiosi Youtube Player
// @namespace      Mafiosi Youtube Player
// @include        http://mafiosi.nl/user.php?naam=*
// @include        http://www.mafiosi.nl/user.php?naam=*
// ==/UserScript==

var aantal = document.getElementsByTagName('a').length;

for(teller = '0'; teller < aantal; teller++){

var link = document.getElementsByTagName('a')[teller];
if(link.href.indexOf('youtube.com/watch')>0){

var div = document.createElement("div");
	div.id = 'youtube' + teller;
	
	id = link.href.split("=");
	
	div.innerHTML = '<object width="250" height="250">'
	+'<param name="movie" value="http://www.youtube.com/v/' + id[1] + '?fs=1&amp;&rel=0&hl=nl_NL&amp;color1=0xe68500&amp;color2=0x404040">'
	+'</param><param name="allowFullScreen" value="true">'
	+'</param><param name="allowscriptaccess" value="always">'
	+'</param><embed src="http://www.youtube.com/v/' + id[1] + '?fs=1&amp;&rel=0&hl=nl_NL&amp;color1=0xe68500&amp;color2=0x404040" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="250" height="250"></embed></object>';
	
var voor = document.getElementsByTagName('a')[teller];
	voor.parentNode.insertBefore(div,voor);
	voor.textContent = '';
}
}