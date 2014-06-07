// ==UserScript==
// @name                   Orkut Preto
// @namespace              about:mozilla
// @description            Skins for Orkut
// @include                http://www.orkut.com/*
// @author                 ᠌ ᠌
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Theme Name: Black Gray by */a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color: !important}#header li.logobg .logo{background-color: !important}.listdark,.listitemdark,.listitemsel{background-color: !important}.module h2.collapse{border-color: !important}.newsitem{background-color: !important}.promobg{background-color:!important}body{background-image:url(http://i68.photobucket.com/albums/i27/rslonik/nM/400_naruto56.jpg);color:; !important},div,ul,li,input,select,textarea,p,td,h1,h2,h3,body{color:;font-family:Verdana,Arial,sans-serif;font-size:12px;margin:0;padding:0;}.listfllrgblack{color:;float:left;text-align:left;width:35%;}.userinfodivi,.ln,a.userbutton:hover{background-color:!important}a.userbutton{border-color:!important}.googbox,.pollborder{border-color:#363636 !important}.newsitem{border-color:!important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color:!important}.floatdiv .floatcontent{border-color:!important}#header li{color:!important}.percentbarinner{background-color: !important}#header,#header li.logobg,ul.intabs li.sel{background-color: !important}body:after{content:url(http://www.usagi.blogger.com.br/1000.gif)}.listitemsel{border-color: !important}div.feedparent{color: !important}.exampletxt{color: !important}.ltxt,.rfdte{color:!important}.formerror{color: !important}.promo,.warning{color:!important}.alttxt{color:!important}.orkuttitle{color:!important}.inlineerror{color: !important}.percentbar{border-color: !important}.requiredfield{color: !important}a.userbutton,.useremail{color: !important}.floatanchorselected{background-color:!important}a,.floatanchornormal{color: !important}span.adsurl{color: !important}.inlinecorrect{color:!important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color: !important}a.userbutton:hover{color: !important}#header li a,ul.intabs li.sel a{color: !important}/* ao re-utilizar trechos desde usercss ou usar este usercss como base para criaÃ§Ã£o de outros, favor conceder os devidos crÃ©ditos ao autor */";
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
