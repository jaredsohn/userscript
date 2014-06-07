// ==UserScript==
// @id             bro3_NoDel
// @name           「このカードを破棄する」ボタンを非表示にする＋援軍・敵襲・出撃・帰還時間を表示
// @version        1.3
// @include         http://m*.3gokushi.jp/*
// @icon           http://5zen.info/mikanbox/icon.png
// @run-at         document-end
// ==/UserScript==

// 2012.06.05	CTRL + ALT + D で 「このカードを破棄」を表示する
// 2012.07.12	援軍・敵襲・出撃・帰還時間を表示
// 2012.07.14	謎の\nがあったので対処

(function(){

	var dl = xpath('//a[@class="delete-card-button"]', document);
	var len = dl.snapshotLength;
	for(var i=0;i<len;i++){
		dl.snapshotItem(i).style.display = "none";
	}

	addEventListener("keydown",function(e)
	{
		if(e.altKey&&e.ctrlKey&&e.keyCode==68) {
			var dl = xpath('//a[@class="delete-card-button"]', document);
			var len = dl.snapshotLength;
			for(var i=0;i<len;i++){
				if (dl.snapshotItem(i).style.display != "none") {
					dl.snapshotItem(i).style.display = "none";
				} else {
					dl.snapshotItem(i).style.display = "block";
				}
			}
		}
	},true);
	var ret = xpath('//div[@class="useCpReturn"]', document);
	if (ret.snapshotLength) {
		ret.snapshotItem(0).style.display = "none";
	}

	var action1 = xpath('//div[@id="action"]/div[@class="floatInner"]/ul/li', document);
	var action2 = xpath('//div[@id="action"]/div[@class="floatInner"]/ul/li/span', document);
	var len = action1.snapshotLength;


	for (var i=0;i<len;i++){
		action1.snapshotItem(i).innerHTML = action1.snapshotItem(i).innerHTML.replace("%0A","");
		action1.snapshotItem(i).innerHTML = action1.snapshotItem(i).innerHTML + "<br><span>　　(" + generateDateString2(computeTime(action2.snapshotItem(i).innerHTML)) + ")</span>";
	}

})();

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function computeTime(clock) {
	var hour = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1")));
	if (isNaN(hour)) hour = 0;
	var min = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2")));
	if (isNaN(min)) min = 0;
	var sec = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3")));
	if (isNaN(sec)) sec = 0;

	var stime = xpath('//*[@id="server_time"]', document);
	var server_year  = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1"));
	var server_month = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2"));
	var server_day   = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3"));
	var server_hour  = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$4"));
	var server_min   = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$5"));
	var server_src   = parseInt(stime.snapshotItem(0).innerHTML.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$6"));

	var now = new Date(server_year,server_month,server_day,server_hour,server_min,server_src,0);
	var resTime = new Date();
	resTime.setHours(now.getHours() + hour);
	resTime.setMinutes(now.getMinutes() + min);
	resTime.setSeconds(now.getSeconds() + sec);
	
	return resTime;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}

//日時文字列編集2（mm/dd hh:mm:ss）
function generateDateString2(date) {
	var res = "" + padZero(date.getMonth() + 1) + "/" + padZero(date.getDate()) + 
		" " + padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + 
		":" + padZero(date.getSeconds());;
	return res;
}

//先頭ゼロ除去
function trimZero(str) {
	var res = str.replace(/^0*/, "");
	if (res == "") res = "0";
	return res;
}
//先頭ゼロ付加
function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
