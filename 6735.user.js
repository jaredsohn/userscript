// ==UserScript==
// @name          nomoregmv2
// @description	  Replace Square Ad With User Comments
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @include       http://*.myspace.com/index.cfm?fuseaction=user*
// @include       http://*vidsearch.myspace.com/*index.cfm?fuseaction=vids.fullsearch*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

// HIDE URL BOX
GM_addStyle("#home_userURLInfo {display:none;}");

// HIDE HOMEPAGE LINK
GM_addStyle("#home_setHomePage {display:none;}");

//HIDE GREYBOX
GM_addStyle("#home_greybox {display:none;}");

// HIDE SHOWS
GM_addStyle("#home_shows {display:none;}");

//HIDE TOP ADS
GM_addStyle("#headerlinks {display:none;}");

// HIDE Myspace WASTE
GM_addStyle("#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#home_shows,#home_bulletins,#splash_profile,th,#footer,#home_greybox,#ctl00_Main_ctl00_AdditionalLinks1_MusicStoreHyperLink,#home_announcements,#ctl00_Footer_viewPics_gads,#ctl00_Main_ctl00_ProfileHome_gads,#ctl00_Main_com_gads_tbl_right,#side_google,#ad-hdr,#ctl00_Main_CMS_ViewImage_Gads,#right_ads,#ctl00_cpMain_CMS_ViewFriends_Gads,#ctl00_cpMain_ViewFriends_gads,#ad-wrap {display:none;}");

//myDiv selectors
GM_addStyle(".div5{ position: absolute; left: 50%; top:500px; margin-left:-385px; height: 15px; width: 320px; background-color:transparent; z-index:2;}");

myDiv = document.createElement("div");myDiv.setAttribute("class", "div5");document.getElementById('body').appendChild(myDiv);

myDiv.innerHTML = "<embed src=\"http://www.fileden.com/files/2006/12/18/526979/xspf_player_slim.swf?playlist_url=http://www.fileden.com/files/2006/12/18/526979/mp3playlist23.xspf&autoplay=true&randomstart=true&info_button_text=myspace.com/nomorerape\" quality=\"high\" name=\"xspf_player\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" height=\"15\" width=\"323\"></embed><BR><BR><BR><img src=\"http://i5.photobucket.com/albums/y175/salimdao/SpraypaintDoodle.jpg\">";

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

// YOU CAN EDIT COLORS BELOW

//Left Column Background Color
var leftbg = "ffffff";

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
var comts = '<iframe style="width:300; height:250; overflow:auto; border:0;" src="'+url+'">'+'</iframe><br/><br/><center><a href="http://photobucket.com/">Photobucket</a> /<font color="#000000">/</font><font color="#000000">/</font> <a href="http://www.youtube.com/">YouTube</a></center>';
ad.innerHTML = comts;

// ==/UserScript==

s= "#ad-wrap {display:none;}\n";

GM_addStyle(s);

