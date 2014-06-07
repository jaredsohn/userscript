// ==UserScript==
// @name           OC Chat Link
// @namespace      http://userscripts.org/users/23652
// @description    Adds box in top right corner to head to OC chat.
// @include        http://www.legacy-game.net*
// @version        1.0
// @license        None.
// ==/UserScript==

if(top.location!=self.location) {return;}

// get() function by JoeSimmons
function get(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {cb(r);}
});
}

var host = window.location.host.replace(/^www\./,'');

var logo = window.document.createElement('img'),
	div = window.document.createElement('div'),
	a = window.document.createElement('a');
	a.setAttribute('href', 'http://client4.addonchat.com/sc.php?id=415567'+host);
	div.setAttribute('style', 'text-align:right;background:transparent; position:absolute; left:1106px; top:16px; z-index: 50; ');
	logo.setAttribute('id', 'aboutus_logo');
	logo.setAttribute('border', '0');
	logo.setAttribute('src', 'http://img197.imageshack.us/img197/1240/occhat2.png');
	a.appendChild(logo);
	div.appendChild(a);
if(!window.document.getElementById('aboutus_logo')) window.document.body.insertBefore(div, window.document.body.firstChild);