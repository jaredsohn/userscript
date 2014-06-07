// ==UserScript==
// @name            Comic Auto Loader
// @namespace       http://blog.bcse.tw/comic-auto-loader
// @description     Autoload comics in some chinese websites.
// @author          Grey Lee
// @license         Apache Software License
// @include         *://*.99770.cc/manga/*
// @include         *://*.99770.cc/manhua/*
// @include         *://99770.cc/manga/*
// @include         *://99770.cc/manhua/*
// @include         *://*.99comic.com/manga/*
// @include         *://*.99comic.com/manhua/*
// @include         *://99comic.com/manga/*
// @include         *://99comic.com/manhua/*
// @include         *://*.99manga.com/manga/*
// @include         *://*.99manga.com/manhua/*
// @include         *://*.99manga.com/page/*
// @include         *://99manga.com/manga/*
// @include         *://99manga.com/manhua/*
// @include         *://99manga.com/page/*
// @include         *://*.99mh.com/manga/*
// @include         *://*.99mh.com/manhua/*
// @include         *://99mh.com/manga/*
// @include         *://99mh.com/manhua/*
// @include         *://*.cococomic.com/coco/*
// @include         *://*.cococomic.com/manga/*
// @include         *://*.cococomic.com/manhua/*
// @include         *://cococomic.com/coco/*
// @include         *://cococomic.com/manga/*
// @include         *://cococomic.com/manhua/*
// @include         *://2comic.com/view/*
// @include         *://*.2comic.com/view/*
// @include         *://8comic.com/love/*
// @include         *://*.8comic.com/love/*
// @include         *://8comic.com/show/*
// @include         *://*.8comic.com/show/*
// @version         1.2.3
// ==/UserScript==


window.setTimeout(function() {
	var wnd = unsafeWindow;
	
	if (window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		wnd = div.onclick();
	}

	var picURLs = [];

	if (typeof wnd.PicListUrl != "undefined" && typeof wnd.ServerList != "undefined" && typeof wnd.server != "undefined") {
		var pics = wnd.PicListUrl.split("|");

		var newChild = document.createElement("div");
		var s = wnd.ServerList[wnd.server - 1];
		for (var i = 0, len = pics.length; i < len; i++) {
			picURLs.push(s + pics[i]);
		}
	}

	// 8comic.com
	else if (typeof wnd.ch != "undefined" && typeof wnd.allcodes != "undefined" && typeof wnd.chs != "undefined" && typeof wnd.itemid != "undefined") {
		var p = 1;
		var ch = wnd.ch;
		var codes = wnd.allcodes.split('|');
		var chs = wnd.chs;
		var itemid = wnd.itemid;
		var host = wnd.location.host.split(".").slice(-2).join(".");
		var code = "";
		var cid = 0;
		for (var i = 0, len = codes.length; i < len; i++) {
			if (codes[i].indexOf(ch + " ") === 0) {
				cid = i;
				code = codes[i];
				break;
			}
		}
		if (code === "") {
			for (var i = 0, len = codes.length; i < len; i++) {
				if (parseInt(codes[i].split(" ")[0], 10) > ch) {
					cid = i;
					code = codes[i];
					ch = parseInt(codes[i].split(" ")[0], 10);
					break;
				}
			}
		}
		if (code === "") {
			cid = codes.length - 1;
			code = codes[cid];
			ch = chs;
		}

		var code_ = code.split(" ");
		var num = code_[0], sid = code_[1], did = code_[2], page = code_[3], code = code_[4];

		var newChild = document.createElement("div");
		for (; p <= page; p++) {
			var m = (parseInt((p - 1) / 10, 10) % 10) + (((p - 1) % 10) * 3);
			var img_name = ("00" + p).substr(-3) + "_" + code.substring(m, m + 3);
			var img = new Image();
			picURLs.push("http://img" + sid + "." + host + "/" + did + "/" + itemid + "/" + num + "/" + img_name + ".jpg");
		}
	}

	// Remvoe all elements in <body>
	while (document.body.childNodes.length >= 1) {
		document.body.removeChild(document.body.firstChild);       
	}
	document.body.style.textAlign = "center";
	document.body.style.direction = "rtl";

	// Generate results
	var newChild = document.createElement("div");
	for (var i = 0, len = picURLs.length; i < len; i++) {
		var img = new Image();
		img.src = picURLs[i];
		img.style.margin = "40px 10px 60px";
		newChild.appendChild(img);
	}
	
	document.body.appendChild(newChild);


	// Previous & Next
	var links = document.createElement("div");
	links.style.direction = "ltr";
	links.style.margin = "0 10px 100px";
	if (ch > 1) {
		var prevLink = document.createElement("a");
		prevLink.href = wnd.location.href.replace("ch=" + ch, "ch=" + (ch - 1));
		prevLink.innerText = "← Previous";
		prevLink.style.fontSize = "2em";
		links.appendChild(prevLink);
	}
	links.appendChild(document.createTextNode("  "));
	if (chs > ch) {
		var nextLink = document.createElement("a");
		nextLink.href = wnd.location.href.replace("ch=" + ch, "ch=" + (ch + 1));
		nextLink.innerText = "Next →";
		nextLink.style.fontSize = "2em";
		links.appendChild(nextLink);
	}
	
	document.body.appendChild(links);
}, 0);