// ==UserScript==
// @name             brad's homepage
// @namespace         brad
// @description       brad's hompage made by useing herpes coding
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';
s = "body{background:url(// ==UserScript==
// @name             brad's homepage
// @namespace         brad
// @description       brad's hompage made by useing herpes coding
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';
s = "body{background:url(http://joyboner.com/gmscripts/img/bg06.gif) center repeat-y #000!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#ff8a0c!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#005178!important; color:#BFEAFF!important; padding-top:55px!important;}\n";
s+= "a{color:#FFF!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#80D6FF!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:000000!important;}\n";
s+= ".heading{border-bottom: 1px solid #f4ff74!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#FFF!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#ac1aa3;color:#000;}\n";
s+="table table table {border:0px solid; padding:2; background-color:2d40f9;}n";

html = document.body.innerHTML.replace(/Hello,/, "What's up?,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');



//Left Column Background Color
var leftbg = "005178";

//Right Column Background Color
var rightbg = "0074ab";

//Comment Text Color
var textcolor = "80D6FF";

//Comment Links Color
var linkcolor = "444444";

//Use "top" for links to open is same window/tab 
//Leave "blank" to open in a new window/tab
var window = "blank";

// Remove the line below to bring back the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Remove the line below to bring back the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");


var url = 'http://joyboner.com/gmscripts/homecomts01.php?id='+friendid+'&l='+leftbg+'&r='+rightbg+'&t='+textcolor+'&a='+linkcolor+'&w='+window;
var edit = 'http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID='+friendid;
var ad = document.getElementById('squareAd');
var comts = '<iframe style="width:300; height:250; overflow:auto; border:0;" src="'+url+'">';
ad.innerHTML = comts;


s = "body {background:url(photobucket.com/albums/m105/dabax2324/black.gif) #009900 fixed;margin-top:25px;}\n";) center repeat-y #000!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#ff8a0c!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#005178!important; color:#BFEAFF!important; padding-top:55px!important;}\n";
s+= "a{color:#FFF!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#80D6FF!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:000000!important;}\n";
s+= ".heading{border-bottom: 1px solid #f4ff74!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#FFF!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#ac1aa3;color:#000;}\n";
s+="table table table {border:0px solid; padding:2; background-color:2d40f9;}n";

html = document.body.innerHTML.replace(/Hello,/, "What's up?,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');



//Left Column Background Color
var leftbg = "005178";

//Right Column Background Color
var rightbg = "0074ab";

//Comment Text Color
var textcolor = "80D6FF";

//Comment Links Color
var linkcolor = "444444";

//Use "top" for links to open is same window/tab 
//Leave "blank" to open in a new window/tab
var window = "blank";

// Remove the line below to bring back the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Remove the line below to bring back the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");


var url = 'http://joyboner.com/gmscripts/homecomts01.php?id='+friendid+'&l='+leftbg+'&r='+rightbg+'&t='+textcolor+'&a='+linkcolor+'&w='+window;
var edit = 'http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID='+friendid;
var ad = document.getElementById('squareAd');
var comts = '<iframe style="width:300; height:250; overflow:auto; border:0;" src="'+url+'">';
ad.innerHTML = comts;


s = "body {background:url(photobucket.com/albums/m105/dabax2324/black.gif) #009900 fixed;margin-top:25px;}\n";