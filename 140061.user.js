// ==UserScript==
// @name          mixiチェック for Flickr
// @namespace     http://www.chipple.net/tools/gmscripts
// @include       http://www.flickr.com/photos/*
// @version       1.1
// ==/UserScript==

function gm_mcff_onClick() {
	//
	// ここにあるキーはこのユーザスクリプト専用に登録したものです。
	// 他の目的でキーが必要の場合は、 http://developer.mixi.co.jp/ で登録してください。
	//
	// The key embedded here is registered for this UserScript only.
	// If you need one for another purpose, make your own at http://developer.mixi.co.jp/
	//
	var u='http://mixi.jp/share.pl?u='+encodeURIComponent(location.href)+'&k=75b16864244166e2c1ba69b6b7dd6c79ffaa549b';
	window.open(u,'share','width=632,height=456,location=yes,resizable=yes,toolbar=no,menubar=no,scrollbars=no,status=no');
}

function gm_mcff_addSmallIcon() {
	var parent_ul = document.getElementById("button-bar");
	if (!parent_ul) return;
	var lis = parent_ul.childNodes;
	var insert_before_this_li;
	for (var i = lis.length-1; i >= 0; i--) {
		if (lis[i].tagName == "LI") {
			if (lis[i].className.indexOf("share-service-last") != -1) {
				lis[i].className = lis[i].className.replace("share-service-last", "");
				break;
			}
			insert_before_this_li = lis[i];
		}
		// If not found, do nothing
		if (i == 0) return;
	}
	if (!insert_before_this_li) return;
	var new_li = document.createElement("li");
	new_li.className = "share-this-v3 share-service share-service-last";
	var new_span_options = document.createElement("span");
	new_span_options.className = "share-service-options";
	var new_span_butt = document.createElement("span");
	new_span_butt.className = "Butt";
	var new_a = document.createElement("a");
	new_a.className = "share-dialog-action share-icon";
	new_a.title = "Check on mixi";
	new_a.innerHTML = "Check on mixi";
	new_a.addEventListener("click", gm_mcff_onClick, true);
	new_a.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKXRFWHRDcmVhdGlvbiBUaW1lAInOIDMxIDcgMjAxMiAyMjo0ODozOCArMDkwMLoFRbMAAAAHdElNRQfcCAENBRxASmEJAAAACXBIWXMAAArwAAAK8AFCrDSYAAAABGdBTUEAALGPC/xhBQAAAVlQTFRFAPkA7e3tzMzM0tLS1NTUzs7O7u7u6Ojo5+fn5eLd5+Xk6urqz8/P6Ofk17t60a9f4dW76Ojn1dXV6+vr6+rq4NKw1LNozKNCy584yJYkxI4UxpQg6ujk19fX6uXb0q9cxZEZxZAUxZAW0rBh6+ji2NjY7u3o0q9ZxJAUxpMcxZEXxpEa2r+B7u3t2tra5di5xZAX4saE1KxO3btr27hn1bBW4cJ9yJcm6uTV29vb3cKGxY4U6tKc17JZ4cR+4MF42rZk586T4c6g3t7e3d3d3cKD6tKd2LNe4MJ74ODg6Niw6tSf6tSgyZkn8eC2yZop4sWD5MiH4suU4eHh9/PqzKI64MF65MiJ7tut7t2w7dqq8eG5zKA19OrR4uLi////7d25yJYh27tu5OTk7d21y5wv2LVi//rx+fPi4caG0aZFxpQdyZos1K1S6tep///5/Pfr/Pbo//nu+VA5VwAAAAF0Uk5TAEDm2GYAAADySURBVHjaLc9XV8JAFATgG0E3GsSy1th2oigYjbEiRkEwiIhgwV5YFXtD/f8PJsj3MOeeeZpLpLlMa2AuJ9Kkr/b981s/OFlevry+xd8/Pr9qUlpUlfLhUYfPfnqWVarI2zvDELYuBHDvFeXjE5yenV/kLq+uYd5UKL/roLBXLJT2Dw6BozK5WQfbOSR3sJkGsnlKrDlY30Ay5RfRzBZZczbmF7C4hOUVxFcTFJmcisamYZoQMczMWjSijI6J/x3G+IQSoW7Oe3r7+gcG9aHwMOdBCtW/Yu3hjs4uxliImE9V1dY2L1SmESlNgWBDoLmF/gAg+y6Ah1sgSwAAAABJRU5ErkJggg%3D%3D)";
	new_span_butt.appendChild(new_a);
	new_span_options.appendChild(new_span_butt);
	new_li.appendChild(new_span_options);
	parent_ul.insertBefore(new_li, insert_before_this_li);
}

function gm_mcff_addBigIcon() {
	var o = document.getElementById("share-options-services");
	if (!o) return;
	var os = o.getElementsByTagName("ul");
	if (os.length == 0) return;
	var parent_ul = os[0];
	var new_li = document.createElement("li");
	new_li.className = "share-service";
	var new_a = document.createElement("a");
	new_a.title = "Check on mixi"
	new_a.addEventListener("click", gm_mcff_onClick, true);
	var new_span_icon = document.createElement("span");
	new_span_icon.className = "share-icon-large";
	new_span_icon.style.cursor = "pointer";
	new_span_icon.style.backgroundImage = "url(data:image/png;base64,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%3D%3D)";
	var new_span_name = document.createElement("span");
	new_span_name.className = "service-name";
	new_span_name.style.cursor = "pointer";
	new_span_name.innerHTML = "mixi";
	new_a.appendChild(new_span_icon);
	new_a.appendChild(new_span_name);
	new_li.appendChild(new_a);
	parent_ul.appendChild(new_li);
}

function gm_mcff_onLoad() {
	gm_mcff_addSmallIcon();
	gm_mcff_addBigIcon();
}

function gm_mcff_checkUrl() {
	return new RegExp("^http://www\.flickr\.com/photos/[^/]+/[0-9]+(/|$)").test(location.href);
}

if (gm_mcff_checkUrl()) {
	gm_mcff_onLoad();
}