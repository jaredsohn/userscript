// ==UserScript==
// @name          EMIM Skin
// @version       0.1
// @description   Skin For EMIM
// @author 	  Nikolai Pavlov 
// @include 	http://www.valnet-emim.eu/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* DEFAULTS FOR ALL LINKS */ a:link, a:visited, .link { color: #336699 !important; text-decoration: none !important;} a:active, .link:active { color: #92CDFF !important;text-decoration: none !important;} /* CHANGE GLOBAL FONT */ *{font-family: \"Helvetica Neue\", Tahoma, Verdana !important; font-size:11px !important;} /* TABLE BG CHANGE */ table.discussioncontrol { background-color: #fff !important;} td.starter {background-color: #ccc !important;}  .required {background-color: #eee;} /* MARGIN */ .indent .mod-forum {margin-left: 5px; margin-right: 10px;} /* HEADER */ div#header {margin-top: -80px;} .navbutton {display: inline; position: absolute; top: -15px; float: none; margin-left: 900px;} /* Remove arrow */ div.emimBackBtn {display: none} div#page {overflow: hidden;} .navbar {background-image: none; background-color: #eee;} div[class=\"content info list header section main\"] {background-color:#eee;} ";
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
	var arTableRows = document.getElementsByTagName('tr');
	for (var i = arTableRows.length - 1; i >= 0; i--) {
		var elmRow = arTableRows[i];
		var sBackgroundColor = elmRow.style.backgroundColor;
		var sColor = elmRow.style.color;
		elmRow.addEventListener('mouseover', function() {
			this.style.backgroundColor = '#eee';
			this.style.color = '#333';
		}, true);
		elmRow.addEventListener('mouseout', function() {
			this.style.backgroundColor = '#ddd';
			this.style.color = sColor;
		}, true);
	}
