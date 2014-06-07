// ==UserScript==
// @name          LJ-Banner-Skin+Userpic
// @description   revamp the LJ site banner, userpic and navigation - based on the LJ Banner script by daluci
// @author        gossymer
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==
(function() {
var css = "DL.b-reskining-about { display: none !important;}\#Logo {display: none;}\#Login {top: 3px; height: 70px !important; overflow: hidden !important; letter-spacing: .04em;}\#Login a {text-decoration: none !important;}\#Login a[href*=\"settings\"] {display:none;}\#welcome h2 .ljuser a img {display:none;}\#navigation #Userpic {display: none; height: 75px; width: 75px; margin-top:25px; overflow: hidden;}\#welcome { padding: 0px !important; margin: 0px !important; width: 100% !important; margin-left: -100px !important; overflow:hidden;}\#welcome h2 , #WelcomeViewLinks {display: block; float: left;}\#welcome h2 {margin-top:32px !important; margin-left: 12px !important;}\#WelcomeViewLinks {margin: 40px 7px; }\#WelcomeViewLinks {height: 18px; overflow: hidden; }\#NavBar {margin: 0px; padding: 0px; width: 100%;}\#NavBar #NavMenu {margin: 0px; padding: 0px;}\#welcome #WelcomeLinks {position: absolute !important; right: 0px; top: 40px; margin-right: 12px; }\#welcome #WelcomeLinks a {padding-left: 4px !important; padding-right: 4px !important;}\#WelcomeViewLinks li a {padding-left: 7px !important;}\#WelcomeViewLinks li a[href*=\"devices\"], #WelcomeViewLinks li a[href*=\"invite\"], #WelcomeViewLinks li a[href*=\"tokens\"] {display:none;}\#content-inner {margin-top: -10px !important;}\#Login {background-color: #f8f8f8 !important; color: #333;}\#welcome { color: #f2e9db !important;}\#WelcomeViewLinks { color: #f2e9db !important;}\#welcome a {text-decoration: none; color: #666666 !important; }\#welcome h2 a {color: #3fa6a2 !important;  font-size: 20pt; font-family: Fertigo Pro, Cambria, Times New Roman, Georgia, Times, serif; letter-spacing: .2px;}\#welcome #WelcomeLinks {color: #bbb; }\#welcome #WelcomeLinks a, #welcome #WelcomeLinks a:hover {color: #404040 !important; text-decoration: none !important;}\#WelcomeViewLinks li a {color: #404040 !important; border-left: 1px dotted #ccc; text-decoration: none !important;}\#welcome h2 .ljuser a img[src*=\"userinfo.gif\"] { display: inherit; width: 0 !important; height: 0 !important; background: none !important;background-repeat: no-repeat !important; padding: 32px 32px 0 2px !important; vertical-align: bottom !important; background-image: url(http://pics.livejournal.com/gossymer/pic/009k8ddy) !important; }\#navigation {margin-top:-25px !important; background:#ffffff url(http://pics.livejournal.com/gossymer/pic/009k5htk) bottom no-repeat !important;}\#navigation #Userpic {display: inherit; height: auto; width: auto; margin-top: 12px; margin-left: -12px;}\#NavBar #NavMenu, #welcome h2 {margin-left: 82px !important;}\#navigation #Userpic #defaultpic {background-image: url(http://pics.livejournal.com/gossymer/pic/009kb2pc) !important;}\ #NavMenu li:hover > a {  color: #018d8e !important;  background: #d5efed !important;}\ .NavMenuItem, .NavMenuItem a {color: #fff;}\ .NavMenuItem a:visited { font-weight: bold; }\ .NavMenuItem:hover { color: #018d8e !important; background-color: #d5efed !important;   background-image: none !important;}\ .NavMenuItem a:hover, #Alpha { background-color: #d5efed !important; background-image: none !important; color: #018d8e !important;}\ #Alpha { color: #1a7770 !important;}\ #NavMenu ul li {background-color: #fbf6ef !important;}\ #NavMenu ul li a {color: #529495; font-weight: bold !important;}\ #NavMenu ul li a:hover {font-weight: bold !important;}";
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