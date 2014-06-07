// ==UserScript==
// @name          Centered + added new style
// @namespace     Modified and images hosted by "sascharlie"
// @description	  Center and and add new design in CS-Manager (www.cs-manager.com).
// @author        sascharlie
// @Thanks to      zAiw00t
// @include       http://cs-manager.com/*
// @include       https://cs-manager.com/*
// @include       http://*.cs-manager.com/*
// @include       https://*.cs-manager.com/*
// ==/UserScript==
(function() {
var css = "#header {\n	margin: 0 auto !important;\n	border-left: solid #000000 1px;\n	background: url(http://www.bradshawindesign.com/modify/logo.png) no-repeat center;/n}\n#container, #footer_container,.post,#content {\n	margin: 0 auto !important;\n}\n\n\n#container {\n	border-left: solid #000000 1px;\n}\n\nul#friend li a {\n	background: url(http://www.bradshawindesign.com/modify/buttonbg.jpg) no-repeat left;\n}\n\nul.gameinfo li a {\n	background: url(http://www.bradshawindesign.com/modify/buttonbg.jpg) no-repeat left;\n}\n\nul.menu li a {\n	background: url(http://www.bradshawindesign.com/modify/buttonbg.jpg) no-repeat left;\n}\n\nh3 {\n	background: #337499;\n}\n\ninput.browse, input.buttonsmall {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9 !important;\n}\n\nh2 {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ninput.button {\n	background: url(http://www.bradshawindesign.com/modify/minibutton.png) repeat-x  #5B7EB9 !important;\n}\n\ntable.popup td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.staff td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.calender td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.mail td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.news td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.data td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.lineup td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\ntable.dev td.head {\n	background: url(http://www.bradshawindesign.com/modify/head.png) repeat-x  #5B7EB9;\n}\n\n#upcoming {\n	color: #FF6600;\n}\n\n#footer_container {\n	border-left: solid #000000 1px;\n	border-bottom: solid #000000 1px;\n}";
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
