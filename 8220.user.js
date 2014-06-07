// ==UserScript==
// @name           Home Page Fix
// @namespace      don't have one yet
// @description    For MySpace Homepage
// @include       http://home.myspace.com/index.cfm?fuseaction=user&*
// ==/UserScript==

//style sheet
s= 'body {overflow:hidden;}';

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
document.getElementById('home_schools').innerHTML = 'if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

// YOU CAN EDIT COLORS BELOW

//Left Column Background Color
var leftbg = "222222";

//Right Column Background Color
var rightbg = "ffffff";

//Comment Text Color
var textcolor = "222222";

//Comment Links Color
var linkcolor = "444444";

//Use "top" for links to open is same window/tab 
//Leave "blank" to open in a new window/tab
var window = "blank";

// Remove the line below to bring back the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Remove the line below to bring back the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");

// DO NOT EDIT BELOW 
var url = 'http://joyboner.com/gmscripts/homecomts01.php?id='+friendid+'&l='+leftbg+'&r='+rightbg+'&t='+textcolor+'&a='+linkcolor+'&w='+window;
var edit = 'http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID='+friendid;
var ad = document.getElementById('squareAd');
var comts = '<iframe style="width:300; height:250; overflow:auto; border:0;" src="'+url+'">';
ad.innerHTML = comts;';