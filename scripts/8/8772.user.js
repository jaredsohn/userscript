// ==UserScript==
// @name           iGoogle Air
// @namespace      http://userscripts.org
// @description    google homepage to match Air
// @author	   twofish@gmail.com
// @include        http://www.google.*/ig*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); body { background-color: white!important;margin:0px !important} #modules {background-color: #FFFFFF !important;} /* lists with links */ .mc a,.mc a:link { border:none !important; text-decoration:none !important; color:#09489d !important; border-bottom:1px solid #09489d !important } .mc a:visited {color:#B3B3B3!important} .mc a:hover { color:black !important } .mc a:active {} .mc {font-size:14px !important; padding:3px !important} .mc:before {content:'';} /* rubrik titel */ .mhdr { border:0px solid red !important; background-color:transparent !important } #m_70_h { background-color:white !important} .mttl { background-color:white !important; border-bottom:1px solid #c7cefd ;margin:10px 6px !important; } /* bg des titels */ .mttl a, .mttl a:link { background-color:white !important; font-size:16px; font-family:'georgia' !important;text-decoration:none !important ;color:#333333 !important;margin-bottom:4px} .mttlz, .mttld, .mttl a:hover { background-color:white !important} #m_13_e {background-color:white !important;} .medit { background-color:white !important; border-bottom:1px solid #c7cefd } .medit { ;text-decoration:none !important } /* rubrik box */ .modbox .modboxin {padding:5px !important; border-left:1px solid #c5d7ef; border-right:1px solid #c5d7ef; border-bottom:1px solid #c5d7ef; -moz-border-radius-bottomright:10px; !important; -moz-border-radius-bottomleft:10px; !important;} h2.modtitle {background-color:#e3ebfe; -moz-border-radius-topleft:10px; !important; -moz-border-radius-topright:10px; !important; -moz-border-radius-topleft:10px; !important; border-top: 1px solid #C3D9FF !important; border-bottom: 1px solid #C3D9FF !important; border-left: 1px solid #C3D9FF !important;} #regular_logo {margin-right:5px;background:url(http://farm2.static.flickr.com/1020/529542330_45966691f8.jpg?v=0) right top no-repeat;width:166px;height:55px;}  /* sonstiges */";
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

// Round tabs.  Taken from iG Max http://userscripts.org/scripts/show/7912
var radius = 5;
var tabs = document.getElementsByTagName('li');
for(var i=0; i<tabs.length; i++) {
  if(tabs[i].id.match(/tab.*_view/))
    tabs[i].style.MozBorderRadius = radius + 'px ' + radius + 'px 0px 0px' ;
}