// ==UserScript==
// @name			MAL Kanon Theme [by suffix]
// @namespace		http://www.myanimelist.net/profile/suffix
// @include			http://*myanimelist.net/*
// @exclude			http://*myanimelist.net/animelist/*
// @exclude			http://*myanimelist.net/mangalist/*
// @exclude			http://*myanimelist.net/rss.php*
// @version			0.10
//
// @history			0.10 Beta release yay!
// ==/UserScript==

// Theme colors and graphics urls
var color1 = "#b2350b";
var color2 = "#fae3e3"; 
var color3 = "#b25959"; 
var color4 = "#bb431a";
var color5 = "#da420f";
var color6 = "#882909";
var bodybg = "http://imgboot.com/images/suffix/malkanonbg.jpg";
var headerleft = "http://imgboot.com/images/suffix/malkanonheaderleft.gif";
var headerright = "http://imgboot.com/images/suffix/malkanonheaderright.gif";

// CSS
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

// Body background, don't set for the defined pages
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body { background: #ffffff url("'+bodybg+'") no-repeat top center !important; }');
}

// Header
addGlobalStyle('#myanimelist { margin-top: 152px !important; }');
addGlobalStyle('#header_surround { height: 49px; !important; background-color: transparent !important; }');
addGlobalStyle('#header_left { background: transparent url("'+headerleft+'") no-repeat top left !important; }');
addGlobalStyle('#header_right { background: transparent url("'+headerright+'") repeat-x top left !important; }');

// Links, don't set this as !important or some unwanted link colors get overwritten
addGlobalStyle('a, a:hover, a:visited { color: '+color1+' ; }');

// Element colors
addGlobalStyle('#leftcontent a:link, #leftcontent a:visited { color: '+color1+' !important; }');
addGlobalStyle('#leftcontent a:hover { background-color: '+color1+'; !important; color: #ffffff !important; }');
addGlobalStyle('h1 { background-color: '+color2+' !important; border-bottom-color: '+color1+' !important; }');
addGlobalStyle('#horiznav_nav { border-color: '+color1+' !important; }');
addGlobalStyle('#rightcontent, #rightcontent_nopad, #rightcontent_nopadall, #rightcontent_largepad { border-bottom: 1px solid '+color1+' !important; }');
addGlobalStyle('.row_highlighted { background-color: '+color2+' !important; }');
addGlobalStyle('#dialog { border: 10px solid '+color2+' !important; }');
addGlobalStyle('#dialog td { border: 1px solid '+color1+' !important; }');
addGlobalStyle('#dialog td td { border: 0 !important; }');
addGlobalStyle('#horiznav_nav, #horiznav_nav ul li a { border-color: '+color1+' !important; color: '+color1+' !important; }');
addGlobalStyle('#horiznav_nav ul li a:hover, #horiznav_nav ul li .horiznav_active { background-color: '+color1+' !important; color: #ffffff !important; }');
addGlobalStyle('#profileRows a { border-color: '+color3+' !important; color: '+color1+' !important; }');
addGlobalStyle('#profileRows a:hover { border-color: '+color4+' !important; background-color: '+color1+' !important; color: #ffffff !important; }');
addGlobalStyle('.goodresult, .successQuery { background-color: '+color2+' !important; border-color: '+color1+' !important; }');
addGlobalStyle('.goodresult a:link,.goodresult a:active,.goodresult a:visited { color: '+color1+' !important; }');
addGlobalStyle('.badresult { background-color: '+color2+' !important; border-color: '+color4+' !important; }');
addGlobalStyle('.badresult a:link,.badresult a:active,.badresult a:visited { color: '+color4+' !important; }');

// Forum colors
addGlobalStyle('.forum_category, .forum_category a { background-color: '+color4+' !important; color: #ffffff !important; ; }');
addGlobalStyle('.message_separator { background-color: '+color4+' !important; }');
addGlobalStyle('.vote_container { background-color: '+color2+' !important; }');
addGlobalStyle('#forum_options_container ul li { border-color: '+color4+' !important; }');

// Form and button colors
addGlobalStyle('.inputButton { border-top-color: '+color5+' !important; border-left-color: '+color5+' !important; border-bottom-color: '+color6+' !important; border-right-color: '+color6+' !important; background-color: '+color4+' !important; }');
addGlobalStyle('.button_add { color: #888888 !important; }');
addGlobalStyle('.button_add:hover { background-color: '+color1+' !important; color: #ffffff !important; }');
addGlobalStyle('.button_form:hover { background-color: '+color1+' !important; }'); 
