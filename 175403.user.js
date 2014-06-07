// ==UserScript==
// @name          avril lavigne demo Facebook Login Page
// @namespace     http://userstyles.org
// @description	  just for a demo..but if u wanted u can installed
// @author        Bad
// @homepage      http://userstyles.org/styles/175403
// @include       https://www.facebook.com/
// @include       https://www.facebook.com/index.php?stype=lo*
// @include       https://www.facebook.com/index.php*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body.fbIndex { \nbackground: url('http://stream1.gifsoup.com/view/724763/avril-lavigne-o.gif') top center fixed !important; \n-webkit-background-size: cover; \n-moz-background-size: 100% !important; \nbackground-repeat: no-repeat !important;\nbackground-size: cover !important;\n}\n\n.loggedout_menubar_container { background: url('http://fiakka.com/images/blank_transparent.png') !important; }\n.fbIndex #globalContainer #dropmenu_container,\n.fbIndex #globalContainer #content,\n.fbIndex #globalContainer #pageFooter { display: none !important }\n\n\n.fbIndex .loggedout_menubar_container {\n  position: fixed !important;\n  width: 420px !important;\n  height: 82px !important;\n  min-width: 0 !important;\n  top: 50% !important;\n  left: 50% !important;\n  margin-top: -17px !important;\n  margin-left: -210px !important;\n  z-index: -1 !important;\n}\n\n\n.fbIndex .loggedout_menubar { width: auto !important }\n.fbIndex .loggedout_menubar_container .lfloat,\n.fbIndex .loggedout_menubar_container .rfloat { float: none !important }\n.fbIndex .loggedout_menubar_container .lfloat img,\n.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }\n\n.fbIndex .loggedout_menubar_container .lfloat img { display: block; margin: -60px auto 20px !important; }\n\n\n\n#SetAsHomepage_Callout {\n  display: none;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();