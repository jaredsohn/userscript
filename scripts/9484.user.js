// ==UserScript==
// @name          Homepage
// @namespace     None
// @description	  Myspace Homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

//style sheet
s= 'body {overflow:hidden;}';
s+= 'body {background:black;}';

//hides
s+= '#splash_coolNewPeople {display:none;}';
s+= '#home_setHomePage {display:none;}';
s+= '#home_additionalLinks {display:none;}';
s+= '#home_searchAddressBook {display:none;}';
s+= '#home_greybox {display:none;}';
s+= '#footer {display:none;}';
s+= '#home_userURLInfo {display:none;}';
s+= '#home_infoBar {display:none;}';
s+= '#squareAd {display:none;}';
s+= '#splash_profile {display:none;}';
s+= '#home_coolNewVideos {display:none;}';
s+= '#home_featured_filmmaker {display:none;}';
s+= '#home_featured_comedy {display:none;}';
s+= '#home_featured_books {display:none;}';
s+= '#home_featured_music {display:none;}';

//divs
s+= '#home_friends {position:absolute;left:-6px;top:-5px;z-index:4;width:425px;height:275px;overflow:hidden;}'
s+= '#home_bulletins {position:absolute;left:330px;top:280px;width:425px;height:245px;overflow:hidden;}'
s+= '#home_schools {border:0px;}';
s+= '#home_profileInfo {height:300px!important;}';
s+= '#home_messages {margin-top:-10px;}';
s+= '#home_friendsTop8 {position:fixed;margin-top:-28px;}';
s+= '#home_friendsBirthdays {position:fixed;margin-top:-28px;margin-left:250px;}';

GM_addStyle(s);

//other
document.getElementById('header').innerHTML = '<center>Username can go here</center>';
document.getElementById('home_schools').innerHTML = '<embed src="http://andyrew03.sitesled.com/music/player/xspf4.swf?playlist_url=http://andyrew03.sitesled.com/music/player/playlist2.xml&autoplay=true" height="100" width="315">';