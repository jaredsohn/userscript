// ==UserScript==
// @name           3dnews.ru
// @namespace      3dnews.ru
// @description    3dnews.ru
// @include        http://www.3dnews.ru/*
// ==/UserScript==

var stuff_to_remove = [
    "//body/table[@class='mtable']/tbody/tr/td[@class='btr_right']",
	"//body/table[@class='mtable']/tbody/tr[1]/following-sibling::tr[1]",
	"//body/table[@class='mtable']/tbody/tr/td[@class='htr_center']",
	"//body/table[@class='mtable']/tbody/tr/td[@class='htr_left']",
	"//body/table[@class='mtable']/tbody/tr/td[@class='btr_center']/div[1]",
	"//div[@class='bwmess_body']",
	"//body/table[@class='mtable']/tbody/tr/td[@class='btr_left']/div[1]",
	"//body/table[@class='mtable']/tbody/tr/td[@class='preftr_left']",
	"//body/table[@class='mtable']/tbody/tr/td[@class='preftr_center']",
	"//body/table[@class='mtable']/tbody/tr[6]",
	"//body/table[@class='mtable']/tbody/tr/td[@class='ftr_left']/following-sibling::td[@class='ftr_center']",
	"//div[@class='news_reviews']",
	"//body/table[@class='mtable']/tbody/tr[1]/following-sibling::tr[1]",
	"//body/table/tbody/tr/td/div[2]",
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

var n = document.getElementsByTagName('body')[0];
if (document.baseURI.indexOf("/news")>-1) n.innerHTML = n.innerHTML + '<a href=\"http://www.3dnews.ru/software-news\">Software News</a>';
else n.innerHTML = n.innerHTML + '<a href=\"http://www.3dnews.ru/news\">Hardware News</a>';