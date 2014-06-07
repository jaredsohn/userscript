// ==UserScript==
// @name          Anonymous Black Facebook Login Page
// @namespace     http://userstyles.org
// @description	  Update : Added a new CSS so that it works perfectly on most screen resolutions & the background shows its best when browser is resized..!! Give your Facebook login Page a Anonymous look..!! Looks pretty cool..!! Rate it..!! Connect with https://www.facebook.com/trickortips to stay updated..!! Google+ link http://www.goo.gl/GyJZB Follow me on twitter https://twitter.com/trickortips Also see :)
// @author        ./Shi-KaTo
// @homepage      http://userstyles.org/styles/81939
// @include       https://www.facebook.com/
// @include       https://www.facebook.com/index.php?stype=lo*
// @include       https://www.facebook.com/index.php*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body.fbIndex { \nbackground: url('https://scontent-b-kul.xx.fbcdn.net/hphotos-prn2/t1.0-9/10172676_309879462496456_5210758411391607620_n.jpg')right center fixed !important; \n-webkit-background-size: cover; \n-moz-background-size: 100% !important; \nbackground-repeat: no-repeat !important;\nbackground-size: cover !important;\n}\n\n.loggedout_menubar_container { background: url('http://fiakka.com/images/blank_transparent.png') !important; }\n.fbIndex #globalContainer #dropmenu_container,\n.fbIndex #globalContainer #content,\n.fbIndex #globalContainer #pageFooter { display: none !important }\n\n\n.fbIndex .loggedout_menubar_container {\n  position: fixed !important;\n  width: 420px !important;\n  height: 82px !important;\n  min-width: 0 !important;\n  top: 50% !important;\n  left: 50% !important;\n  margin-top: -17px !important;\n  margin-left: -210px !important;\n  z-index: -1 !important;\n}\n\n\n.fbIndex .loggedout_menubar { width: auto !important }\n.fbIndex .loggedout_menubar_container .lfloat,\n.fbIndex .loggedout_menubar_container .rfloat { float: none !important }\n.fbIndex .loggedout_menubar_container .lfloat img,\n.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }\n\n.fbIndex .loggedout_menubar_container .lfloat img { display: block; margin: -60px auto 20px !important; }\n\n._5a-- { display: none !important }\n\n\n#SetAsHomepage_Callout {\n  display: none;\n}";
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
