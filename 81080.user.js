// ==UserScript==
// @name           YYGF Logout Fix
// @description    Fixes the logout link for YYGF
// @author         T-Dub
// @include        http://forums.yoyogames.com*
// @version        1.0
// ==/UserScript==

user = document.getElementsByTagName("li")[4].innerHTML;
messages = document.getElementsByTagName("li")[5].innerHTML;
logout = document.getElementsByTagName("li")[6].innerHTML;
nav = "<li class=\"last\">" + user + " | " + messages + " | " + logout + "</li>";
document.getElementsByTagName("ul")[2].innerHTML = nav;