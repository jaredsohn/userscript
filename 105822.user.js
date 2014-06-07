// ==UserScript==
// @name        Google search date limiter
// @namespace   http://0-oo.net/
// @description Add the date-range selector on Google Search.
// @homepage    http://0-oo.net/log/category/javascript/google-search-date-limiter/
// @version     0.6.6
// @grant       none
// @include     http*://www.google.tld/search*
// @include     http*://www.google.tld/webhp*
// @include     http*://www.google.tld/imghp
// @include     http*://www.google.tld/ig*
// @include     http*://www.google.tld/#*
// @include     http*://www.google.tld/
// ==/UserScript==
//
// ( The MIT License )
//
setInterval(function() {
	if (document.getElementsByTagName("SELECT").length) {	//消えたらまた追加する
		return;
	}
    
	var btn = document.getElementsByName("btnG")[0];
	
	if (!btn) {
		return;
	}
	
	var btnDiv = btn.parentNode;	//検索ボタンを含むdiv
	btnDiv.setAttribute("style", "white-space:nowrap");
	
	//（あれば）指定された期間
	var selected = decodeURIComponent(location.search).match(/tbs=qdr:([a-z])([0-9]+)/) || [];
	
	//数字のselect
	var selNum = document.createElement("select");
	selNum.appendChild(document.createElement("option"));
	
	for (var i = 1; i < 60;) {
		var opt = document.createElement("option");
		opt.appendChild(document.createTextNode(i));
		
		if (i == selected[2]) {
			opt.selected = true;
		}
		
		selNum.appendChild(opt);
		
		if (i < 10) {
			i++;
		} else {
			i += 10;	//10以上は10ずつ増加
		}
	}
	
	btnDiv.appendChild(selNum);
	
	//単位のselect
	var selUnit = document.createElement("select");
	var units = {}, suffix = "";
	
	if (navigator.language == "ja") {
		units = { s: "秒", n: "分", h: "時間", d: "日", w: "週間", m: "ヶ月", y: "年" };
		suffix = " 以内";
	} else {
 		units = { s: "second", n: "minute", h: "hour", d: "day", w: "week", m: "month", y: "year" };
		suffix = "(s)";
	}
	
	for (var val in units) {
		opt = document.createElement("option");
		opt.setAttribute("value", val);
		opt.appendChild(document.createTextNode(units[val] + suffix));
		
		if (val == selected[1]) {
			opt.selected = true;
		}
		
		selUnit.appendChild(opt);
	}
	
	if (!selected[1]) {
		selUnit.selectedIndex = 5;	//デフォルトは"月"
	}
	
	btnDiv.appendChild(selUnit);
	
	btn.addEventListener("click", function() {
		if (!selNum.selectedIndex && !selected) {
			return;	//数字を選んだ場合のみ期間限定にする
		}
		
		var url = "/search?q=";
		
		//検索ワード
		url += encodeURIComponent(document.getElementsByName("q")[0].value);
		
		if (selNum.selectedIndex) {
			//期間
			var qdr = "qdr:" + selUnit.options[selUnit.selectedIndex].value;
			qdr += selNum.options[selNum.selectedIndex].text;
			url += "&tbs=" + qdr;
		}
		
		//（あれば）検索種類（画像検索等）
		url += location.href.match(/&tbm=[a-z]+/) || "";
		
		//（あれば）表示言語
		url += location.href.match(/&hl=[-a-z]+/i) || "";
		
		//（あれば）言語での絞り込み
		url += location.href.match(/&lr=lang_[-a-z]+/i) || "";
		
		//強制的に遷移させる
		setTimeout(function() { location.href = url; }, 800);
		return false;
	}, true);
}, 10);  	//レンダリング後のタイミングを見計らう
