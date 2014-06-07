// ==UserScript==
// @name	 by  
// @description	created using 8bit's Nex Skin Loader v2 Alpha - run in Wire Frame @ no frames
// @include	http://nexopia.com/*
// @include	http://*.nexopia.com/*
// ==/UserScript==

/* HEADERS */
GM_addStyle('td[height="90"] { background: url("http://"); }'); /* pageheader */
GM_addStyle('td.headerfront { background: url("http://"); }'); /* body header background image */
GM_addStyle('td.sideheader { background: url("http://"); }'); /* sideheader background image */
GM_addStyle('td.sideheader { background-color: #; }'); /* sideheader background colors */
GM_addStyle('td[height="23"] { background: url("http://"); }'); /* menu backgrounds */

/* BODY */
GM_addStyle('body { background-color: #; }'); /* skin background colors */

/* SIDE */
GM_addStyle('td.side { background-color: #; }'); /* side box background colors */

/* FONTS AND LINKS */
GM_addStyle('td.side a, td.side a:link, td.side a:visited, td.side a:active  { color: #; }'); /* side links */
GM_addStyle('td.side a:hover { color: #; }'); /* side link: hovers */
GM_addStyle('td.side { color: #; }'); /* side box colors */
GM_addStyle('a.forumlst0:link,a.forumlst0:visited { color: #; text-decoration:none; font: 8pt arial }'); /* no unread posts links */
GM_addStyle('a.forumlst0:hover,a.forumlst0:active { color: #; text-decoration:none; font: 8pt arial }'); /* no unread posts link hovers */
GM_addStyle('a.forumlst1:link,a.forumlst1:visited { color: #; text-decoration:none; font: 8pt arial }'); /* some unread posts links */
GM_addStyle('a.forumlst1:hover,a.forumlst1:active { color: #; text-decoration:none; font: 8pt arial }');/* some unread posts link hovers */
GM_addStyle('a.forumlst2:link, a.forumlst2:visited { color: #; text-decoration:none; font: 8pt arial }'); /* new thread links */
GM_addStyle('a.forumlst2:hover, a.forumlst2:visited:hover { color: #; text-decoration:none; font: 8pt arial }'); /* new thread link hovers */
GM_addStyle('td.sideheader { color: #; }'); /* sideheader Font Colors */
GM_addStyle('td.menu { color: #; }'); /* menu text */
GM_addStyle('td.menu a { color: #; }'); /* menu links */
GM_addStyle('td.menu a:hover { color: #; }'); /* menu links: hovers */
GM_addStyle('td.side input, select, option, textarea, td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body, body textarea { color: #; }'); /* input and selects colors */

/* INPUTS AND SELECTS */
GM_addStyle('td.side input, select, option, textarea { border: 1px solid #; }'); /* side inputs and selects border */
GM_addStyle('td.side input, select, option, textarea { background-color: #; }'); /* side inputs and selects background */
GM_addStyle('td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body { border: 1px solid #; }'); /* body inputs and selects border */
GM_addStyle('td.body input, td.body select, td.body option, td.body textarea, input.body, select.body, option.body, textarea.body { background-color: #; }'); /* body inputs and selects background */





if (window.location.href.indexOf("nexopia.com/profile.php")==-1)
{
GM_addStyle('td.online { color: #; }'); /* profile online colors */
GM_addStyle('td.offline { color: #; }'); /* profile offline colors */
GM_addStyle('td.body, td.online, td.offline { background-color: #; }'); /* body background colors */
GM_addStyle('td.body2 { background-color: #; }'); /* body shadow background colors */
GM_addStyle('td.header, td.small { background-color: #; }'); /* header background colors */
GM_addStyle('td.header2 { color: #; }'); /* subheader Font Colors */
GM_addStyle('td.header, td.small { color: #; }'); /* primary header Font Colors */
GM_addStyle('td.body, td.body2 { color: #; }'); /* body Font Colors */
GM_addStyle('a.body, a.body:visited, a.body:link, a.body:active, a.body2, a.body2:link, a.body2:active, a.body2:visited, a.forumlst2, a.header, a.header:active, a.header:visited, a.header:link, a.small, a.small:active, a.small:visited, a.small:link, a.header2, a.header2:link, a.header2:active, a.header2:visited  { color: #; }'); /* primary links */
GM_addStyle('a.body:hover, a.body2:hover, a.header:hover, a.header2:hover { color: #; }'); /* body link: hovers */
}



