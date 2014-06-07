// ==UserScript==
// @name              nomoretest
// @description       Home Userscript
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://i5.photobucket.com/albums/y175/salimdao/salim/4Friends/bg03.gif) center repeat-y #FFF!important; overflow:auto;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#ctl00_Main_ctl00_FriendSpace1_ViewBirthdaysHyperlink,#ctl00_Main_ctl00_FriendSpace1_Tr1,#ctl00_Main_ctl00_FriendSpace1_Panel1,#splash_coolNewPeople,#home_shows,#home_bulletins,#splash_profile,th,#footer,#home_greybox,#home_profileInfoLinks,#ctl00_Main_ctl00_AdditionalLinks1_MusicStoreHyperLink {display:none;}\n";
s+= "div, table, tr, td, .heading{color:#FFF!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#612424!important; color:#afcd1d!important; padding-top:55px!important;}\n";
s+= ".indicator img {display:none}\n";
s+= "a{color:#EE2288!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#615524!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:silver!important;}\n";
s+= ".heading{border-bottom: 1px solid #FFF!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important; text-align:right;}\n";
s+= "#home_infoBar span, strong span{color:#612424!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px; text-align:right;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2, {padding-left:0px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= ".section {text-align:right;}\n";
s+= ".div5{ position: absolute; left: 50%; top:470px; margin-left:-385px; height: 15px; width: 320px; background-color:transparent; z-index:2;}\n";
s+= ".div2{ position: absolute; left: 50%; top:110px; margin-left:-185px; height: 15px; width: 320px; background-color:transparent; font-size:9px; text-align:left; z-index:2;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#ff7e00;color:#FFF;}\n";
s+= "#home_friends.section a{visibility:hidden;}\n";s+= "#home_friends.section span a, #home_friends.section a img{visibility:visible;}\n";s+= "#home_friends.section a{visibility:hidden!important;font-size:0px;}\n"
s+= "#home_profileInfo {height:190px;}\n";

html = document.body.innerHTML.replace(/View My.*:/, 'nomore:');document.body.innerHTML = html;

html = document.body.innerHTML.replace(/Hello.*!/, '<img src="http://i5.photobucket.com/albums/y175/salimdao/salim/Layout/484euf7.jpg" width="300px" height="15px">');document.body.innerHTML = html;

html = document.body.innerHTML.replace(/My Friend Space.*/, 'WTFriends');document.body.innerHTML = html;

html = document.body.innerHTML.replace(/All Bulletin Entries.*/, 'Bulletin Board');document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

myDiv = document.createElement("div");myDiv.setAttribute("class", "div5");document.getElementById('body').appendChild(myDiv);

myDiv.innerHTML = "<embed src=\"http://www.myfilehut.com/userfiles/220032/xspf_player_slim.swf?playlist_url=http://www.myfilehut.com/userfiles/220032/mp3playlist183.xspf&autoplay=true&randomstart=true&info_button_text=myspace.com/nomorerape\" quality=\"high\" name=\"xspf_player\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" height=\"15\" width=\"323\"></embed>";

myDiv1 = document.createElement("div");myDiv1.setAttribute("class", "div2");document.getElementById('body').appendChild(myDiv1);

myDiv1.innerHTML = "<a href=\"http://editprofile.myspace.com/index.cfm?fuseaction=profile.safemode\">Be Safe</a><br><BR><a href=\"http://photo.myspace.com/index.cfm?fuseaction=user.uploadphoto\">Upload Photos</a><br><BR><a href=\"http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=29863242\">Edit Comments</a><BR><BR><a href=\"http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=29863242\">View Friends</a><BR><BR><a href=\"http://collect.myspace.com/index.cfm?fuseaction=user.editTopFriends&friendID=29863242\">Edit Top Friends</a><BR><BR><a href=\"http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&friendID=29863242\">Birthdays</a>";

GM_addStyle(s);

//Comments On Home
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

// YOU CAN EDIT COLORS BELOW

//Left Column Background Color
var leftbg = "000000";

//Right Column Background Color
var rightbg = "000000";

//Comment Text Color
var textcolor = "ffffff";

//Comment Links Color
var linkcolor = "ffffff";

//Use "top" for links to open is same window/tab 
//Leave "blank" to open in a new window/tab
var window = "top";

// Remove the line below to bring back the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Remove the line below to bring back the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");

// DO NOT EDIT BELOW 
var url = 'http://joyboner.com/gmscripts/homecomts01.php?id='+friendid+'&l='+leftbg+'&r='+rightbg+'&t='+textcolor+'&a='+linkcolor+'&w='+window;
var edit = 'http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID='+friendid;
var ad = document.getElementById('squareAd');
var comts = '<iframe style="width:300; height:240; overflow:auto; border:0;" src="'+url+'">'+
'</iframe><br/><br/><center><a href="http://photobucket.com/">Photobucket</a> /<font color="#615524">/</font><font color="#FFFFFF">/</font> <a href="http://www.youtube.com/">YouTube</a></center>';
ad.innerHTML = comts;


