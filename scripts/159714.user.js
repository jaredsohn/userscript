// ==UserScript==
// @name           YouTube full browser window button
// @namespace      https://userscripts.org/users/michalns
// @description    Displays button on YT's video pages which tweaks the URL so that the video plays in full browser window. 
// @include        http://*youtube.com/watch*
// @include        https://*youtube.com/watch*
// @author         michalns
// @version        1.0
// @license        KOPIMI. http://kopimi.com/kopimi/
// ==/UserScript==

var VIDEO_ID = unsafeWindow.yt.getConfig('VIDEO_ID');

document.getElementById('watch7-headline').innerHTML += '<style>#button {margin-top: -2.71em; position: relative; left: 40em;} #watch-actions {height: 50px;}</style><div id="button"><a href="http://youtube.com/v/'+ VIDEO_ID +'/" id="link" title="Watch in full browser window" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_self">[full window]</a></div>';