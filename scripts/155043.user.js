// ==UserScript==
// @name           YouTube Top Menu Mod v1.2 Expanded
// @description    Added more links to vertigoelectric's script
// @include        http://*.youtube.com/*
// ==/UserScript==
/* CHANGE THESE VALUES IF YOU LIKE */
var fontSize = '15px';
var alignment = 'right';

/* REMOVING THE CLASS ATTRIBUTE FROM THE BAR PREVENTS IT FROM BEING HIDDEN ON PAGE LOAD */
document.getElementById('masthead-expanded').removeAttribute('class');
/* GATHER THE INFORMATION FOR THE LINKS */
mychannel = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[0].innerHTML;
myvideosupload = '<a href="http://www.youtube.com/my_videos_upload">Upload</a>';
myvideos = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[1].innerHTML;
myfavs = '<a href="http://www.youtube.com/my_favorites">Favorites</a>';
mylikes = '<a href="http://www.youtube.com/my_liked_videos">Likes</a>';
myhistory = '<a href="http://www.youtube.com/my_history">History</a>';
mysubs = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[2].innerHTML;
myinbox = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[3].innerHTML;
mychannelsettings = '<a href="http://www.youtube.com/channel_editor?action_editor=1&editor_tab=branding">Channel Settings</a>';
mysettings = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[4].innerHTML;
signout = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[5].innerHTML;
/* DISPLAY THE NEW LINKS AND FORMAT THE BAR */
document.getElementById('masthead-expanded-container').innerHTML = "<div style='padding:5px;font-weight:normal;color:#cccccc;text-align:"+alignment+";font-size:"+fontSize+";' class='custommenu'>" + mychannel + " | " + myvideosupload + " | " + myvideos + " | " + myfavs + " | " + mylikes + " | " + myhistory + " | " + mysubs + " | " + myinbox + "  | " + mychannelsettings + " | " + mysettings + " | " + signout + "</div>";
document.getElementById('masthead-expanded').style.height = "auto";
document.getElementById('masthead-expanded-container').style.height = "auto";
document.getElementById('masthead-expanded').style.textAlign = "right";
