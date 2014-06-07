// ==UserScript==
// @name           豆瓣推荐搜索
// @namespace      douban.com
// @description    在豆瓣（douban.com）自己或他人的推荐中进行搜索
// @include        http://www.douban.com/people/*/recs*
// @match          http://www.douban.com/people/*/recs*
// @version        0.2
// @author         xz
// ==/UserScript==

(function() {

function $(s, r) {
	return (r?r:document).querySelectorAll(s);
}
function $1(s, r) {
	return (r?r:document).querySelector(s);
}
function $get(url, func, userData) {
	var httpReq = new XMLHttpRequest();
	httpReq.onload = function() {
		func.call(window, (httpReq.status==200?httpReq.responseText:null), url, userData);
	};
	httpReq.onerror = function(e) {
		func.call(window, null, url, userData);
	};
	httpReq.open("GET", url, true);
	httpReq.send();
}
function filter(li, keywords) {
	var flag = true;
	var summary = ""
	var ta = $("span.pl2>a", li);
	for(var j = 0; j < ta.length; j++) {
		summary += ta[j].textContent + " ";
	}
	var c = $1("div.broadsmr", li);
	if(c) {
		summary += $1("div.broadsmr", li).childNodes[0].textContent.replace(/^[\n ]+|[\n ]+$/) + " ";
	}
	var q = $1("div.quote > span.inq", li);
	if(q) {
		summary += q.textContent.replace(/^[\n ]+|[\n ]+$/);
	}

	summary = summary.toLowerCase();
	for(var j = 0; j < keywords.length; j++) {
		if(summary.indexOf(keywords[j]) < 0) {
			flag = false;
			break;
		}
	}
	li.style.display = flag?null:"none";
}

var ul = $1("#content div.article > ul");
if(!ul) {
	ul=document.createElement("ul");
	$1("#content div.article").appendChild(ul);
}

var sbox = document.createElement("div");
sbox.innerHTML = "<input style=\"min-height:18px;min-width:150px\"></input><input type=\"button\" style=\"min-height:18px;padding:0 5px\" value=\"搜索\"></input><span style=\"color:gray;margin-left:10px\">多个关键字用半角空格分隔</span>";

ul.parentNode.insertBefore(sbox, ul);

$1("input:not([type])", sbox).addEventListener("keypress", function(evt) {
	if(evt.keyCode==13) {
		var cevt=document.createEvent("MouseEvents");
		cevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		evt.target.nextElementSibling.dispatchEvent(cevt);
	}
}, false);
$1("input[type]", sbox).addEventListener("click", function(evt) {
	const btn = evt.target;
	if(btn.value != "搜索") {
		return;
	}
	var text = btn.previousElementSibling.value;
	var p = $1(".paginator");
	var pl2 = $1(".article > p.pl2");
	if(!text || !text.replace(/^ +/,"")) {
		var list = $("li.mbtr");
		for(var i = 0; i < list.length; i++) {
			if(i < 20) {
				list[i].style.display = null;
			} else {
				list[i].style.display = "none";
			}
		};
		if(p) {
			p.style.display = null;
		}
		if(pl2) {
			pl2.style.display = null;
		}
		return;
	}

	btn.value = "搜索中...";
	if(p) {
		p.style.display = "none";
	}
	if(pl2) {
		pl2.style.display = "none";
	}

	var keywords = text.replace(/^ +| +$/,"").toLowerCase().split(/ +/);
	var url = window.location.href;
	var curpage = 0;
	if(url.match("start=(\\d+)")) {
		curpage = parseInt(RegExp.$1) / 20;
	}
	if(url.indexOf("?") < 0) {
		url = url + "?start=";
	} else {
		url = url.replace(/\?.*/,"?start=");
	}

	var list = $("li.mbtr");
	for(var i = 0; i < list.length; i++) {
		var li = list[i];
		filter(li, keywords);
	}

	if(curpage == 0 && (!p || list.length < 20)) {
		btn.value = "搜索";
		return;
	}

	var index = 0;
	if(list.length > 20) {
		btn.value = "搜索";
		return;
	}
	if(curpage == 0) {
		index = 1;
	}
	$get(url + parseInt(index * 20), function(data, curl, idx) {
		if(!data) {
			btn.value = "搜索";
			return;
		}
		btn.value = "搜索中 @ p" + idx;
		var regex = /<li class="mbtr">([\s\S]*?)<\/li>/g;
		var ldata = null;
		var flag = false
		while (ldata = regex.exec(data)) {
			var li = document.createElement("li");
			li.className = "mbtr";
			li.innerHTML = ldata[1];
			li.setAttribute("idx", idx);
			filter(li, keywords);
			ul.appendChild(li);
			var div = document.createElement("div");
			div.className = "clear";
			ul.appendChild(div);
			flag = true;
		}
		if (flag) {
			idx++;
			if(idx == curpage) {
				idx++;
			}
			$get(url + parseInt(idx * 20), arguments.callee, idx);
		} else {
			btn.value = "搜索";
		}
	}, index);
}, false);

})();
