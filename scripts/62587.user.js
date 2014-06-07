// ==UserScript==
// @name	Magnet link for share.newdmhy.net
// @namespace	http://blog.gslin.org/plugins/magnet-link-newdmhy
// @description Magnet link for share.newdmhy.net
// @homepage	http://blog.gslin.org/plugins/magnet-link-newdmhy
// @include	http://share.newdmhy.net/show.php?hash=*
// ==/UserScript==

(function(){
    var descRe = new RegExp('^立即下載:(.*)$');
    var hashRe = new RegExp('hash=([0-9A-Fa-f]*)');

    // get down.php link
    var xres = document.evaluate('//a[substring(@href,1,8)="down.php"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var xresLength = xres.snapshotLength;

    for (var i = 0; i < xresLength; i++) {
	// get element
	var linkElement = xres.snapshotItem(i);
	var m = hashRe.exec(linkElement.getAttribute('href'));

	// get desc
	var desc = linkElement.childNodes[0].innerHTML;
	desc = descRe.exec(desc)[1];

	// create magnet link
	var el = document.createElement('a');
	el.innerHTML = '(magnet link)';
	el.setAttribute('href', 'magnet:?xt=urn:btih:' + encodeURI(m[1]) + '&dn=' + encodeURI(desc));

	// append element
	linkElement.parentNode.appendChild(el);
    }
})();
