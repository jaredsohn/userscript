// ==UserScript==
// @name			onbuxMonitor
// @namespace		DRL
// @description		onbux广告页面自动刷新，自动点开广告
// @version			2011.02.17 v1.0
// @include			http://www.onbux.com/viewads
// ==/UserScript==

/*
2011.02.17 Update:
	配合读条脚本的修改，去除自动点击广告后的对话框提示，自动点击广告后需刷新页面才继续倒计时。
*/

/* 首先判断是否有可点击的广告 */
var countdown = true;
var allDivs, thisDiv, imgId, spanId;
var btn, span, href;
allDivs = document.evaluate(
	"//table[@class='subti bordown']/tbody/tr/td/div[@class='iconads iview1']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (allDivs.snapshotLength != 0)
{
	thisDiv = allDivs.snapshotItem(0);
	imgId = thisDiv.id.substring(3);

	spanId = "da"+imgId+"c";
	span = document.getElementById(spanId);
	href = span.firstElementChild.href;
	href = href.substring(href.indexOf('?')+1);

	var formhtml = '<form type="GET" target="_blank" action="/view">';
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

//	btn = document.createElement("div");
//	btn.innerHTML = '<button id="toclick1" onclick="clt(\''+imgId+'\')">1</button>';
//	thisDiv.parentNode.insertBefore(btn, thisDiv.nextSibling);

	window.setTimeout(function(){
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, true);

//		document.getElementById('toclick1').dispatchEvent(evt);
		document.getElementById('toclick2').dispatchEvent(evt);
		document.getElementById('img'+imgId).setAttribute('class','iconads iview2');
		countdown = false;
//		alert(allDivs.snapshotLength);
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
	"//table[@class='bordup']/tbody/tr/td",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
if (infoTable.snapshotLength != 0)
{
	infoTd = document.createElement("td");
	infoTd.className = "noise";
	infoTd.id = "countdown";
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