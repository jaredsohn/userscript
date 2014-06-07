// All credits go to (http://groups.myspace.com/gmscripts)
//
// ==UserScript==
// @name          StonerKev's Home-Page
// @namespace     thebongripper@hotmail.com
// @description	  Customized 'Home page' for myspace.com
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://img393.imageshack.us/img393/1534/greenyhomepage3ef.jpg) #1D3A1C scroll;margin-top:-35px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:yellow!important; font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:silver!important; background-image:url(); cursor:crosshair}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #1D3A1C!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #000000}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:black; position:relative; top:35px;}\n";
s+= "#header .right a {font-weight:normal!important; color:green}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:green;}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:yellow!important;}\n";
s+= "#topnav a:hover {color:ghostwhite!important;}\n";
s+= ".section {border:2px solid #C5D801!important;-moz-border-radius:10px;background-color:116900!important;padding:4px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:black;border:none!important;-moz-border-radius:4px;display:inline!important;padding:2!important;background-color:C5D801!important;}\n";
s+= "#home_profileInfo .heading {font-size:12pt!important; display:inline!important; text-align:center; font-weight:bold!important; color:black;}\n";
s+= "#home_profileInfo img {padding-top:0px;padding-left:0px;}\n";
s+= ".left center {color:000000}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:990033!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:ghostwhite!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:000000!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;text-align:center;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:ghostwhite; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:000000}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:inline;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:C5D801; color:777777; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:1D3A1C!important; font-weight:none!important}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= " {text-align:center; color:ghostwhite}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #splash_coolNewPeopleBrowse, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";
document.getElementById('splash_coolNewPeople').innerHTML = '<embed src= "http://www.filelodge.com/files/room28/761125/homepage-skin_Scene%201.swf?playlist_url=http://www.filelodge.com/files/room28/761125/examplebiglist666.xml&autoplay=true&info_button_text=Lyrics" quality="high" bgcolor="000000" name="xspf_player" allowScriptAccess="never" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="162" width="225">';

GM_addStyle(s);

// take out the last line(document.getElementById('splash_coolNewPeople').innerHTML), if you want your 'cool new people' back.