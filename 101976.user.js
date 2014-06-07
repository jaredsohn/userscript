// ==UserScript==
// @name			BigTimeBuxMonitor
// @namespace		DRL
// @description		BigTimeBux广告页面自动点开广告
// @version			2011.04.29 v1.0
// @include			http://bigtimebux.com/ads.php
// @include			https://bigtimebux.com/ads.php
// @include			http://www.bigtimebux.com/ads.php
// @include			https://www.bigtimebux.com/ads.php
// ==/UserScript==

/* 首先判断是否有可点击的广告 */
var countdown = true;
var allDivs, thisDiv, imgId, spanId;
var btn, span, href;
allDivs = document.evaluate(
	"//div[@class='surf']/div[@class='image']/../div[2]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (allDivs.snapshotLength != 0)
{
	thisDiv = allDivs.snapshotItem(0);
	adsId = thisDiv.id.replace("da","").replace("a","");

	spanId = "da"+adsId+"c";
	span = document.getElementById(spanId);
	href = span.firstElementChild.href;
	href = href.substring(href.indexOf('?')+1);

	var formhtml = '<form type="GET" target="_blank" action="/cks.php">';
	var pieces = href.split('&');  
	for (var i = 0; i < pieces.length; i++){
		var pos = pieces[i].indexOf("=");
		var keyName = pieces[i].substring(0, pos);
		var keyVal = pieces[i].substring(pos+1);
		formhtml += '<input name="'+keyName+'" value="'+keyVal+'" type="hidden" />';
	}
	formhtml += '<button id="toclick2" type="submit">$</button>';
	formhtml += '</form>';

	form = document.createElement("div");
	form.innerHTML = formhtml;
	thisDiv.parentNode.insertBefore(form, thisDiv.nextSibling);

	window.setTimeout(function(){
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, true);

		document.getElementById('toclick2').dispatchEvent(evt);
	}, 500);
}
