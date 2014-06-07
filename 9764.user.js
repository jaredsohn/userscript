// ==UserScript==
// @name          Comments On Homepage
// @namespace     Drew - joyboner.com [8.12.06]
// @description	  Replace Square Ad With User Comments
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

// YOU CAN EDIT COLORS BELOW

//Left Column Background Color
var leftbg = "222222";

//Right Column Background Color
var rightbg = "ffffff";

//Comment Text Color
var textcolor = "000000";

//Comment Links Color
var linkcolor = "cc0000";

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
var comts = '<iframe style="width:660; height:240; overflow:auto; border:0;" src="'+url+'">'+
'</iframe><br/><br/><center><a href="'+edit+'">Edit Comments</a></center>';
ad.innerHTML = comts;