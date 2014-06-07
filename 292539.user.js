// ==UserScript==
// @name       Se7enSins Fixed Top Bar
// @namespace  http://www.se7ensins.com/forums/members/monopolyman.215986/
// @version    1.0
// @description  Brings back a topb bar that scrolls with you. Has your profile, alerts, inbox, and social icons. 
// @include http://www.se7ensins.com/*
// @copyright  MonopolyMan
// ==/UserScript==
$("#moderatorBar").append( "<div id='monopolyman'></div>" );
//To change opactiy, in the next line change "rgba(19,19,19,1)" to "rgba(19,19,19,[insert desired opactiy])" 1 is being 100% and 0% Example: "rgba(19,19,19,.5)" is 50%. Default: .9
$("#monopolyman").css("background-color", "rgba(19,19,19,.9)").css("z-index", "2").css("position", "fixed").css("width", "100%").css("padding", "15px").css("top", "0%");
$(".visitorTabs").css("position", "fixed").css("top", "1%").css("right", "1%").css("z-index", "3");
$(".socialIcons").css("position", "fixed").css("top", ".5%").css("left", ".25%").css("z-index", "3");
$("#QuickSearch").css("z-index", "1");
$("#searchBar").css("z-index", "1");
