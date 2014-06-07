// ==UserScript==
// @name           NEACF Color Mod
// @namespace      neacf.com
// @description    allows specification of some of the CSS on neacf.com to alter colors. Supports images via URLs as well.
// @include        http://neacf.com/mb/index.php
// @include        http://neacf.com/*
// ==/UserScript==

// the top border
var topBorderImage = 'http://changethis.to.yourpicture';
var bannerColor = '#00006B';

//borders topping the forum headings and shout/flickr box
var forumHeadingBorderColor = '#00006B';
var forumHeadingBorderImage = 'http://changethis';
var forumHeadingTextColor = 'yellow'; 

// color of Show Unread Post + Local Listings text 
var borderTextColor  = 'white';

//color of username text and time logged in
var userNameColor = 'yellow';

//Menu Bar Items
// menu hover color - also effects logout login and register 
var menuHoverColor = 'red';

// image running across this 10px wide bar above menu
var menuBarBackgroundImage = 'http://changethis';
var menuBarBackgroundColor = 'black'; 

//image behind the menu button background 
var menuButtonBackgroundImage = 'http://changethis';
var menuButtonBackgroundColor = '';

// image behind page that is currently being viewed 
var currentPageBackgroundImage = 'http://changethis';
var currentPageBackgroundColor = '#white';

//button text color on menu items
var buttonTextColor = 'black';



// modifications


//change the top border to topBorderImage
GM_addStyle('.header { background: url('+topBorderImage+') repeat-x; width: 100%; height: 132px; ! important; }');
GM_addStyle('.header { background-color:'+ bannerColor+'; ! important; }');

//change the Show Unread Posts text color 
GM_addStyle('.headerinfo a:link, .headerinfo a:visited { color:' + borderTextColor  + '; ! important; }');

//change the Local Listings Link Text Color
GM_addStyle('.extramenu a:link, .extramenu a:visited { color:' + borderTextColor + '; ! important;}' );

//change the Local Listings Link Text Color
GM_addStyle('.extramenu { color:' + userNameColor + '; ! important;}' );

//change the Border around forum headers
GM_addStyle(' .catbg , tr.catbg td , .catbg3 , tr.catbg3 td, .catbg2 , tr.catbg2 td { background: url('+ forumHeadingBorderImage +') #ffffff repeat-x; color: #c6d3e4; padding-left: 10px; padding-right: 10px; ! important;}');
GM_addStyle(' .catbg , tr.catbg td , .catbg3 , tr.catbg3 td, .catbg2 , tr.catbg2 td { background-color:'+ forumHeadingBorderColor +' ! important;}');
GM_addStyle(' .catbg, tr.catbg td, .catbg3, tr.catbg3 td, .catbg2, tr.catbg2 td {color:'+forumHeadingTextColor+'}');

// changes the color for forum headings
GM_addStyle(' .catbg a:link, .catbg a:visited, .catbg2 a:link, .catbg2 a:visited {color:'+forumHeadingTextColor+' ! important;');


//half the menu bottom margin from 30px to 15px
//position: relative also controls the menus sticking out
GM_addStyle('.menu-position { position: relative; top: -11px; margin-bottom:15px; ! important; }' );

// MENU ELEMENTS

// .menu-pr and .menu-pl are the left and right back button colors
// menu-pbg is the background for the button 

//thin bar across menu
GM_addStyle('.menubg { background: url(' + menuBarBackgroundImage+') repeat-x; width: 100%; height: 11px; ! important; }');
GM_addStyle('.menubg { background-color:' + menuBarBackgroundColor+' ! important; }');

//background behind the text on menu 
//GM_addStyle('.menu-pbg, { background: url(' +menuButtonBackgroundImage+ ') repeat-x; height: 43px; ! important; }');

//removes side art from buttons
GM_addStyle('.menu-pb, .menu-pr, .menu-pl, .menu-ab, .menu-ar, .menu-al { background: url() ! important;}');

//removes background from buttons for on not for ABG (off) 
GM_addStyle('.menu-pbg { background: url() repeat-x; height: 43px; }');

//changes text of buttons 
GM_addStyle(' .menu-pbg a:link, .menu-pbg a:visited, .menu-abg a:link, .menu-abg a:visited {color: '+buttonTextColor+'; font-weight: bold; padding: 18px 8px 10px 8px;}');
//GM_addStyle('.menu-pbg a:link, .menu-pbg a:visited, .menu-abg a:link, .menu-abg a:visited {text-shadow: 2px 2px 2px white, 2px 2px 2px white; ! important;}');

//background of button on the current page 
GM_addStyle('.menu-abg { background: url('+ currentPageBackgroundImage +') repeat-x; height: 43px; border: 1px solid; border-radius: 5px; ! important; }');
GM_addStyle('.menu-abg { background-color:'+ currentPageBackgroundColor +' ! important; }');

// a:link allows hover for text 
GM_addStyle('.menu-pbg a:hover, .menu-pbg a:link {color: '+menuHoverColor+'; ! important; }');

//decreases the distance from top menu bottom to shout box top 
GM_addStyle('.menu-position {margin-botton: 0px; ! important;}');

GM_addStyle('.headerinfo {color: ' + userNameColor +'; ! important;}');

//GM_addStyle('p { font-size: large ! important; }');