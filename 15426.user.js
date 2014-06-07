// ==UserScript==
// @name          orkut rosa Orkut Rosa
// @namespace     
// @description	  Orkut rosa
// @author        Criado para luila
// @blah
// @homepage      
// @blah
// @include       http://orkut.com/*
// @include       https://orkut.com/*
// @include       http://*.orkut.com/*
// @include       https://*.orkut.com/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Theme Name: Orkut Rosa*/a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color:#FFF0F8 !important}#header li.logobg .logo{background-color:#FF41A8 !important}.listdark,.listitemdark,.listitemsel{background-color:#FFE3F2 !important}.module h2.collapse{border-color:#FFC5E4 !important}.newsitem{background-color:#FFC5E4 !important}.promobg{background-color:#FFFFFF !important}body{background-image:url(http://frigid.myweb.hinet.net/images/cootwon/hello_kitty_044.jpg);color:#FF73BF; !important},div,ul,li,input,select,textarea,p,td,h1,h2,h3,body{color:#FF73BF;font-family:Verdana,Arial,sans-serif;font-size:12px;margin:0;padding:0;}.listfllrgblack{color:#c0c0c0;float:left;text-align:left;width:35%;}.userinfodivi,.ln,a.userbutton:hover{background-color:#FFB3DC !important}a.userbutton{border-color:#FFADD9 !important}.googbox,.pollborder{border-color:#FFADD9 !important}.newsitem{border-color:#d396b5 !important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color:#c485a5 !important}.floatdiv .floatcontent{border-color:#bc7699 !important}#header li{color:#bd7197 !important}.percentbarinner{background-color:#FFF0F8 !important}#header,#header li.logobg,ul.intabs li.sel{background-color:#FFA9D8 !important}.listitemsel{border-color:#c65990 !important}div.feedparent{color:#978 !important}.exampletxt{color:#cd3280 !important}.ltxt,.rfdte{color:#80797c !important}.formerror{color:#ff0080 !important}.promo,.warning{color:#dc1478 !important}.alttxt{color:#c61e72 !important}.orkuttitle{color:#c31e71 !important}.inlineerror{color:#936 !important}.percentbar{border-color:#FFF0F8 !important}.requiredfield{color:#c40062 !important}a.userbutton,.useremail{color:#FF9FD3 !important}.floatanchorselected{background-color:#9b024f !important}a,.floatanchornormal{color:#FFA9D8 !important}span.adsurl{color:#800040 !important}.inlinecorrect{color:#603 !important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:#FF8BCA !important}a.userbutton:hover{color:#FF73BF !important}#header li a,ul.intabs li.sel a{color:#fff !important}.footer_l{background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src='http://usagi.blogger.com.br/1000.gif');margin-right:-3px;}.footer_r{background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src='http://usagi.blogger.com.br/1000.gif');margin-left:-3px;}/* ao re-utilizar trechos desde usercss ou usar este usercss como base para criaÃƒÂ§ÃƒÂ£o de outros, favor conceder os devidos crÃƒÂ©ditos ao autor */";
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
