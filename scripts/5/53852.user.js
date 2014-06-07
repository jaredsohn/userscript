// ==UserScript==

// @name           Eurogamer Recent Activity

// @description    Adds a recent activity link to the Eurogamer tool bar

// @include        *www.eurogamer*

// ==/UserScript==

profilelink="<b><a href='http://gamers.eurogamer.net/user_profile.php?tab=forum' class='me'>Latest Activity</a></b><span class='details'> | </span>"
tool_bar=profilelink+document.getElementById('toolBar').innerHTML;
document.getElementById('toolBar').innerHTML=tool_bar