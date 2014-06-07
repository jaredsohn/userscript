// ==UserScript==
// @name           chinese-tools lyrics parser
// @namespace      default
// @include        http://www.chinese-tools.com/songs/*
// ==/UserScript==


var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    'YOUR TEXT HERE ' +
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);
var allElements = document.evaluate(
   // "//div[@class='ctf_cn']",
    "//div",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
var t='';
alert(allElements.snapshotLength+" elements to parse");
var c=0;
for (var i=0;i<allElements.snapshotLength;i++) {
var e=allElements.snapshotItem(i);
//GM_log(e.getAttribute('class'));
//GM_log(e.innerHTML);
	if (e.getAttribute('class') == 'ctf_cn')
	{
		c++;
		t=t+e.innerHTML;
	}
	else if (e.getAttribute('class')=='ctf_line' )
		t=t+"<br>\n";
}
alert(c+" elements added");
logo.innerHTML=t;