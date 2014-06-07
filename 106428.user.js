// ==UserScript==
// @name          Google+ Persian
// @description	  Persian Tahoma font, RTL enhancement and tweaked CSS for Google+ Persian interface
// @version       1.0.3
// @author        Ehsan
// @include       http://plus.google.com/*
// @include       https://plus.google.com/*
// @include       http://*.plus.google.com/*
// @include       https://*.plus.google.com/*
// ==/UserScript==
(function() {
var css = "#content{\nfont-family:Tahoma, Geneva, sans-serif;\ntext-align: justify;\nbackground:#f8f8f8 !important;\n}\n.a-p-A-xc-zb{\nbackground:#f8f8f8 !important;\n}\n.a-p-M-T-Gp-xc{\nbackground:#fff!important;\n}\n.a-c-da-G{\nfont-size:12px !important;\nfont-weight:bold !important;\n}\n.a-f-i{\nfont-size:12px !important;\n}\n.editable{\nfont-family:Tahoma, Geneva, sans-serif !important;\nfont-size:12px !important;\ndirection:rtl !important;\n}\n.a-fi-O,#widget,#nw-content{\nfont-family:Tahoma, Geneva, sans-serif !important;\nfont-size:12px !important;\n}\n.UTNnYb,.wH .d-s-r{\ndirection: rtl;\nfont-family:Tahoma, Geneva, sans-serif !important;\nfont-size: 11px !important;\n}\n.a-p-la-T{\nbackground: none repeat scroll 0 0 #F8F8F8 !important;\nborder-right: 1px solid #FFFFFF !important;\npadding-bottom:10px !important;\n}\n.d-Aa-qa{\nfont-family: tahoma;font-size: 12px;\n}\n.a-g-Xh-R{\nfont-family: tahoma;font-size: 13px;\n}\n.a-b-f-U-R{\nfont-family: tahoma;font-size: 13px;\n}\n.a-Cs-T{\nbackground: none repeat scroll 0 0 #F8F8F8 !important;\nborder-left: 1px solid #FFFFFF !important;\npadding-bottom:10px !important;\n}\n.a-kh-Ae{\nmargin-left:10px !important;\n}";
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
