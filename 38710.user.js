// ==UserScript==
// @name          Clean Myspace
// @description	  Cleans up myspace and removes all clutter. PLEASE NOTE YOU WILL NEED TO ADD YOUR MYSPACE ID TO THIS CODE BEFORE INSTALLING, OTHERWISE THE LINKS WILL NOT WORK
// @include		  http://home.myspace.com/*
// ==/UserScript==



///////////////////////////////////////////
//				Made By Baggs			 //
///////////////////////////////////////////



//Change this to your myspace id
var id = 'ID HERE';
///////////////////////////////////////////


///////////////////////////////////////////
////////////DONT EDIT BLOW THIS////////////
///////////////////////////////////////////


try
{
	document.getElementById('squareAd').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('tkn_newhomepageleaderboard').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('googletestgooglead').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('addressbookintl').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('googletestgraybox').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('tkn_leaderboardDiv').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('featuredprofilerounded').style.display = "none";
}
catch(err)
{}
try
{

document.getElementById('marketingcontent').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('grayboxrounded').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('googlead').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('googleadtest').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('ctl00_ctl00_cpMain_cpMain_MarketingBox_userHomeTabs_userHomeTabs').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('appnavigation').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('footer').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('main').style.width = "700px";
document.getElementById('main').style.marginTop = "30px";
}
catch(err)
{}

try
{
document.getElementById('leaderboard').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('logo').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('googleLogo_Header').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('headControls').style.display = "none";
}
catch(err)
{}

try
{
var html = "";

html += '<li><a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + id + '">Comments</a></li>'

html += '<li><a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox">Messages</a></li>'

html += '<li><a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewAlbums&friendID=' + id + '">Photos</a></li>'


document.getElementById('viewUL').innerHTML = html;
}
catch(err)
{}

try
{
document.getElementById('videoLinks').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('manageCalendar').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('manageBlog').style.display = "none";
}
catch(err)
{}


try
{
document.getElementById('linksGroup').style.display = "none";
}
catch(err)
{}
try
{
document.getElementById('lastLogin').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('header').style.display = "none";
}
catch(err)
{}


try
{
document.getElementById('findFriendsLinks').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('cbDown opaque').style.display = "none";
}
catch(err)
{}

try
{
document.getElementById('pymk').style.display = "none";
}
catch(err)
{}









