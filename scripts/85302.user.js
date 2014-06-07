// ==UserScript==
// @name          trn_ot
// @namespace     http://www.orkut.co.in/Main#Community?cmm=95917134
// @description	  tron
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
var css = "";
if (false || (document.location.href.indexOf("http://www.orkut.") == 0))
	css += "body {background:#ffffff url(http://i796.photobucket.com/albums/yy243/vrkm2003/small/themes/tron.jpg)  center fixed !important;}#container{margin-top:-12px !important;opacity: 0.999}.userinfodivi,.ln {background:#ffffff !important;}h1,h2,h3 {color:#fae42d !important;} .listfl{color:#ffb400!important;} p,h4,tr,b,form,ul,li,td,div{color: #ffb400 !important;} a[href] { color: #ffb400 !important; text-decoration: none !important; } a[href]:hover { color: #FF0000 !important; text-decoration: none !important; }  .boxmidlrg,.botl,.topr_g,.boxmidr,.botr,.topl_g,.topl,.topr,.topr_lrg,.topl_lrg,.boxmid {background-image:none !important;background:transparent url(http://apptemasloucos.googlecode.com/svn/trunk/img/clear.png) !important;}#smWrapperBox {background-color:#000000 !important;-moz-border-radius:5px !important;opacity:0.72}.listitemchk,.listitem,.listlight,.listdark {background:transparent url(http://apptemasloucos.googlecode.com/svn/trunk/img/clear.png) !important;}.topl,.topl_lrg,.topl_g,.boxmid,.boxmidlrg{border-left:1px solid #ffffff !important}.topl,.topl_lrg,.topr,.topr_lrg,.topl_g,.topr_g{border-top:1px solid #ffffff !important}.topl,.topl_lrg,.topl_g{-moz-border-radius-topleft:8px !important}.topr,.topr_lrg,.topr_g,.botr,.boxmidr{border-right:1px solid #ffffff !important}.topr,.topr_lrg{-moz-border-radius-topright:38px !important}.topr_g{-moz-border-radius-topright:8px !important}.botr{border-bottom:1px solid #ffffff !important;-moz-border-radius-bottomright:8px !important}.botl{border:1px solid#ffffff !important;border-top:0 !important;border-right:0 !important;-moz-border-radius-bottomleft:8px !important}.boxmidr{-moz-border-radius-topright:0 !important}.boxmid,.boxmidlrg{-moz-border-radius:0 !important}ul.intabs li{background-image:none !important}ul.intabs li .ltab{background-image:none !important}ul.intabs li.sel{background-image:none !important;background:#ffffff !important}ul.intabs li.sel .ltab{background-image:none !important}.sel {-moz-border-radius-topright:8px !important;-moz-border-radius-topleft:8px !important;}.boxmidlock,.bday {background:none !important;}.bday b {font-size:11px !important;color:red;}.bday b a{font-size:10px !important;display:none}.bday img {max-height:60px !important}.bday{height:75px !important;width:50px !important}.thumbbox,.divihor,.boxgrid {background:none !important}.bday .uname {margin-top:-40px !important;font-size:9px !important;background:#FFF !important;opacity:0.82; height:20px !important;}.footer_r,.footer_l {background-image:none !important}.footer_r a,.footer_l a {color:#FFF!important; text-shadow:0px 1px 2px #000!important;}#title{background:url(none) 99% 0px no-repeat !important;width:260px !important}#header {background:url(http://lh6.ggpht.com/_EgSKFxYcMAA/SmdUzc0Bg4I/AAAAAAAAAyE/KUkQk1lv6k8/tp.png) !important;width:1000px !important;margin:0 auto !important;-moz-border-radius-bottomright:8px !important;-moz-border-radius-bottomleft:8px !important;}.logo {margin-left:0px !important;-moz-border-radius-bottomleft:8px !important;-moz-border-radius-bottomright:8px !important;}.logobg{background:none !important;}#graylayer{display:none}#photoExplanation{font-size:10px !important; margin-top:20px !important;}#uploadPhoto h2,.cropPhoto{color:#333 !important}#headerbot{background: url() no-repeat center top;height:50px !important}";
if (false || (location.href.replace(location.hash,'') == "none"))
	css += "body {background:#E6BD6A url(http://i33.tinypic.com/2ew2mfo.jpg) no-repeat fixed !important;}.newMain {background:transparent url(http://apptemasloucos.googlecode.com/svn/trunk/img/clear.png) !important; border:1px solid #E6BD6A;-moz-border-radius:18px !important;}.newFooter{display:none}.joinNow,.spacer,.Newgaia,td {background:none !important}.newGaia {background:transparent url(http://apptemasloucos.googlecode.com/svn/trunk/img/clear.png) !important;-moz-border-radius:10px !important;-moz-border-radius-TopRight:50px !important;}.magenta{color:transparent url(http://apptemasloucos.googlecode.com/svn/trunk/img/clear.png)}";
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