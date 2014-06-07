// ==UserScript==
// @name				fanfou background customize & click reply
// @description			replace background image & click reply on fanfou
// @include				http://*.fanfou.com/*
// @include				http://fanfou.com/*
// ==/UserScript==
    

var css = "body {background: url(http://photo8.yupoo.com/20070610/120508_1799595277.jpg) fixed repeat top left; }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}

loadreply();
convertimage();

function loadreply() {
	var stream = document.getElementsByTagName("ol")[0];
	var list = stream.getElementsByTagName("li");
	for(var i=0;i<list.length;i++){
		var item = list[i];
		if( item.getAttribute("class") != "sys odd") {
			var title = item.getElementsByTagName("a")[0].title + "&nbsp;";
			var d = document.createElement('span');
			d.innerHTML = " <span class=\"op\"><a onclick=javascript:document.getElementsByTagName(\"textarea\")[0].value=\"@" + title + "\";document.getElementsByTagName(\"textarea\")[0].focus();>reply</a></span>";
			item.appendChild(d);
		}
	}
}

function convertimage() {
	var stream = document.getElementsByTagName("ol")[0];
	var spans = stream.getElementsByTagName("span");
	for(var i=0;i<spans.length;i++){
		var span = spans[i];
		if( span.getAttribute("class") == "content") {
			var hrefs = span.getElementsByTagName("a");
			for(var j=0;j<hrefs.length;j++){
				var href= hrefs[j];
				if(href.href.indexOf(".gif")>0 || href.href.indexOf(".jpg")>0) {
					href.innerHTML = "<p><img src=\"" + href.href + "\" /></p>";
				}
			}
		}
	}
}

