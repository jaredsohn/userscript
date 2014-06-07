// ==UserScript==
// @name          Cody's Homepage
// @namespace     Copyright Cody R. Persinger 2006
// @description   Modified homepage - yellow & brown scheme
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==


// skin only works for MY homepage
if(document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href.match(/78442099/))

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "body {background: #FFFFCD no-repeat fixed;margin-top:50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:georgia}\n";
s+= "a:link, a:active, a:visited {color:330000!important;font:normal 11px georgia!important;}\n";
s+= "a:hover {text-transform:lowercase;text-decoration:none;}\n";
s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:1px solid #330000!important;}\n";
s+= "#topnav {margin-left:auto;margin-right:auto;width:600px;background-color:CA754D!important;font-size:0;border:1px solid black!important;height:18px;padding:0!important;}\n";
s+= "#topnav a {font:normal 11px georgia;margin-left:3px;margin-right:3px;color:black!important;}\n";
s+= ".section {border:1px solid black!important;background-color:FEE692!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:normal 11px georgia!important;color:black;border:1px solid black!important;display:inline;padding:0!important;background-color:CA754D!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important;}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src="http://www.fileden.com/files/2006/7/10/122171/xspf_lighttan.swf?playlist_url=http://www.fileden.com/files/2006/7/10/122171/Screamoplaylist.xml&autoload=true" quality="high" name="xpsf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="160" width="225"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= ".indicator {height:13px;margin-left:2}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:black!important;font-weight:bold!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block;}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after,a[href*='=rateImage']:after {content:' |';}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= "#splash_coolNewPeople {height:163px;position:relative;left:14px;}\n";
s+= "#splash_coolNewPeople {text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center;}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#header, #home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer,a[href*='=comedian'],a[href*='=invite'],a[href*='=film'],a[href*='=vids.home'] {display:none}\n"; 

GM_addStyle(s);