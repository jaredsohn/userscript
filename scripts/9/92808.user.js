// ==UserScript==
// @name           myspaceBETAfixchrome
// @namespace      http://userscripts.org/scripts/show/92808
// @author         http://userscripts.org/users/satansgodfather
// @description    Making myspace how it should be. Less ads, less BS. Questions or suggestions message me at myspace.com/SATANSGODFATHER
// @include        http://www.myspace.com/home
// @include        http://www.myspace.com
// @include        http://www.myspace.com/*
// @include        http://www.*myspace.com/*
// @include        http://*myspace.com/*
// @include        http://www.myspace.com/*/
// @include        http://www.myspace.com/*/*/
// @version        1.0.0
// ==/UserScript==
(function() {
var css = "header.globalHeader {position:relative !important; margin-bottom:-45px !important;} div#va, div#imConsole.imConsoleDefault, div#friendsListTab, .webimToastContainer, .iFrameFooterWrap, .GamesCanvasGutterAdsModule, div#adcontainer, .labeled_ad, div#tkn_medrec, .logo, .discoverTray, div#VxP61798Div, .ad_label, .HeroUnitModule, .SitesGoogleAdsModule, div#tkn_adspecial3, div#adx_leaderboard, .AdSandbox, .bulletinsModule, .tomAnnouncementModule, .googleAdSenseModule, .bestOfTheFixModule, .RecommendationsModule, .gblHeaderSpacer, .AdContainerModule, div#tkn_leaderboard {display:none !important; visibility:hidden !important;} footer ul {display:none !important; visibility:hidden !important;} body {background-image:url('http://img403.imageshack.us/img403/8623/myspacebg10.jpg') !important; background-repeat:repeat-y !important; background-position:center; background-attachment:fixed; background-color:#000000;} .rowPath1 {background-color:transparent;} div#wrap, .rowPath2 {background-color:#1c1c1c; opacity:0.8;} a img:hover {opacity:0.8;} .layout {margin-top:4px;} .profileAppSurface iframe, .moduleBody iframe {margin-left: 83px; left: 50%;} .container, .layout {background-color:transparent !important;} nav.upperNav, nav.lowerNav {max-width:940px !important;} #msSubnav.Apps ul.nav {margin-left: 83px; left: 50%; max-width:940px !important; background-color:transparent !important; border-style:none !important; visibility: visible !important;}";
{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();