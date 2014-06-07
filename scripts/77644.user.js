// ==UserScript==
// @name          TopStats
// @description	  Moves the stats box above the shoutbox.
// @include       http://*.pakgamers.com/forums
// @include       http://*.pakgamers.com/forums/
// @include       http://*.pakgamers.com/forums/forum.php
// @version       1.0.1
// @author        eViLrAcer (AfzalivE)
// ==/UserScript==

var hook, shoutbox, statsDiv, newStatsDiv, statsDivhtml, content ;
hook = document.getElementById('collapse_vsa_fh_stats');
shoutbox = document.getElementById('dbtech_vbshout_form1'); 
statsDivhtml = hook.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
content = document.getElementById('content_container');

statsDiv = hook.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

newStatsDiv = document.createElement('div');
newStatsDiv.innerHTML= statsDivhtml;
if (shoutbox) {
shoutbox.parentNode.insertBefore(newStatsDiv, shoutbox);
} else if (content) {
content.parentNode.insertBefore(newStatsDiv, content);
}

statsDiv.parentNode.removeChild(statsDiv);