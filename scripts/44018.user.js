// ==UserScript==
// @author         Mitsuhiro Setoguchi
// @name           kakaku.com search result expander
// @namespace      http://straitmouth.jp
// @description    expands the anchor texts of search results at kakaku.com
// @include        http://kakaku.com/*
// ==/UserScript==

(function(d){
    if(window != top) return;

    function _expand_text(anc) {
	var abbr = '...';
	if (! anc.text) return;
	if (anc.text.indexOf(abbr) != (anc.text.length - abbr.length)) return;

	var req = {
	    method: "GET",
	    url: anc.href,
	    onload: function(res) {
		var mo = res.responseText.match(/<title>([\s\S]*?)<\/title>/i);
		if (mo) {
		    anc.title = 'was ' + anc.text;
		    anc.innerHTML = mo[1];
		}
	    },
	    onerror: function(res) {
		GM_log('Error with ' + anc.href);
	    }
	};

	if (anc.href.indexOf('http://kakaku.com/') == 0)
	    req["overrideMimeType"] = "text/html; charset=Shift_JIS";
	else if (anc.href.indexOf('gnavi.co.jp') > -1)
	    req["overrideMimeType"] = "text/html; charset=EUC-JP";

	GM_xmlhttpRequest(req);
    }

    var ancs = d.evaluate('//a[@class="title"]', d, null,
			  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0, anc; anc=ancs.snapshotItem(i); i++)
	_expand_text(anc);

}(document));
