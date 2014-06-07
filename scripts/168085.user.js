// ==UserScript==
// @name        Load contents for livedoor News
// @namespace   load_contents_livedoor
// @description Load contents for livedoor News
// @include     http://news.livedoor.com/topics/detail/*
// @author      Myung-bak Lee
// @version     1.0.4
// ==/UserScript==
(function () {
    //var next = $x('//div[@id="detailHeadline"]/h3/a');
    //var next = $x('/html/body/div[3]/div/div/div/div[2]/div[2]/p/a');
	//var next = $x('/html/body/div[2]/div[2]/div/div/div/div[2]/div[2]/p/a');
    var next = $x('/html/body/div/div[4]/div[2]/p/a');
	//var sport = $x('/html/body/div[3]/div/div/div/div[3]/div[2]/p/a');
	//var sport = $x('/html/body/div/div[4]/div[2]/div[2]/p/a');
	//var it = $x('/html/body/div[2]/div[2]/div/div/div/div[3]/div[2]/p/a');
	//next = next.concat(sport, it);

	if (next.length >= 1) {
        location.replace(next[0].href);
    }

    function $x(query) {
        var results = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i=0, l=results.snapshotLength, r=[]; i<l; i++) {
           r.push(results.snapshotItem(i));
        }

        return r;
    }
})();
