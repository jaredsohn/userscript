// ==UserScript==
// @name           Roblox OBC Theme
// @namespace      PlusJon
// @description    Automatically adds OBC theme
// @include        *www.roblox.com*
// @include        *www2.roblox.com*
// @include        *www.sitetest3.roblox.com*
// @include        *www.gametest1.roblox.com*
// @version        2.01
// ==/UserScript==

var styleNode = document.createElement('style');
styleNode.type = "text/css";
var styleText = document.createTextNode("#Footer, #MasterContainer, #BodyWrapper {background:none !important;} #Body{ background: white !important } #testingSitePanelWrapper { background: none !important } #NavigationRedesignBannerContainer.BannerCenterContainer a.btn-logo,  #NavigationRedesignBannerContainer.BannerCenterContainer a.btn-logo:visited,  #NavigationRedesignBannerContainer.BannerCenterContainer a.btn-logo:hover { background-image: url(http://www.roblox.com/images/RevisedHeader/btn-obc_logo.png);} #NavigationRedesignBannerContainer .HeaderDivider {border-left: 1px solid #878988} #Banner.BannerRedesign {background-image:url(http://www.roblox.com/images/RevisedHeader/bg-obc_header.png)} #Footer.unfixed { background: transparent } #RepositionBody { background-color: transparent; } #Footer.LanguageRedesign div.legal { border-color:white;} #Footer.LanguageRedesign p.Legalese {color:#555 !important;} body{background-color:black !important;}body {background:url(http://imagesak.roblox.com/e208d803544730688da1791aab218da9) top center repeat-x #000 ;} #SmallHeaderContainer div#Banner { background-color:#2E2E2E ;} a.btn-logo {background-image:url(http://imagesak.roblox.com/4d10a931b159051418e34be0e5dc4bf9);} #Header .Navigation {background:url(http://imagesak.roblox.com/0207ad53669d6d9d4748884774026513) ;} .Navigation li:hover{background:url(http://imagesak.roblox.com/0207ad53669d6d9d4748884774026513);background-position:0 30px;}")
styleNode.appendChild(styleText);
document.getElementsByTagName('head')[0].appendChild(styleNode);