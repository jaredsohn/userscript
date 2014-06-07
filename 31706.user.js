// ==UserScript==
// @name          nfc / news1.co.il commercials skipper
// @namespace amirrima
// @version      0.1
// @description   in nfc / news1.co.il, automatically skips the "mador pirsumi" part when entering it.
// @include  http://www.nfc.co.il/PageLoad.aspx?*
// @include  http://www.news1.co.il/PageLoad.aspx?*
// ==/UserScript==

a=document.getElementsByTagName('a')
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
for (i=0;i<a.length;i++)
{
 if (a[i].hasAttribute('onclick'))
 {
	a[i].dispatchEvent(evt);
 }
}