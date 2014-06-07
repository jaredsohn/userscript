// ==UserScript==
// @name          pin02-ot
// @namespace     http://www.orkut.co.in/Main#Community?cmm=95917134
// @description	  pin022-ot
// @author        Vivek kumar
// @homepage      http://vrkmphoto.com/
// @include       http://orkut.com.br/*
// @include       https://orkut.com.br/*
// @include       http://*.orkut.com.br/*
// @include       https://*.orkut.com.br/*
// @include       http://orkut.com/*
// @include       https://orkut.com/*
// @include       http://*.orkut.com/*
// @include       https://*.orkut.com/*
// @include       http://orkut.co.in/*
// @include       https://orkut.co.in/*
// @include       http://*.orkut.co.in/*
// @include       https://*.orkut.co.in/*
// @include       http://orkut.co.uk/*
// @include       https://orkut.co.uk/*
// @include       http://*.orkut.co.uk/*
// @include       https://*.orkut.co.uk/*
// @include       http://orkut.pt/*
// @include       https://orkut.pt/*
// @include       http://*.orkut.pt/*
// @include       https://*.orkut.pt/*
// @include       http://orkut.com.au/*
// @include       https://orkut.com.au/*
// @include       http://*.orkut.com.au/*
// @include       https://*.orkut.com.au/*
// @include       http://orkut.es/*
// @include       https://orkut.es/*
// @include       http://*.orkut.es/*
// @include       https://*.orkut.es/*
// @include       http://orkut.ca/*
// @include       https://orkut.ca/*
// @include       http://*.orkut.ca/*
// @include       https://*.orkut.ca/*
// @include       http://orkut.co.nz/*
// @include       https://orkut.co.nz/*
// @include       http://*.orkut.co.nz/*
// @include       https://*.orkut.co.nz/*
// @include       http://orkut.gr/*
// @include       https://orkut.gr/*
// @include       http://*.orkut.gr/*
// @include       https://*.orkut.gr/*
// @include       http://orkut.de/*
// @include       https://orkut.de/*
// @include       http://*.orkut.de/*
// @include       https://*.orkut.de/*
// @include       http://orkut.nl/*
// @include       https://orkut.nl/*
// @include       http://*.orkut.nl/*
// @include       https://*.orkut.nl/*
// @include       http://orkut.be/*
// @include       https://orkut.be/*
// @include       http://*.orkut.be/*
// @include       https://*.orkut.be/*
// @include       http://orkut.ch/*
// @include       https://orkut.ch/*
// @include       http://*.orkut.ch/*
// @include       https://*.orkut.ch/*
// @include       http://orkut.bj/*
// @include       https://orkut.bj/*
// @include       http://*.orkut.bj/*
// @include       https://*.orkut.bj/*
// @include       http://m.orkut.com/*
// @include       https://m.orkut.com/*
// @include       http://*.m.orkut.com/*
// @include       https://*.m.orkut.com/*
// @include       http://www.orkut.*/*
// @include       http://images.orkut.*/*

// ==/UserScript==
(function() {
var css = "a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color:#ffeef7 !important}#header li.logobg .logo {\nbackground:transparent url(http://i796.photobucket.com/albums/yy243/vrkm2003/ol.jpg) !important;}.listdark,.listitemdark,.listitemsel{background-color:#fef2f8 !important}.module h2.collapse{border-color:#fde !important}.newsitem{background-color:#fcd8ea !important}.promobg{background-color:#fddfee !important}body,.userinfodivi,.ln,a.userbutton:hover{background-color:#fdebf4 !important}a.userbutton{border-color:#f3c7dd !important}.googbox,.pollborder{border-color:#e4a1c3 !important}.newsitem{border-color:#d396b5 !important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color:#c485a5 !important}.floatdiv .floatcontent{border-color:#bc7699 !important}#header li{color:#ffffff !important}.percentbarinner{background-color:#d40b5b !important}#header,#header li.logobg,ul.intabs li.sel{background-color:#fc5397 !important}.menu a[href=\"/Scrapbook.aspx\"].listitemsel{border-color:#c65990 !important}div.feedparent{color:#978 !important}.exampletxt{color:#cd3280 !important}.ltxt,.rfdte{color:#80797c !important}.formerror{color:#ff0080 !important}.promo,.warning{color:#dc1478 !important}.alttxt{color:#c61e72 !important}.orkuttitle{color:#c31e71 !important}.inlineerror{color:#936 !important}.percentbar{border-color:#c06 !important}.requiredfield{color:#c40062 !important}a.userbutton,.useremail{color:#733152 !important}.floatanchorselected{background-color:#9b024f !important}a,.floatanchornormal{color:#fa3576 !important}span.adsurl{color:#800040 !important}.inlinecorrect{color:#603 !important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:#4f0027 !important}a.userbutton:hover{color:#33091e !important}#header li a,ul.intabs li.sel a{color:#fff !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();