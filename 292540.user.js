// ==UserScript==
// @name       Se7enSins Scrolling Top Bar
// @namespace  http://www.se7ensins.com/forums/members/monopolyman.215986/
// @version    1.0
// @description  Brings back a topb bar that scrolls with you. Has your profile, alerts, inbox, and social icons. 
// @include http://www.se7ensins.com/*
// @copyright  MonopolyMan
// ==/UserScript==
//This adds the black bar that spans across the page, really no need to change this line
$("#moderatorBar").append( "<div id='monopolyman'></div>" );

//This is the CSS for the black bar. 
//To change opactiy: change "rgba(19,19,19,1)" to "rgba(19,19,19,[insert desired opactiy])" 1 is being 100% and 0% | Example: "rgba(19,19,19,.5)" is 50%
//To change size of the bar, you can change the "padding" value
$("#monopolyman").css("background-color", "rgba(19,19,19,.9)").css("z-index", "2").css("position", "fixed").css("width", "100%").css("padding", "15px").css("top", "0%");

//You can change the positiion of your alerts,profile, and inbox by changing the "top" and "right" values
$(".visitorTabs").css("position", "fixed").css("top", "1%").css("right", "1%").css("z-index", "3");

//You can change the positiion of the social icons by changing the "top" and "right" values
$(".socialIcons").css("position", "fixed").css("top", ".5%").css("left", ".25%").css("z-index", "3");

//This just makes sure the search bar doesn't go on top of the top bar
$("#searchBar").css("z-index", "1");
