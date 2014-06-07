// ==UserScript==
// @name	 by  
// @description	created using 8bit's Nex Skin Loader v2 Alpha - run in Wire Frame @ no frames
// @include	http://nexopia.com/*
// @include	http://*.nexopia.com/*
// ==/UserScript==

/* HEADERS */
GM_addStyle('td[height="90"] { background: url("http://i116.photobucket.com/albums/o20/Nights_Dream/Retro%20or%20Fashion%20or%20Vintage/retro-6.gif"); }'); /* pageheader */
GM_addStyle('td.headerfront { background: url("http://i116.photobucket.com/albums/o20/Nights_Dream/Retro%20or%20Fashion%20or%20Vintage/retro-13.gif"); }'); /* body header background image */
GM_addStyle('td.sideheader { background: url("http://i226.photobucket.com/albums/dd295/bedawonformee/bands%20and%20music/image2.jpg"); }'); /* sideheader background image */
GM_addStyle('td.sideheader { background-color: #00FF00; }'); /* sideheader background colors */
GM_addStyle('td[height="23"] { background: url("http://i116.photobucket.com/albums/o20/Nights_Dream/Retro%20or%20Fashion%20or%20Vintage/vintage-2.png"); }'); /* menu backgrounds */

/* BODY */
GM_addStyle('body { background-color: #C0C0C0; }'); /* skin background colors */

/* SIDE */
GM_addStyle('td.side { background-color: #C0C0C0; }'); /* side box background colors */

/* FONTS AND LINKS */
GM_addStyle('td.side a, td.side a:link, td.side a:visited, td.side a:active  { color: #FF00FF; }'); /* side links */
GM_addStyle('td.side a:hover { color: #FFFFFF; }'); /* side link: hovers */
GM_addStyle('td.side { color: #00FFFF; }'); /* side box colors */
GM_addStyle('a.forumlst0:link,a.forumlst0:visited { color: #FFFF00; text-decoration:none; font: 8pt arial }'); /* no unread posts links */
GM_addStyle('a.forumlst0:hover,a.forumlst0:active { color: #FFFF00; text-decoration:none; font: 8pt arial }'); /* no unread posts link hovers */
GM_addStyle('a.forumlst1:link,a.forumlst1:visited { color: #FFFF00; text-decoration:none; font: 8pt arial }'); /* some unread posts links */
GM_addStyle('a.forumlst1:hover,a.forumlst1:active { color: #FFFF00; text-decoration:none; font: 8pt arial }');/* some unread posts link hovers */
GM_addStyle('a.forumlst2:link, a.forumlst2:visited { color: #00FFFF; text-decoration:none; font: 8pt arial }'); /* new thread links */
GM_addStyle('a.forumlst2:hover, a.forumlst2:visited:hover { color: #00FFFF; text-decoration:none; font: 8pt arial }'); /* new thread link hovers */
GM_addStyle('td.sideheader { color: #FFFF00; }'); /* sideheader Font Colors */
GM_addStyle('td.menu { color: #FFFF00; }'); /* menu text */
GM_addStyle('td.menu a { color: #FFFF00; }'); /* menu links */
GM_addStyle('td.menu a:hover { color: #FFFF12; }'); /* menu links: hovers */
GM_addStyle('td.side input, select, option, textarea, td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body, body textarea { color: #FFFF00; }'); /* input and selects colors */

/* INPUTS AND SELECTS */
GM_addStyle('td.side input, select, option, textarea { border: 1px solid #FFFF00; }'); /* side inputs and selects border */
GM_addStyle('td.side input, select, option, textarea { background-color: #00FF00; }'); /* side inputs and selects background */
GM_addStyle('td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body { border: 1px solid #FFFF00; }'); /* body inputs and selects border */
GM_addStyle('td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body { background-color: #00FF00; }'); /* body inputs and selects background */





if (window.location.href.indexOf("nexopia.com/profile.php")==-1)
{
GM_addStyle('td.online { color: #000000; }'); /* profile online colors */
GM_addStyle('td.offline { color: #000000; }'); /* profile offline colors */
GM_addStyle('td.body, td.online, td.offline { background-color: #C0C0C0; }'); /* body background colors */
GM_addStyle('td.body2 { background-color: #C0C0C0; }'); /* body shadow background colors */
GM_addStyle('td.header, td.small { background-color: #000000; }'); /* header background colors */
GM_addStyle('td.header2 { color: #FFFF00; }'); /* subheader Font Colors */
GM_addStyle('td.header, td.small { color: #FFFF00; }'); /* primary header Font Colors */
GM_addStyle('td.body, td.body2 { color: #00FF00; }'); /* body Font Colors */
GM_addStyle('a.body, a.body:visited, a.body:link, a.body:active, a.body2, a.body2:link, a.body2:active, a.body2:visited, a.forumlst2, a.header, a.header:active, a.header:visited, a.header:link, a.small, a.small:active, a.small:visited, a.small:link, a.header2, a.header2:link, a.header2:active, a.header2:visited  { color: #FF00FF; }'); /* primary links */
GM_addStyle('a.body:hover, a.body2:hover, a.header:hover, a.header2:hover { color: #FFFFFF; }'); /* body link: hovers */
}



