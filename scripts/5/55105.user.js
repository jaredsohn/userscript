// ==UserScript==
// @name           one.lt ads remover
// @namespace      one.lt
// @description    one.lt
// @include        http://*.one.lt*
// ==/UserScript==

var stuff_to_remove = [
    "//table[@id='headerJsp']",
	"//div[@id='bannerCommunity1']",
	"//table[@id='footer']",
	"//table[@id='div_banner']",
	"//object[@id='flash']",
	"//div[@class='videoFrameContainer' and div/@class='videoImage']",
	"//div[@id='bannerCommunity4']",
	"//td[@id='bannerCommunity2']",
	"//div[@id='bannerCommunity3']",
	"//div[@id='bannerCommunity5']",
	"//div[@id='bannerCommunity2']",
	"//table[@id='table_banner']/tbody/tr/td",
	"//td[@id='bannerInfoblock2']",
	"//td[@id='bannerF5']",
];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);