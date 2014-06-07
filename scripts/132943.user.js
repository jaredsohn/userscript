// ==UserScript==
// @name		Comic Auto Loader
// @namespace	http://blog.bcse.tw/comic-auto-loader
// @description	Autoload comics in some chinese websites.
// @author		Grey Lee
// @license		Apache Software License
// @include		http://*99770*
// @include		http://*99comic*
// @include		http://*99manga*
// @include		http://*99mh*
// @include		http://*cococomic*
// @include		http://*2comic*
// @include		http://*8comic*
// @include		http://*6manga*
// @include		http://*sfacg*
// @version		1.0.3
// ==/UserScript==


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
		RewritePage();
	}

	else if (typeof wnd.sFiles != "undefined" && typeof wnd.sDS != "undefined" && typeof wnd.sPath != "undefined") {
		var pics = wnd.sFiles.split("|");

		var newChild = document.createElement("div");
		var s = wnd.sDS.split("|")[wnd.sPath - 1];
		for (var i = 0, len = pics.length; i < len; i++) {
			picURLs.push(s + pics[i]);
		}
		RewritePage();
	}

	// 8comic.com
	else if (typeof wnd.ch != "undefined" && typeof wnd.codes != "undefined" && typeof wnd.chs != "undefined" && typeof wnd.itemid != "undefined") {
		var p = 1;
		var ch = wnd.ch;
		var codes = wnd.codes;
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
		RewritePage();
	}
	//6manga
	else if (location.host.toString().indexOf("6manga") != -1) {	
		var navidHTML = document.getElementById("navid").innerHTML;
		var totalPage = parseInt(navidHTML.substring(navidHTML.lastIndexOf("/")+1,navidHTML.lastIndexOf("頁")),10);

		if(totalPage != "NaN")
		{
			var currentImgURL = document.getElementById("TheImg").src;

			for(var i=1;i<=totalPage ;i++)
			{
				var idStr = "00" + i.toString();
				var id = idStr.substr(idStr.length-3,idStr.length);
				picURLs.push(currentImgURL.substring(0,currentImgURL.indexOf(".jpg")-3) + id + ".jpg");
			}
			RewritePage();
		}
	}

	//sfacg
	else if(location.host.toString().indexOf("sfacg") != -1)
	{
		wnd.addEventListener("load", function load(event){  
			if(wnd.picAy != "undefined")
			{
				picURLs = wnd.picAy; 
				RewritePage();
			}
		},false);
	}

function RewritePage()
{
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
		img.style.width = document.documentElement.clientWidth-200;
		newChild.appendChild(img);
	}
	
	document.body.appendChild(newChild);

	//patch
	if(location.host.toString().indexOf("sfacg") != -1)
	{
				document.styleSheets[0].cssRules[0].style.height="";
				document.styleSheets[0].cssRules[0].style.overflow = "auto";
	}
}