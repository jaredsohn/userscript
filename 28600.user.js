// ==UserScript==
// @name          Orkut Verde limão
// @namespace     http://insideorkut.110mb.com
// @description	  SkinVerde by inside orkut brasil
// @author        CSS by inside orkut
// @homepage      http://www.orkut.com/Community.aspx?cmm=22563383
// @include       http://orkut.com.br/*
// @include       https://orkut.com.br/*
// @include       http://*.orkut.com.br/*
// @include       https://*.orkut.com.br/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Theme Name: Citric by May*/a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color:#E8FEB0 !important}#header li.logobg .logo{background-color:#A4D60C !important}.listdark,.listitemdark,.listitemsel{background-color:#D9FE7D !important}.module h2.collapse{border-color:#D9FE7D !important}.newsitem{background-color:#D3FE68 !important}.promobg{background-color:#DAFE7F !important}body,.userinfodivi,.ln,a.userbutton:hover{background-color:#D1FE60 !important}a.userbutton{border-color:#C0FE26 !important}.googbox,.pollborder{border-color:#A2E300 !important}.newsitem{border-color:#96D300 !important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color:#88BF00 !important}.floatdiv .floatcontent{border-color:#7DAF00 !important}#header li{color:#7AAC00 !important}.percentbarinner{background-color:#C2FF1D !important}#header,#header li.logobg,ul.intabs li.sel{background-color:#96CE00 !important}body:after{content:url(http://www.usagi.blogger.com.br/1000.gif)}.listitemsel{border-color:#96CE00 !important}div.feedparent{color:#72A100 !important}.exampletxt{color:#5C8100 !important}.ltxt,.rfdte{color:#80797c !important}.formerror{color:#4F7000 !important}.promo,.warning{color:#4F7000 !important}.alttxt{color:#4E6F00 !important}.orkuttitle{color:#4D6E00 !important}.inlineerror{color:#4C6C00 !important}.percentbar{border-color:#A4D60C !important}.requiredfield{color:#688E02 !important}a.userbutton,.useremail{color:#6E9600 !important}.floatanchorselected{background-color:#557400 !important}a,.floatanchornormal{color:#5C7E00 !important}span.adsurl{color:#466000 !important}.inlinecorrect{color:#354800 !important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:#182300 !important}a.userbutton:hover{color:#3C5200 !important}#header li a,ul.intabs li.sel a{color:#fff !important}/* ao re-utilizar trechos desde usercss ou usar este usercss como base para criação de outros, favor conceder os devidos créditos ao autor */";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
