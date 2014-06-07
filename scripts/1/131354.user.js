// ==UserScript==
// @match          <all_urls>
// @include        *
// @name           deviantArt AJAX link expander
// @namespace      http://mathrick.org/da-unajax
// @description    Expand the dA AJAX URLs (http://www.deviantart.com/#/d4tn5g0) into their full forms (http://sakimichan.deviantart.com/art/Hua-Mulan-291653712)
// @version        0.4
// ==/UserScript==

const token = "dAStorage_WxJascjhawUW76809asdnn_";
const rx = RegExp("^https?://(.*\\.)?deviantart.com/#/(d[a-zA-Z0-9]+)")

function expandify(link)
{
    var id = link.href.match(rx);
    if (!id) return; else id = id[2];
    var target = localStorage[token + id];
    if (typeof(target) == 'undefined') {
        GM_log(link.href + " not known yet");
        GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://backend.deviantart.com/oembed?url=' + encodeURIComponent(link.href),
	    onload: function (r) {
	        if (r.status != 200) return;
	        var d = JSON.parse(r.responseText);
	        if (!d.url) return;
		var title = (d.title.match(/\w+/g) || []).join('-');
                target = d.author_url + "/art/" + title + "-" + parseInt(id.replace(/^d/,""), 36);
                localStorage[token + id] = target;
                GM_log(link.href + " -- got long URL: " + target);
                link.href = target;
	    }
        });
    } else {
        link.href = target;
    }
}

var victims = document.querySelectorAll('a[href*="deviantart.com/"][href*="#/d"]');
for (var len = victims.length, i = 0; i < len; i++) {
	expandify(victims[i]);
}
