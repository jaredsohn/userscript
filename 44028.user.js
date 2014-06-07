// ==UserScript==
// @name           Movapic Thumbnailer
// @namespace      http://matatabi.homeip.net
// @description    show thumbnail image of Movapic
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

(function(d){
    var pat = '<img class="image" src="(.*?)"/>';
    var sizes = ['/pic/s_', '/pic/m_', '/pic/l_'];
    var cache = {};

    function main() {
	var anchors = d.getElementsByTagName('a');
	var anchors_length = anchors.length;
	for (var i=0; i<anchors_length; i++) {
	    var a = anchors[i];
	    if (a.hostname != 'movapic.com') continue;
	    if (a.pathname.indexOf('.') > -1) continue;
	    if (a.pathname.split('/').length < 2 ||
		a.pathname.split('/').length > 4) continue;
	    if (a.search || a.hash) continue;

	    var imgs = a.getElementsByTagName('img');
	    var imgs_length = imgs.length;
	    var showing = false;
	    for (var j=0; j<imgs_length; j++)
		if (imgs[j].src.indexOf(a.hostname)) {
		    showing = true;
		    break;
		}
	    if (showing) continue;
	    
	    if (a.href in cache) {
		var img = d.createElement('img');
		img.style.display = 'block';
		img.src = cache[a.href];
		a.appendChild(img);
	    } else {
		GM_xmlhttpRequest({
		    method: "GET",
		    url: a.href,
		    onload: function(resp) {
			var _u = resp.responseText.match(pat, 'i')[1];
			for (var si=0; si<sizes.length; si++) {
			    if (_u.indexOf(sizes[si]) > -1) {
				cache[resp.finalUrl] = _u.replace(sizes[si], '/pic/t_');
				break;
			    }
			}
		    }
		});
	    }
	}
	setTimeout(main, 10000);
    }
    setTimeout(main, 100);
}(document));
