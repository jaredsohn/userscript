// ==UserScript==
// @name         Github Improved Disk Space Meter
// @namespace    githubImprovedDiskSpaceMeter
// @include      /https:\/\/github\.com\/account([\?#].*)?/i
// @include      https://github.com/account*
// @match        https://github.com/account*
// @datecreated  2010-03-08
// @lastupdated  2010-03-08
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript displays how much disk space of your allotted disk space has been used.
// ==/UserScript==

(function(d){
	var meter = d.evaluate("//div[contains(@class,'usagebars')]/dl[contains(@class,'below')]",d,null,9,null).singleNodeValue;
	if(!meter) return;

	var percentage = d.evaluate("./dd/span",meter,null,9,null).singleNodeValue;
	if(!percentage) return;
	percentage = percentage.innerHTML.match(/[\d\.]+/);
	if(!percentage) return;
	percentage = percentage[0];

	var num = d.evaluate("./dt[contains(@class,'numbers')]/em",meter,null,9,null).singleNodeValue;
	if(!num) return;

	var maxNum = d.evaluate("./dt[contains(@class,'numbers')]",meter,null,9,null).singleNodeValue;
	if(!maxNum) return;
	maxNum = maxNum.innerHTML.match(/[\d\.]+/g);
	if(!maxNum) return;
	maxNum = maxNum[1];

	num.innerHTML = (maxNum*(percentage/100)).toString().match(/\d+(?:\.\d{1,5})/) + '<span class="suffix">GB</span>';
	GM_addStyle(".usagebars dl dd span{text-indent: 9px;}");
})(document);