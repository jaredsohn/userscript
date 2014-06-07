// ==UserScript==
// @author         Mitsuhiro Setoguchi
// @name           Hatena Diary Unhighlighter
// @namespace      http://straitmouth.jp
// @description    set highlight off at Hatena Diary
// @include        http://d.hatena.ne.jp/*
// ==/UserScript==

(function(d){
    var spans = d.evaluate('//span[@class="highlight"]', d, null,
	                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0, span; span = spans.snapshotItem(i); i++) {
	span.className = span.className.replace('highlight', '');
    }
}(document));
