// ==UserScript==
// @name           YouTube Top Menu Mod
// @description    Replaces the expandable "My Playlists" bar at the top of YouTube with a more compact, more practical navigation bar displaying your account links.
// @namespace      www.vertigofx.com
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @version        1.0
// ==/UserScript==

/* CHANGE THESE VALUES IF YOU LIKE */
var fontSize = '15px';
var alignment = 'right';

/* REMOVING THE CLASS ATTRIBUTE FROM THE BAR PREVENTS IT FROM BEING HIDDEN ON PAGE LOAD */
document.getElementById('masthead-expanded').removeAttribute('class');

/* GATHER THE INFORMATION FOR THE LINKS */
mychannel = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[0].innerHTML;
myvideos = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[1].innerHTML;
mysubs = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[2].innerHTML;
myinbox = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[3].innerHTML;
mysettings = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[4].innerHTML;
signout = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[5].innerHTML;

/* DISPLAY THE NEW LINKS AND FORMAT THE BAR */
document.getElementById('masthead-expanded-container').innerHTML = "<div style='padding:5px;font-weight:bold;text-align:"+alignment+";font-size:"+fontSize+";' class='custommenu'>" + mychannel + " | " + myvideos + " | " + mysubs + " | " + myinbox + " | " + mysettings + " | " + signout + "</div>";
document.getElementById('masthead-expanded').style.height = "auto";
document.getElementById('masthead-expanded-container').style.height = "auto";
document.getElementById('masthead-expanded').style.textAlign = "right";