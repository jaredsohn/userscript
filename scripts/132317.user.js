// ==UserScript==
// @name           facebook like button daemon
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://www.facebook.com/plugins/like.php*
// @include        https://www.facebook.com/plugins/like.php*
// @version        0.1
// @date           2012050305
// ==/UserScript==

/*
firefox stylish rule:

@-moz-document url-prefix("http://www.facebook.com/plugins/like.php"),
url-prefix("https://www.facebook.com/plugins/like.php") {
body {
  background-color: tomato !important;
}
}
*/

GM_addStyle('#GM_overlay { position:fixed; top:0; left:0; width: 100%; height:100%; background-color:pink; opacity:0.3; }');
var o = document.createElement('div');
o.id = 'GM_overlay';
o.addEventListener('click', function() {
	var self = this;
	if (confirm('／^o^＼')) {
		setTimeout(function() {
			self.parentNode.removeChild(self);
		}, 1000);
	}
}, false);
document.body.appendChild(o);