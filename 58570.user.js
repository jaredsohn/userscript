// ==UserScript==
// @name           MegaVideo NOLIMIT
// @namespace      fmv
// @description    Dont wait for movie! Watch now.
// @include        *megavideo.com/?v=*
// @author         adiqpl
// @version        2.5.0
// ==/UserScript==

var mvid = unescape(/\?v=(.*?)&/.exec(document.body.innerHTML)[1]);
var plac = document.createElement("div");
plac.innerHTML = '<div style="position: fixed; left: 15px; bottom: 15px; z-index:10;">' +'<a href="http://adiq.eu/patrz.php?id=' + mvid + '"><img border=0 src="http://adiq.eu/upload/img/d61833.png" /></a>' +
	'</div>';
document.body.insertBefore(plac, document.body.firstChild);

document.body.style.margin = '0px';