// ==UserScript==

// @name        Facebook minimalism by Des1gnR
// @description Facebook minimalism
// @version     0.0.1

// @include     *facebook.com*

// @run-at document-start

// ==/UserScript==



GM_addStyle("div#sidebar_ads { display: none !important; } ");

GM_addStyle("div#rightCol { display: none !important; } ");
GM_addStyle("div#pagelet_eventbox { display: none !important; } ");

GM_addStyle("div#right_column { width: 700px !important; } ");

GM_addStyle("div#pagelet_home_stream { width: 775px !important; } ");

GM_addStyle("div#pagelet_stream_header { width: 765px !important; } ");
GM_addStyle("div#pagelet_composer { width: 765px !important; } ");
GM_addStyle("div#fbDockChatBuddylistNub { display: none !important; } ");
GM_addStyle("div#pagelet_presence { display: none !important; } ");
GM_addStyle("div#pagelet_friends_online { display: none !important; } ");
GM_addStyle("div#pagelet_groups_nav { display: none !important; } ");
GM_addStyle("div#pagelet_apps_nav { display: none !important; } ");
GM_addStyle("div#blueBar { background: #459be1 !important; } ");
GM_addStyle("div#headNav { background: #418bc7 !important; } ");
GM_addStyle("div#headNav { border: #696969 !important; } ");

document.getElementById('pageLogo').firstChild.style.backgroundImage = 'url("http://nerolive.hu/fesz.png")';
document.getElementById('pageLogo').firstChild.style.backgroundPosition = "center center";

document.getElementById('requestsWrapper').firstChild.style.backgroundImage = 'url("http://nerolive.hu/fb1.png")';
document.getElementById('requestsWrapper').firstChild.style.backgroundPosition = "center center";

document.getElementById('mailWrapper').firstChild.style.backgroundImage = 'url("http://nerolive.hu/fb2.png")';
document.getElementById('mailWrapper').firstChild.style.backgroundPosition = "center center";

document.getElementById('notificationsWrapper').firstChild.style.backgroundImage = 'url("http://nerolive.hu/fb3.png")';
document.getElementById('notificationsWrapper').firstChild.style.backgroundPosition = "center center";



