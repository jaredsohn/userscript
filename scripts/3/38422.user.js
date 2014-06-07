// ==UserScript==
// @name          flowerkut (pink skin)
// @namespace     http://userscript.org
// @description	  Skin rosa para o orku
// @author        yuki
// @include       http://www.orkut.com.br/*
// @include       https://www.orkut.com.br/*
// @include       http://*.www.orkut.com.br/*
// @include       https://*.www.orkut.com.br/*
// ==/UserScript==
(function() {
var css = "a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color:#ffc2e2 !important} div{color:#444444 !important} .listdark,.listitemdark,.listitemsel{background-color:#f9accf !important} .module h2.collapse{border-color:#f9accf !important} .newsitem{background-color:#f9accf !important} .promobg{background-color:#f9accf !important} body{background: url(http://img177.imageshack.us/img177/3038/pinkwallpaper1tx7.jpg) no-repeat fixed center; color: #000000 !important} .userinfodivi,.lna.userbutton:hover{background-color:#f970ae !important} a.userbutton:hover{background-color:#660066 !important} a.userbutton{border-color:#996699 !important} h1,h2{color:#000000 !important} p[class='listfl'],span[class='ownPresenceText']{color:#bc6bb2 !important} p[class='listp'],p[class='username'],p[class='parain'],td{color:#702447 !important} h1{text-transform:lowercase} h2{letter-spacing: 0.1em; word-spacing:0.2em} .leftnavh{color:#FFFFFF} .googbox,.pollborder{border-color:#f9accf !important} .newsitem{border-color:#FF00FF !important} ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important} .tabdivi{background-color:#880088 !important} .floatdiv .floatcontent{border-color:#FF00FF !important} #header li{color:#660066 !important} .percentbarinner{background-color:#FF66FF !important} #header,#header li.logobg,ul.intabs li.sel{background-color:#ffc2e2; !important} .listitemsel{border-color:#CE96CE !important} div.feedparent{color:#990099 !important} .exampletxt{color:#FF00FF !important} .ltxt,.rfdte{color:#80797c !important} .formerror{color:#FFFFFF !important} .promo,.warning{color:#990099 !important} .alttxt{color:#FFFFFF !important} .orkuttitle{color:#AA00AA !important} .inlineerror{color:#FF00FF !important} .percentbar{border-color:#CC00CC !important} .requiredfield{color:#FF00FF !important} a.userbutton,.useremail{color:##702447 !important} .floatanchorselected{background-color:#FFFFFF !important}a,.floatanchornormal{color:#d66595 !important} div[class='para'],div[class='para '],div[class='listitem']{color:##702447 !important} span.adsurl{color:#00FF00 !important} .inlinecorrect{color:#000000 !important} a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:##bc6bb2 !important} img{opacity: 0.8 !important} img:hover{opacity: 1.0 !important} p.lf,td[class='boxmidlrg'],td[class='boxmid'],div[class='boxgrid'],span[class='largenum'],div[class='boxmidlock'],div[class='listdivi ln'],td[class='boxmid'],div[class='activityitem'],div[class='divihor']{color:#000000 !important; background-color: #FFFFFF !important} a.userbutton:hover, label{color:#FFFFFF !important} div[class='thumbbox'],div[class='thumb'],td[class='topr_g'],p[class='uname']{background-color:#f2edf2 !important; white-space: normal !important} #header li a,ul.intabs li.sel a{color:#fff !important} div[id='securityMsgBody']{display: none} div[class='listlight promobg']{display:none !important} span[class='userbuttontext'],td[valign='top']{color:##702447} div[class='thumbbox']{min-height:110px!important} div[class='boxgrid']{background:#FFFFFF} .rbs{background-image:url('http://img530.imageshack.us/img530/7062/ireplyot5.gif') !important} td[bgcolor='#3366cc']{background:#ffc2e2 !important} div[class='boxgrid']{background:#FFFFFF !important} input[id='userStatusMessage']{background:#ffc2e2 !important; color:#EEEEEE !important} .smInputFocus{background:#ffc2e2 !important; color: #AAAAAA !important} .smInputBlur{background:#FFFFFF !important} #header, li.logobg{background:#d23f8f fixed !important} .useremail{color:#DCDCDC !important} li{text-transform: lowercase !important} #rhs_ads {display: none !important} .logo{background:url(http://img177.imageshack.us/img177/8997/flowerkutnt7.png) no-repeat !important; opacity:1.0 !important} div[class='lf']{color:#999999 !important} .logogoogle { background : url(\"http://img229.imageshack.us/img229/5918/logooglehi7.png\") no-repeat !important ; }";
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
})();
