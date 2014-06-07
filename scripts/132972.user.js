// ==UserScript==
// @name           ListenToYoutube Download Link
// @namespace      localhost.listentoyoutube
// @include http://*.youtube.com/watch?*
// @include https://*.youtube.com/watch?*
// @match http://*.youtube.com/watch?*
// @match https://*.youtube.com/watch?*
// ==/UserScript==
 
function run() {
var html = document.getElementById('watch-actions').innerHTML;
if(html){
html += '<button onclick="document.listentoyoutubeform.submit(); return false;"type="button" role="button" id="listentoyoutube-button" class="yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button-default" data-tooltip-text="Download via ListenToYoutube.com"><span class="yt-uix-button-content">Download MP3</span>&nbsp;  </button>';
html += '<form name="listentoyoutubeform" style="width: 90px;" method="post" action="http://www.listentoyoutube.com/process.php" target="_blank"><input type="hidden" value="'+window.location.href+'" name="url" /><input type="hidden" value="1" name="quality" /></form>';
document.getElementById('watch-actions').innerHTML = html;
}      
}

run();

