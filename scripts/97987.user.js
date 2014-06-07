// ==UserScript==
// @name			IncrasebuxMonitor
// @namespace		DRL
// @description		IncraseBux广告页面自动刷新，自动点开广告
// @version			2011.02.24 v1.0 beta
// @include			https://*incrasebux.com/ads.php
// ==/UserScript==

/***************************
2011.02.24: v1.0 beat
	按照与onbuxMonitor脚本类似的方式，自动检查广告，发现后自动打开
	配合广告页面的监控脚本，可以在完成点击后自动关闭，并刷新广告列表页面
	如果未安装广告页面监控脚本，广告列表页面需要手动刷新
****************************/

/* 首先判断是否有可点击的广告 */
var countdown = true;
var allDivs, thisDiv, imgId, spanId;
var btn, span, href;
allDivs = document.evaluate(
	"//img[@src='themes/GeN3/images/plus_32.png']/..",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (allDivs.snapshotLength != 0)
{
	thisDiv = allDivs.snapshotItem(0);
	imgId = thisDiv.id.slice(5,-1);

	spanId = "da"+imgId+"c";
	span = document.getElementById(spanId);
	span.firstElementChild.id="toclick2";

	countdown = false;

	window.setTimeout(function(){
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, true);

		document.getElementById('toclick2').dispatchEvent(evt);
	}, 500);
}

/* 页面刷新设置 */
if(!GM_getValue('interval0')) { GM_setValue('interval0', '120'); };
if(!GM_getValue('interval1')) { GM_setValue('interval1', '240'); };
var interval0 = Math.round(GM_getValue('interval0'));
var interval1 = Math.round(GM_getValue('interval1'));
var interval = interval0 + Math.round(Math.random()*interval1);
if (interval < 10) interval = 10;

var infoTable, infoTd, setTd;
infoTable = document.evaluate(
	"//div[@id='content']/table/tbody/tr/td",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
if (infoTable.snapshotLength != 0)
{
	infoTd = document.createElement("td");
	infoTd.className = "noise";
	infoTd.id = "countdown";
	infoTd.width = "100";
	infoTable.snapshotItem(0).parentNode.insertBefore(infoTd, infoTable.nextSibling);

	setTd = document.createElement("td");
	setTd.className = 'noise';
	setTd.align = 'right';
	setTd.innerHTML = '刷新间隔=固定<input id="interval0" type="integer" size="2" maxlength="3" value="'+interval0+'">秒+';
	setTd.innerHTML+= '随机<input id="interval1" type="integer" size="3" maxlength="4" value="'+interval1+'">秒 ';
	setTd.innerHTML+= '<button id="setit">设置</button>';
	infoTable.snapshotItem(0).parentNode.insertBefore(setTd, infoTable.nextSibling);
	
	document.addEventListener('click', function(event) {
		if (event.target.id == "setit")
		{
			interval0 = Math.round(document.getElementById('interval0').value);
			interval1 = Math.round(document.getElementById('interval1').value);
			GM_setValue('interval0', interval0);
			GM_setValue('interval1', interval1);
			interval = interval0 + Math.round(Math.random()*interval1);
			if (interval < 10) interval = 10;
			countdown = true;
		}
	}, true);
}

window.intervalID = window.setInterval(function(){
	if (countdown)
	{
		interval -= 1;
		document.getElementById('countdown').innerHTML = interval;
		if (interval == 0) {
			window.clearInterval(window.intervalID);
			window.location.replace(window.location.href);
		}
	}
}, 1000);

GM_registerMenuCommand('设置固定刷新间隔', function() {
	GM_setValue('interval0', window.prompt('页面刷新间隔=固定刷新间隔+随机刷新间隔\n\n请输入页面的固定刷新间隔(秒)：', GM_getValue('interval0')));
});
GM_registerMenuCommand('设置随机刷新间隔', function() {
	GM_setValue('interval1', window.prompt('页面刷新间隔=固定刷新间隔+随机刷新间隔\n\n请输入页面的随机刷新间隔(秒)：', GM_getValue('interval1')));
});