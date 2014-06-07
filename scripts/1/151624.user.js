// ==UserScript==
// @name           google direct search
// @namespace      http://blog.whosemind.net
// @description    去掉google搜索结果的跳转(http://www.google.com/url?), 而直接用原始链接
// @version        0.0.6

// @include        /^https?:\/\/www\.google\.[^\/]+?\/(#.*|webhp.*|search\?.*)?$/
// @include        /^http?:\/\/www\.google\.[^\/]+?\/(#.*|webhp.*|search\?.*)?$/
// @include        /^http?:\/\/74\.125\.71\.105\/(#.*|webhp.*|search\?.*)?$/
// @include        /^http?:\/\/74\.125\.128\.100\/(#.*|webhp.*|search\?.*)?$/

// ==/UserScript==
document.addEventListener('DOMSubtreeModified',doPage,false);
//alert("1");
function doPage() {
    var ts = document.evaluate('//a[@class="l"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<ts.snapshotLength;i++) {
        var t = ts.snapshotItem(i);
        var href = t.getAttribute('href');
        if (href) {
			var m = href.match(/&url=([^&]*)/);//alert(m);
			if (!m) {
				//t.setAttribute('href',decodeURIComponent(m[1]));
                                t.setAttribute('href',decodeURI(t.getAttribute('href')));
				//break;
			}
        }
    } 
    var m=document.getElementsByTagName("BODY");
    if (m[0].innerHTML.indexOf('return rwt')>=0)
        m[0].innerHTML=m[0].innerHTML.replace(/return rwt/g, "return");
}

doPage();
