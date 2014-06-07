// Last.fm blue theme
// ==UserScript==
// @name            Last.fm Blue Theme
// @namespace       http://hot.projektas.lt/lastfmblue/lastfmblue.user.js
// @description     Changes Last.fm theme into blue
// @include         http://*.last.fm*
// ==/UserScript==

// Jonas Slivka (jonas.slivka@gmail.com)
// http://hot.projektas.lt
var theImage, nuoroda;
theImage = document.getElementById('LogoImg');
if (theImage) {
    nuoroda = document.createTextNode(theImage.src);
    theImage.src = "http://hot.projektas.lt/lastfmblue/logo.gif";
}
theImage = document.getElementById('headerSearchbutton');
if (theImage) {
    nuoroda = document.createTextNode(theImage.src);
    theImage.src = "http://hot.projektas.lt/lastfmblue/searchbutton_nav.gif";
    theImage.onMouseOver = "this.src='http://hot.projektas.lt/lastfmblue/searchbutton_nav_on.gif';";
    theImage.onMouseOut = "this.src='http://hot.projektas.lt/lastfmblue/searchbutton_nav.gif';";
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// IMAGES:
addGlobalStyle('#LastHeader, body.black #LastHeader {background: url("http://hot.projektas.lt/lastfmblue/gradient.gif") top left repeat-x #243f5b !important;}');
addGlobalStyle('#headerSearchbox {background: url("http://hot.projektas.lt/lastfmblue/navextention_blue.gif") bottom left no-repeat !important;}');
addGlobalStyle('body.black #headerSearchbox {background-image: url("http://hot.projektas.lt/lastfmblue/navextention_black.gif") !important;}');
addGlobalStyle('.lastPanel .h {background: url("http://hot.projektas.lt/lastfmblue/top_blue.gif") top left no-repeat !important;}');
addGlobalStyle('body.black .lastPanel .h {background-image: url("http://hot.projektas.lt/lastfmblue/top_black.png") !important;}');
addGlobalStyle('body.black #LastContent3 .lastPanel .h, #LastContent3 .lastPanel .h, body.black #LastContent2 .lastPanel .h, #LastContent2 .lastPanel .h {background-image: url("http://static.last.fm/depth/panels/top_grey.gif") !important;}');
addGlobalStyle('.textTog, .imgTog {background-image: url("http://hot.projektas.lt/lastfmblue/list.gif") !important;}');
addGlobalStyle('body.black .textTog, body.black .imgTog {background-image: url("http://hot.projektas.lt/lastfmblue/list_black.gif") !important;}');
addGlobalStyle('#LastContent3 .textTog, #LastContent3 .imgTog, #LastContent2 .imgTog, #LastContent2 .textTog  {background-image: url("http://static.last.fm/depth/panels/listwidget_grey.gif") !important;}');
addGlobalStyle('.collapseTog, .expandTog {background-image: url("http://hot.projektas.lt/lastfmblue/minimise.gif") !important;}');
addGlobalStyle('body.black .collapseTog, body.black .expandTog {background-image: url("http://hot.projektas.lt/lastfmblue/minimise_black.gif") !important;}');
addGlobalStyle('#LastContent3 .collapseTog, #LastContent3 .expandTog, #LastContent2 .expandTog, #LastContent2 .collapseTog, body.black #LastContent3 .collapseTog, body.black #LastContent3 .expandTog, body.black #LastContent2 .expandTog, body.black #LastContent2 .collapseTog {background-image: url("http://static.last.fm/depth/panels/minimise_grey.gif") !important;}');
addGlobalStyle('#navAbout, #navigation #navAbout a:hover, #navigation li.current#navAbout a {background-image: url("http://hot.projektas.lt/lastfmblue/about.gif") !important;}');
addGlobalStyle('#navCharts, #navigation #navCharts a:hover, #navigation li.current#navCharts a {background-image: url("http://hot.projektas.lt/lastfmblue/charts.gif") !important;}');
addGlobalStyle('#navListen, #navigation #navListen a:hover, #navigation li.current#navListen a {background-image: url("http://hot.projektas.lt/lastfmblue/listen.gif") !important;}');
addGlobalStyle('#navMusic, #navigation #navMusic a:hover, #navigation li.current#navMusic a {background-image: url("http://hot.projektas.lt/lastfmblue/music.gif") !important;}');
addGlobalStyle('#navTools, #navigation #navTools a:hover, #navigation li.current#navTools a {background-image: url("http://hot.projektas.lt/lastfmblue/tools.gif") !important;}');
addGlobalStyle('#navUsers, #navigation #navUsers a:hover, #navigation li.current#navUsers a {background-image: url("http://hot.projektas.lt/lastfmblue/users.gif") !important;}');
addGlobalStyle('#ColourTog a {background-image: url("http://hot.projektas.lt/lastfmblue/colour_switcher_new.gif") !important;}');
addGlobalStyle('#ColourTog a {background-repeat: no-repeat !important;}');
addGlobalStyle('#publishwidget, #friends_w span, #wishlist_w span {background-image: url("http://hot.projektas.lt/lastfmblue/add-widget.gif") !important;}');
addGlobalStyle('#publishwidget, #friends_w span, #wishlist_w span {background-repeat: no-repeat !important;}');
addGlobalStyle('#scrapstylewidget, #rmFriend_w span {background-image: url("http://hot.projektas.lt/lastfmblue/removewidget.gif") !important;}');
addGlobalStyle('#scrapstylewidget, #rmFriend_w span {background-repeat: no-repeat !important;}');
addGlobalStyle('#message_w span {background-image: url("http://hot.projektas.lt/lastfmblue/messagewidget.gif") !important;}');
addGlobalStyle('#message_w span {background-repeat: no-repeat !important;}');
addGlobalStyle('#recommend_w span {background-image: url("http://hot.projektas.lt/lastfmblue/Recowidget.gif") !important;}');
addGlobalStyle('#recommend_w span {background-repeat: no-repeat !important;}');
addGlobalStyle('#tag_w span {background-image: url("http://hot.projektas.lt/lastfmblue/tagwidget.gif") !important;}');
addGlobalStyle('#tag_w span {background-repeat: no-repeat !important;}');
addGlobalStyle('#journal_w span {background-image: url("http://hot.projektas.lt/lastfmblue/writeaboutwidget.gif") !important;}');
addGlobalStyle('#journal_w span {background-repeat: no-repeat !important;}');

// COLOURS:
addGlobalStyle('.lastChart table.recenttracks tr.now td.chartlabel div div .date, .instructBox h4, .instructBox span, .instructBox a, .instructBox a:link, .instructBox a:visited, div#noobShowOff, .forumtable .threadTitle strong.hot, body.black .instructBox h4, .instructBox.black h4  {color: #62788e !important;}');
// #243f5b
addGlobalStyle('a:hover, .articleDisplay a:hover, .forumtable a:hover, .journals a:hover, .chartmore a:hover, .details a:hover, #tabheader .current a, li.journalHeader span.numComments a:hover, .flashPreview a:hover span, .radioPreview a:hover span, #LastWebsite .pagination a:hover, .pagination a.prevlink:hover span, .pagination a.nextlink:hover span, #homepageRight div.homepageContent a.normhover:hover, .chartmore a:hover, .forumtable td.threadTitle small.threadPagination a:hover, .forumtable .lastPost small a:hover, div.userDisplay li a:hover, div.userDisplay li.userName a:hover, li.journalHeader a.ulink:hover, .dlBlock a:hover, .dlBlock .underlinks a.dl:hover, .homepage .labelpromo a:hover, .buyfrom a:hover, a.hasreplies:hover span, a.pdfDownload:hover span {border-bottom: 0px solid #243f5b; !important;}');
addGlobalStyle('.lastChart .falling, .errorBox, .errorBox a, .currentStation, body.black .instructBox a {color: #243f5b !important;}');
addGlobalStyle('body.errorBox a:hover {background-color: #a9b7c5 !important;}');
addGlobalStyle('.instructBox a:hover {background-color: #a9b7c5 !important;}');
// #F99C22 (yellow)
addGlobalStyle('.forumtable .threadTitle strong.sticky {color: #243f5b !important; font-weight: bold !important;}');
// #fcb561 (pink)
addGlobalStyle('.infoBox, .infoBox a, .infoBox a:link, .infoBox a:visited {color: #243f5b !important;}');
addGlobalStyle('table.recentList tr.lastHour td.date, div.theDashboard table.recentList tr.now td.date {color: #243f5b !important;}');
addGlobalStyle('body.black table.recentList tr.now td, table.recentList tr.now td {background-color: #a9b7c5 !important;}');
addGlobalStyle('.lastChart table.recenttracks tr.now td.chartlabel div div .date {color: #a9b7c5 !important;}');
addGlobalStyle('#badgeTop a:hover span, body.black #badgeTop a:hover span {background-color: #a9b7c5 !important;}');
addGlobalStyle('body.black .dlBlock a:hover, body.black .dlBlock .underlinks a.dl:hover, body.black .homepage .labelpromo a:hover, .dlBlock a:hover, .dlBlock .underlinks a.dl:hover, .homepage .labelpromo a:hover {background-color: #a9b7c5 !important;}');


// MISC:
addGlobalStyle('#LastWidgets a.widget:hover {border: 0; !important}');
addGlobalStyle('a:hover {border: 0; !important}');
addGlobalStyle('#LastAd_TopRight, #beacon_10790, #LastAd_Top {display: none; !important}');
