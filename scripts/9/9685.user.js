// ==UserScript==
// @name          The Adam Kramer's MySpace 
// @author        The Adam Kramer
// @description	  Custom MySpace Homepage to make everything viewable on without scrolling, and remove unnecessary items
// @include       http://home.myspace.com/*
// ==/UserScript==




//*************************************************************

// This part removes elements from the page, if you see something you want back, comment out that line. If MySpace adds in a new element (they do this often) feel free to look up the name of the element in the page source and add in the name of the div into one of the empty slots near the bottom of this section



var head = document.getElementsByTagName('head')[0];
if (content) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.clear {height:0px;}';
    head.appendChild(style);
}

var b = document.getElementById("home_infoBar");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("splash_coolNewPeople");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_userURLInfo");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_setHomePage");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_schools");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("squareAd");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("splash_profile");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_greybox");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_coolNewVideos");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_featured_filmmaker");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_featured_comedy");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_featured_music");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("home_featured_books");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("footer");
if (b) {b.parentNode.removeChild(b);}
var b = document.getElementById("header");
if (b) {b.parentNode.removeChild(b);}
//var b = document.getElementById("INSERT DIV NAME HERE");
//if (b) {b.parentNode.removeChild(b);}
//var b = document.getElementById("INSERT DIV NAME HERE");
//if (b) {b.parentNode.removeChild(b);}
//var b = document.getElementById("INSERT DIV NAME HERE");
//if (b) {b.parentNode.removeChild(b);}
//var b = document.getElementById("INSERT DIV NAME HERE");
//if (b) {b.parentNode.removeChild(b);}
//var b = document.getElementById("INSERT DIV NAME HERE");
//if (b) {b.parentNode.removeChild(b);}



//************************************************************

// This section adds in links under your profile picture that were missing upon a myspace redesign. This section gets complicated and is based off of another script that I edited. 



if (document.forms.length > 0) {

	var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");

		var viewcmnt = document.createElement('a');
		viewcmnt.href = "http://comments.myspace.com/index.cfm?fuseaction=user.homeComments&friendID="+friendID[1];
		viewcmnt.innerHTML = 'Cmnt';

		var pipe = document.createElement('span');
		pipe.innerHTML = ' | ';

		
		var bloglink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		bloglink.parentNode.insertBefore(viewcmnt, bloglink);
		bloglink.parentNode.insertBefore(pipe, bloglink);

		var pipe = document.createElement('span');
		pipe.innerHTML = ' | ';


		var mygroups = document.getElementById('ctl00_Main_ctl00_InfoBar1_HyperLink5');
		

		var bloglink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		bloglink.parentNode.insertBefore(mygroups, bloglink);
		bloglink.parentNode.insertBefore(pipe, bloglink);

		


	}
}




//*****************************************************************

// This is where I moved things around, so you can edit the positions to work with your likings!



 
GM_addStyle("#topnav {background:#6698CB; position:absolute; z-index:3; top:4px; left:390px; height:49px;}");

GM_addStyle("#main {background:#000000; height:10%;}");

GM_addStyle("#home_profileInfo {background:#D5E8FB; border:0px; position:absolute; z-index:2; text-align:left; width:290px; height:280px; top:-1px; left:-130px;}");

GM_addStyle("#home_messages { background:#D5E8FB; border:0px; position:absolute; text-align:center;  z-index:4; top:31px; left:158px; width:259px; height:260px;}");

GM_addStyle("#home_bulletins {background:#D5E8FB; border:0px; font-size; 7pt; position:absolute; z-index:1; top:230px; left:-130px; width:556px; height:293px;}");

GM_addStyle("#home_friends { background:#D5E8FB; border: 0px; position:absolute; z-index:1; top:27px; left:80px; width:479px; height:;}");

GM_addStyle("#home_announcements {position:absolute; left:0px; top:1000px;}");
