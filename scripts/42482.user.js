// ==UserScript==
// @name           Fix Youtube link-backs
// @namespace      YouTubeHomeLink
// @description    This simple script makes sure that youtube doesn't link back to the site you came from.... turning back on the links "login", "home" and what have you. Example: Embedded youtube video on another site, if you click on the video it plays, click again it takes you to the youtube page for the video...but all the links on youtube link back to the page the youtube video was embedded on....go figure.   Changes http://www.youtube.com/watch?v=42E2fAWM6rA&eurl=http://www.viralvideochart.com/youtube/lost_generation?id=42E2fAWM6rA ..... to ..... http://www.youtube.com/watch?v=42E2fAWM6rA therefor fixing things like the youtube 'login' link.
// @include        http://www.youtube.com/
// ==/UserScript==


end = (window.location.href.indexOf('&eurl='));
if (end >0){
new_url = (window.location.href.substring(0, end));
//alert(new_url);
window.location.replace(new_url);
}