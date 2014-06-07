// 
// 
//
// ==UserScript==
// @name          Russell's Homepage
// @namespace     #Jo\n @ r4wr[dot]com
// @description	  Myspace Homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

if (document.forms.length > 0) {

var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";

var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var ql = wl.snapshotItem(0);

if (ql) {

var killadd = document.getElementById('ctl00_Main_ctl00_Welcome1_AddressBookHyperLink');

killadd.parentNode.removeChild(killadd);

}}

if (document.forms.length > 0) {

var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";

var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var ql = wl.snapshotItem(0);

if (ql) {

var killcal = document.getElementById('ctl00_Main_ctl00_Welcome1_ManageCalendarHyperLink');

killcal.parentNode.removeChild(killcal);

}}

if (document.forms.length > 0) {

var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";

var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var ql = wl.snapshotItem(0);

if (ql) {

var killvids = document.getElementById('ctl00_Main_ctl00_Welcome1_UploadChangeVideosHyperLink');

killvids.parentNode.removeChild(killvids);

}}

if (document.forms.length > 0) {

var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";

var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var ql = wl.snapshotItem(0);

if (ql) {

var killblog = document.getElementById('ctl00_Main_ctl00_Welcome1_ManageBlogHyperLink');

killblog.parentNode.removeChild(killblog);

}}

if (document.forms.length > 0) {

var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";

var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var ql = wl.snapshotItem(0);

if (ql) {

var killveds = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyVideosHyperLink');

killveds.parentNode.removeChild(killveds);

}}




// new stylesheet
s = "#nav {position:absolute; right:5}\n";

s+= "#home_coolNewVideos {display:none!Important;}\n";

s+= "#content {position:absolute; left:5}\n";

s+= "body {background:url(http://img504.imageshack.us/img504/2629/bg2oe0.jpg) #000000 fixed;margin-top:-40px;}\n";

s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";

s+= "*{font-family:verdana}\n";

s+= "a:link, a:active, a:visited {color:#828282!important;font:bold 11px verdana!important;}\n";

s+= "a:hover {text-decoration:none; color:blue!important; background-image:url(http://www.mbif.net/backgrounds/lightningline.gif); }\n";
s+= "a[id*='friendImageLink']:hover img {background-image:url(http://www.mbif.net/backgrounds/lightningline.gif);}\n";
s+= "a[id*='friendImageLink'] img {max-height:131px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:#157505; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:black!important; border:2px solid #828282!important;-moz-border-radius:10px;padding:2px;margin-bottom:10px; color:#157505}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:#ffffff!important;}\n";
s+= "#topnav a:hover {color:blue!important;}\n";
s+= ".section {border:2px solid #828282!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:#157505;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:#828282}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:#157505}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:#828282!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:#828282!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:#157505!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:#157505; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:#828282}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:white; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:828282!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:666666;}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";
s+= "#home_coolNewVideos {display:none!Important;}\n";
s+= ".clear {font-size:0}\n";
s+= "#home_greybox{display:none;}\n";
s+= "#home_coolNewVideos {display:none!Important;}\n";
s+= ".adspotimage {position:absolute; left:50%; margin-left:-350px; top:700px;}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";


document.getElementById('splash_coolNewPeople').innerHTML = '<center><img src="http://img73.imageshack.us/img73/2489/untitled2kg0.jpg"><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=104527283&adTopicID=12&Mytoken=61FB93AD-AC32-469A-8C9BD2B1EB3FF6D352284984" target="new">LOST</a>&nbsp;|&nbsp;<a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=104471832&adTopicID=23&Mytoken=16E88202-43CE-45EE-BFBF63F3A10CAC0052134031" target="new">Div Space</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=104219486&adTopicID=12&Mytoken=A5F5C3A9-B918-4AE8-8E17534F489CCBA152380485" target="new">Heroes</a>&nbsp;|&nbsp;<a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory&CategoryID=0&GroupID=102687275&Mytoken=E55F8D11-4342-4B1C-B0CEC4CB7F784F4B130779515" target="new">Test</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=100005342&adTopicID=34&Mytoken=E651F1FC-C1E8-4DD4-BF1970EB2182F9D649584329" target="new">Js Lounge</a>&nbsp;|&nbsp;<a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=103954834&adTopicID=6&Mytoken=94A2E4FA-A9DC-45CD-87EFDD1C0B46BAB352591188" target="new">Group Coders</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=100003021&adTopicID=6" target="new">HTML Masters</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=101319389&adTopicID=12&Mytoken=87C2F528-D68B-6E9E-C761103A33ED255135607976" target="new">Spoilers</a>&nbsp;|&nbsp;<a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=102672690&adTopicID=23&Mytoken=F52F876F-9D9E-1364-8EB65DC2BFD813E535648803" target="new">Mole Code</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=102333187&adTopicID=22&Mytoken=C0A29DA1-B595-4E52-82F9AD710AE7F2771247055828" target="new">The Dharma Bums</a><br><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=103268612&adTopicID=6&Mytoken=06834070-8165-4F2F-9F3CFBBC6258472653695328" target="new">GreaseMonkey</a>';



GM_addStyle(s);

