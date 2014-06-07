// ==UserScript==
// @name           TvGuide - isolate listings
// @namespace      #avg
// @description    does what it says
// @include        http://www.tvguide.com/Listings/*
// @version        0.1.6
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function $(A) {return document.getElementById(A)}
function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A)}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
var isNonList = /\/listings\/setup/i.test(location.pathname), setup=$("l-l-w"), p = single("//div[@class='listings-w']");
document.body.innerHTML="";
document.body.appendChild(isNonList ? setup : p);
if(isNonList) {
	setup.setAttribute("style", "float:none;margin:0 auto;");
	return;
}
function fixLayout() {
	loop("//tr[@class='gridAdRow']", function() {remove(this)});
	$("gridDiv").setAttribute("style", "height:;overflow-y:visible;");
}
document.addEventListener("DOMNodeInserted", fixLayout, false);
fixLayout();
loop("//*[contains(@style, 'width: 760px')]", function() {
	this.style.width = "100%";
});
remove(single("//div[@class='listings-bottom-ad-w']"));
GM_addStyle(<><![CDATA[
#l-l-c {
	margin : 0 !important;
}
.timebarTable, #TvGridDiv, #gridTable {
	width:100% !important;
}
body, .gridLegend {
	background:white!important;
}
/* add your custom styles here (CSS format) */
.pcf { /*family*/

}
.pcn { /*news*/

}
.ch { /*channel listing */

}
.pcm { /*movie */

}
.pcf { /*family*/


}
]]></>.toString());