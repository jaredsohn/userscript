// ==UserScript==
// @name          Orkut Preto
// @namespace     http://insideorkut.110mb.com
// @description	  Skin Black gray by inside orkut
// @author        CSS by inside orkut
// @homepage      http://www.orkut.com/CommMsgs.aspx?cmm=22202204
// @include       http://orkut.com.br/*
// @include       https://orkut.com.br/*
// @include       http://*.orkut.com.br/*
// @include       https://*.orkut.com.br/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Theme Name: Black Gray by May*/a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color:#9C9C9C !important}#header li.logobg .logo{background-color:#1C1C1C !important}.listdark,.listitemdark,.listitemsel{background-color:#363636 !important}.module h2.collapse{border-color:#363636 !important}.newsitem{background-color:#1C1C1C !important}.promobg{background-color:#FFFFFF !important}body{background-image:url(http://br.geocities.com/shefcarib/black.bmp);color:#FF73BF; !important},div,ul,li,input,select,textarea,p,td,h1,h2,h3,body{color:#FF73BF;font-family:Verdana,Arial,sans-serif;font-size:12px;margin:0;padding:0;}.listfllrgblack{color:#c0c0c0;float:left;text-align:left;width:35%;}.userinfodivi,.ln,a.userbutton:hover{background-color:#1C1C1C!important}a.userbutton{border-color:#363636!important}.googbox,.pollborder{border-color:#363636 !important}.newsitem{border-color:4F4F4F!important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color:#4F4F4F !important}.floatdiv .floatcontent{border-color:# 4F4F4F!important}#header li{color:#E8E8E8 !important}.percentbarinner{background-color:#4F4F4F !important}#header,#header li.logobg,ul.intabs li.sel{background-color:#8B8682 !important}body:after{content:url(http://www.usagi.blogger.com.br/1000.gif)}.listitemsel{border-color:#4C4C4C !important}div.feedparent{color:#4F4F4F !important}.exampletxt{color:#4C4C4C !important}.ltxt,.rfdte{color:#E8E8E8!important}.formerror{color:#828282 !important}.promo,.warning{color:#CFCFCF !important}.alttxt{color:#828282 !important}.orkuttitle{color:#8B7B8B !important}.inlineerror{color:#CDB5CD !important}.percentbar{border-color:#FFF8FF !important}.requiredfield{color:#778899 !important}a.userbutton,.useremail{color:#E8E8E8 !important}.floatanchorselected{background-color:#1C1C1C !important}a,.floatanchornormal{color:#4F4F4F !important}span.adsurl{color:#B5B5B5 !important}.inlinecorrect{color:#8B7B8B!important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:#1C1C1C !important}a.userbutton:hover{color:#CDB5CD !important}#header li a,ul.intabs li.sel a{color:#1C1C1C !important}/* ao re-utilizar trechos desde usercss ou usar este usercss como base para criação de outros, favor conceder os devidos créditos ao autor */";
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
