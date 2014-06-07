// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nethorse, rollespil
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Sniksnak, viser når der er nye beskeder.
// @include       http://nethorse.dk/forum_view_post.php?*
// @include       http://www.nethorse.dk/forum_view_post.php?*
// ==/UserScript==

var thisurl = window.location.href;
var oldtime = '';

var myInterval = setInterval(function() {

GM_xmlhttpRequest({
    method: 'GET',
    url: thisurl,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible)',
      'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var newdoc = responseDetails.responseText;
	i  = newdoc.lastIndexOf('Skrevet af: ');
	ii = newdoc.indexOf('width="12"> d. ', i);
	var newtime = newdoc.substr(ii+15,19);
	var text = '';
	if (oldtime == '') oldtime = newtime;
	if (oldtime != newtime) {
		text = newdoc.substr(ii+41, 200);
		var body = document.getElementsByTagName('body')[0];
		body.style.backgroundColor = '#999999';
		text = text.replace(/<\/?[^>]+(>|$)/g, "");
		alert(text);
		clearInterval(myInterval);
	}
    }
});
} , 10000);


