// ==UserScript==
// @name           JTV Fixerizer
// @description    Several options to make JTV a more user friendly experience.
// @include        http://*.justin.tv/*
// @namespace      #jtvf1x
// @version        0.30
// ==/UserScript==

// This option changes clips pages to a low light mode (ie. no more blinding white background at 2AM). For now (at least) this gets rid of the Gigya quick embed option below the clips. Does anyone even use that?

var lowLight=true;

// Remove ad above chat and expand chat window to the top of the page.

var bigChat=true;

// Remove the Related Live Channels section on channels.

var removeRelated=true;

// Remove the Next Channel prompt at the upper right of channels.

var noNext=true;

// !!!!!!!!! DO NOT CHANGE ANYTHING BELOW THIS !!!!!!!!!!!

// Allow everyone to download clips.

var clipPage = document.getElementById('next_clip');

if(clipPage)
{
var getDownloaded = document.getElementById('downloaded');
var daURL = getDownloaded.getAttribute("href");
getDownloaded.parentNode.removeChild(getDownloaded);
var newDownload = document.createElement("a");
newDownload.innerHTML = '<a href=' + daURL + ' class=subplayer_button id=downloaded nofollow=true><img src=http://www-cdn.justin.tv/images/0px.gif><b>Download</b></a>';
var reportBefore = document.getElementById('reported');
reportBefore.parentNode.insertBefore(newDownload, reportBefore);
}


// Lower the lights on clips pages.

if(lowLight && clipPage)
{
var noGigya = document.getElementById('gigya');
noGigya.parentNode.removeChild(noGigya);
GM_addStyle("#page_wrapper {color: #BBBBBB !important; background: #545454 !important; min-width: 970px; padding: 30px 0px; line-height: 22px !important;}");
GM_addStyle("body {background: #545454 !important;}");
GM_addStyle(".clip_title {color: #ABABAB !important;}");
GM_addStyle(".box {border: 1px solid #000000 !important; background: #AAAAAA !important; color: #DDDDDD !important;}");
GM_addStyle(".box a:link {color: #555555 !important; text-decoration: underline;}");
GM_addStyle(".comment_timestamp {color: #444444 !important;}");
GM_addStyle(".box a:visited {color: #555555 !important; text-decoration: underline;}");
GM_addStyle(".section_hdr_rlink a:link {color: #FFFFFF !important; text-decoration: underline;}");
GM_addStyle(".section_hdr_rlink a:visited {color: #888888 !important; text-decoration: underline;}");
GM_addStyle(".subplayer_button {color: #888888 !important; text-decoration: none !important; font-size: 100% !important;}");
GM_addStyle(".section a:link {color: #BBBBBB !important; text-decoration: none !important;}");
GM_addStyle(".section a:visited {color: #888888 !important; text-decoration: none !important;}");
GM_addStyle(".title a:link {color: #CCCCCC !important; text-decoration: none !important;}");
GM_addStyle(".title a:visited {color: #888888 !important; text-decoration: none !important;}");
GM_addStyle(".stat {color: #BBBBBB !important; text-decoration: none !important;}");
GM_addStyle(".stat {color: #888888 !important; text-decoration: none !important;}");
GM_addStyle(".panel {background: #444444 !important; border: 1px solid #000000 !important;}");
GM_addStyle(".comment_header {background: #888888 !important; border-: 1px solid #000000 !important; font-size: 115%; padding: 3px 5px; margin-bottom: 5px; line-height: 100%;}");
GM_addStyle(".comment_header a:link {color: #DDDDDD !important;}");
GM_addStyle(".comment_header a:visited {color: #DDDDDD !important;}");
GM_addStyle("input[type=text] {color: #CCCCCC !important; background: #777777 !important;}");
GM_addStyle("#new_comment {background: #AAAAAA !important; padding: 10px; margin-bottom: 10px; border: 1px solid #000000 !important;}");
GM_addStyle(".field {border: 1px solid #000000 !important; background: #777777 !important; color: #CCCCCC !important;}");
GM_addStyle("#subplayer_buttons #shared img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -0px -48px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #shared:hover img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -30px -48px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #reported img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -30px -24px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #reported:hover img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -60px -24px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #next_clip img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -60px -0px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #next_clip:hover img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -0px -24px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #downloaded img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -0px -0px !important; background-repeat: no-repeat;}");
GM_addStyle("#subplayer_buttons #downloaded:hover img {background:  url(http://www.pressstart.tv/pressstart/jtv/combined-clip.rd30a5c088d6fe9e29bb81a3a0ba7a387764c5dcc.gif) !important; background-position: -30px -0px !important; background-repeat: no-repeat;}");
}

//
if(removeRelated)
{
var chipotlAway = document.getElementById('related');
chipotlAway.parentNode.removeChild(chipotlAway);
}

// Alters beta chat window size

if(bigChat)
{
GM_addStyle("#chat_lines {height: 36.2558em !important}");
var adAway = document.getElementById('ad');
adAway.parentNode.removeChild(adAway);
}

if(bigtv)
{
GM_addStyle("#tv_lines {height: 20.2558em !important}");
}

if(noNext)
{
nxGone = document.getElementById('next_channel');
nxGone.parentNode.removeChild(nxGone);
}