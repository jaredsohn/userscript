// ==UserScript==
// @name          igoogle theme with google web 2.0 logo
// @description	  this adds the web 2.0 logo to your igoogle page
// @author        richard killingsworth
// @homepage      http://www.myspace.com/froggy26rk
// @include       http://www.google.*/ig*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); body { background-color: white!important;margin:0px !important} #modules {background-color: #c7cefd !important;border-top:1px solid gray !important } /* lists with links */ .mc a,.mc a:link { border:none !important; text-decoration:none !important; color:#09489d !important; border-bottom:1px dotted #75ABEA !important } .mc a:visited {color:#B3B3B3!important} .mc a:hover { color:black !important } .mc a:active {} .mc {font-size:14px !important; padding:3px !important} .mc:before {content:'';} /* rubrik titel */ .mhdr { border:0px solid red !important; background-color:transparent !important } #m_70_h { background-color:white !important} .mttl { background-color:white !important; border-bottom:1px solid #c7cefd ;margin:10px 6px !important; } /* bg des titels */ .mttl a, .mttl a:link { font-size:16px; font-family:'georgia' !important;text-decoration:none !important ;color:#333333 !important;margin-bottom:4px} .mttl a:hover { } #m_13_e {background-color:white !important} .medit { background-color:white !important; border-bottom:1px solid #c7cefd } .medit { ;text-decoration:none !important } /* rubrik box */ .modbox {padding:8px !important;margin:12px 3px !important;width:100% !important;border:1px solid #a0a6d1; -moz-border-radius:14px;background-color:white !important } h2.modtitle {background-color:transparent!important; }#regular_logo {margin-right:5px;background:url(http://img265.imageshack.us/img265/3492/mygoogle2jy3.gif) right top no-repeat;width:165px;height:54px;} /* sonstiges */ .mod { } /* leisten oben und unten*/ #footer { display:none }";
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



