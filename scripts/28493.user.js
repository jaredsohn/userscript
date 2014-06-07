// ==UserScript==
// @name           tweak TZ for tv.yahoo.co.jp
// @namespace      http://sekimura.vox.com/
// @include        http://tv.yahoo.co.jp/vhf/*
// @include        http://tv.yahoo.co.jp/bs_digital/*
// @include        http://tv.yahoo.co.jp/radio/*
// @include        http://tv.yahoo.co.jp/listings/*
// ==/UserScript==

(function() {

var tzDiff = 9 + new Date().getTimezoneOffset()/60;
var pad = function (val, len) {
    val = new String(val);
    len = parseInt(len) || 2;
    while(val.length < len) {
        val = "0" + val;
    }
    return val;
};

var xpathExp = '//span[@class="detail"]/span[@class="time"]';
var xpathResult = document.evaluate(xpathExp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < xpathResult.snapshotLength; i++) {
    var el = xpathResult.snapshotItem(i);
    var hhmm = el.textContent.split(String.fromCharCode("8203")).join('');
    var result = hhmm.match(/([0-9]+):([0-9]+)/);
    if (result[1]) {
        var d = new Date();
        d.setHours(result[1] - tzDiff);
        el.innerHTML = pad(d.getHours()%12) + ":" + result[2];
    }
}

})();
