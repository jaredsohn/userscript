// ==UserScript==
// @name           Reduced Alliance List and Messages Section 
// @description	   Script reduced view in alliance, messages section and spy reports
// @version	   1.3
// @author         Joks u65
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=alliance*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

		
(function() {
if (document.location.href.indexOf ("/game/index.php?page=messages") == -1)
if (document.location.href.indexOf ("/game/index.php?page=alliance") == -1)
if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)

		return;
var css = "#netz .contentz table {\nmargin-top:0px !important;\n}\n\n#inhalt div.sectioncontent {\nmargin-top:-10px !important;\n}\n\n#inhalt div.section {\nmargin-top:-5px !important;\n}\n\n#netz .contentz table.members th {\npadding-top:0px !important;\n}\n\n*[id=\"showSpyReportsNow\"] td, #messagebox td, #netz .contentz td, #showSpyReportsNow { \npadding-top:0px !important;\npadding-bottom:0px !important;\n}\n\ntable.list td.value, table.spy2 td {\ntext-align:right !important;\npadding-right: 50px !important;\n}\n\ntable.spy2 td.item {\ntext-align:left !important;\n}";
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








