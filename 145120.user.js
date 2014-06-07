// ==UserScript==
// @name          Tumblr Dashboard UK Flag Skin
// @namespace     http://userstyles.org
// @description	  http://img109.imageshack.us/img109/9940/tumblrdashskin.png
// @author        Luysss
// @homepage      http://userstyles.org/styles/52270
// @include       http://www.tumblr.com*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n    background: url('http://static.tumblr.com/7vwda4v/GKalpo863/ljs.jpg') center center #000000 no-repeat fixed !important;\n  }\n#content {\nbackground: url('http://static.tumblr.com/l5qjkdi/lZBlnitgv/bg_body.png');\npadding: 20px;\n-webkit-border-radius: 15px;\n-moz-border-radius: 15px;\nborder-radius: 15px;\n}\n\n#header .selection_nipple {\nwidth: 0;\nheight: 0;\nborder-left: 12px solid transparent;\nborder-right: 12px solid transparent;\nborder-bottom: 12px solid #000;\nopacity:0.6;\nfont-size: 0;\nposition: relative;\ntop: 4px;\nvertical-align: top;\nmargin: 0 auto;\ndisplay: none;\n}\n\n#right_column .controls_section .recessed {\nbackground-color: #000;\nopacity:0.6;\n-webkit-box-shadow: none;\n-moz-box-shadow: none;\nbox-shadow: none;\n-webkit-border-bottom-right-radius: 6px;\n-webkit-border-bottom-left-radius: 6px;\n-moz-border-radius-bottomright: 6px;\n-moz-border-radius-bottomleft: 6px;\nborder-bottom-right-radius: 6px;\nborder-bottom-left-radius: 6px;\nposition: relative;\n\n}\n\n#right_column .controls_section .recessed:hover {\nbackground-color: #000;\nopacity:0.6;\n-webkit-box-shadow: 0 0 5px #000;\n-moz-box-shadow: 0 0 5px #000;\nbox-shadow: 0 0 5px #000;\n}\n\n#right_column .controls_section .selected {\nbackground: #c31c16;\nbackground: -moz-linear-gradient(top,#c31c16 0,#c31c16 50%,#c31c16 50%,#c31c16 100%);\nbackground: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#c31c16),color-stop(50%,#c31c16),color-stop(50%,#a61208),color-stop(100%,#a61208));\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c31c16',endColorstr='#6B903E',GradientType=0);\n-webkit-box-shadow: 0 0 5px #c31c16,inset 0 1px 0 rgba(255,255,255,.40);\n-moz-box-shadow: 0 0 5px #c31c16,inset 0 1px 0 rgba(255,255,255,.40);\nbox-shadow: 0 0 5px #c31c16,inset 0 1px 0 rgba(255,255,255,.40);\n-webkit-border-radius: 1px;\n-moz-border-radius: 1px;\nborder-radius: 1px;\nborder-top: none;\n}\n\n#right_column .controls_section .selected:hover {\nbackground: #c31c16;\nbackground: -moz-linear-gradient(top,#c31c16 0,#c31c16 50%,#c31c16 50%,#c31c16 100%);\nbackground: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#c31c16),color-stop(50%,#c31c16),color-stop(50%,#a61208),color-stop(100%,#a61208));\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c31c16',endColorstr='#6B903E',GradientType=0);\n-webkit-box-shadow: 0 0 5px #c31c16;\n-moz-box-shadow: 0 0 5px #c31c16;\nbox-shadow: 0 0 5px #c31c16;\n\nborder-top: none;\n}\n\n#right_column .radar .content {\nbackground: url('http://static.tumblr.com/l5qjkdi/lZBlnitgv/bg_body.png') repeat-y;\nposition: relative;\n}\n\n#right_column .radar .content.is_media .mask.top {\nheight: 9px;\nbackground: none;\nbackground-position: 0 0;\ntop: 0;\n}\n\n#right_column .radar .content.is_media .mask.bottom {\nheight: 19px;\nbackground: none;\nbackground-position: 0 -9px;\nbottom: 0;\n}\n\nimg#content_top, img#content_bottom {\ndisplay:none;\n}";
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