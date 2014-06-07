// ==UserScript==
// @name           GCal Vitamin
// @namespace      http://userstyles.org
// @description    Google Calendar style based off of Nemoorange's design "Gmail Vitamin"
// @include        https://*.google.*/calendar/render*
// @include        http://*.google.*/calendar/render*
// @include        https://*.google.*/calendar/hosted*
// @include        http://*.google.*/calendar/hosted*
// @author				 Jeff Dorenbush
// ==/UserScript==
(function() {
var css = ".sng-title-bar{border-left:1px solid #c3d9ff;border-right:1px solid #c3d9ff;background-color:#fff!important}\n#searchAddCalBox{margin-left:3px;background-color:#fff;border:1px solid #e0ecff; padding:2px;}\n.zippy-arrow{display:none!important;}\n.calHeader{color:#888;font-size:91%!important;padding-top:0;margin-top:-10px;}\n.nb_0{border:1px solid #c3d9ff;border-right:none!important;margin-top:5px;}\n.chromeColor,.calHeader{background-color:#fff}\n.dpdiv{padding-left:5px;padding-right:4px;}\n.dpdiv, .dpi-popup{border-left:1px solid #c3d9ff;background-color:#fff;}\n#funbox, .fb-main, .fbox, .fb-xtra, #fbItem, .fb-text, .tip, .fb-type, #fbPrev, .fb-box, #fbNext{display:none!important;}\n .modelinkOff,.mv-dayname,a:link, a:visited,.dp-cur,.goog-offlinestatus-installed, .goog-offlinestatus-notinstalled,a.gb1, a.gb2, a.gb3, a.gb4,.lk, a.lk, .lk-online, a.lk-online{color:#365eb0!important;text-decoration:none!important;}\n* {font-family :'Helvetica Neue',Helvetica,sans-serif !important;}\n#gridcontainer{border:1px solid #6694E3;border-right-width:5px!important;}\n.printborder,#pb-container,.mainGrid{border:none;box-shadow: 0px 0px 6px #CCC;-webkit-box-shadow: 0px 0px 6px #CCC;-moz-box-shadow: 0px 0px 6px #CCC;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;}\n.mv-dayname{background-color:#e5efff;}\n.mv-container{border:none!important;}\n.t12-c{margin-bottom:-1px!important;}\n.t1{font-size:0px;height:0px;line-height:0px;}\n.mainGrid-top{background-color:#FFF!important;}\n.mv-container td {border-left:none; border-right:1px solid #c3d9ff}\n";
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
