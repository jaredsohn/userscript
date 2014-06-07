// ==UserScript==
// @name           HateBrushup
// @namespace      mapee.jp
// @description    http://www.mapee.jp/wlh/greasemonkey.html
//                 Hatena Bookmark Brush up !
// @include        http://b.hatena.ne.jp/*/
// ==/UserScript==

(function() {
	var url = location.href;
	var uh = document.getElementById('user-header');
	
	var element = document.createElement('div');
	element.innerHTML = "HateBrushup<br />\n";
	
	// 今日
	var date = new Date();
	var dateLink = buildLink(date);
	element.innerHTML += dateLink;
	
	// 昨日
	var oneday = computeDate(1);
	var onedayLink = buildLink(oneday);
	element.innerHTML += onedayLink;
	
	// 1週間前(7日前)
	var oneweek = computeDate(7);
	oneweekLink = buildLink(oneweek);
	element.innerHTML += oneweekLink;
	
	// 1ヶ月前(30日前)
	var onemonth = computeDate(30);
	var onemonthLink = buildLink(onemonth);
	element.innerHTML += onemonthLink;
	
	// 半年前(180日前)
	var halfyear = computeDate(180);
	var halfyearLink = buildLink(halfyear);
	element.innerHTML += halfyearLink;
	
	// 1年前
	var oneyear = new Date((date.getFullYear() - 1), date.getMonth(), date.getDate());
	var oneyearLink = buildLink(oneyear);
	element.innerHTML += oneyearLink;
	
	uh.appendChild(element);
	
	// 現在の日付から、n日前の日付を求める関数
	// Dateオブジェクトを返す
	function computeDate(ndays) {
		var dt = new Date();
		var nowTime = dt.getTime();
		var ndaysSec = ndays * 86400000;
		var ndaysTime = nowTime - ndaysSec;
		dt.setTime(ndaysTime);
		return dt;
	}
	
	// Dateオブジェクトを受け取り、Link文字列のHTML組み立て
	function buildLink(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (month < 10) { month = "0" + month; }
		var day = date.getDate();
		if (day < 10) { day = "0" + day; }
		var dateStr = year + "/" + month + "/" + day;
		var dateURL = url + year + month + day;
		var dateLink = ' | <a href="' + dateURL + '" target="_blank">' + dateStr + '</a>';
		return dateLink;
	}
}());