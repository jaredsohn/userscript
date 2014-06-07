// ==UserScript==
// @name        Youtube Centering
// @version     0.9
// @namespace   Frosthaze
// @description Centers the new youtube so there is no blank space on the homepage. Also sets youtubes homepage to your Subription feed.
// @match          http://www.youtube.com/
// @match          http://www.youtube.com/?*
// @match          http://www.youtube.com/watch*
// @match          https://www.youtube.com/
// @match          https://www.youtube.com/?*
// @match          https://www.youtube.com/watch*
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/?*
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/
// @include        https://www.youtube.com/?*
// @include        https://www.youtube.com/watch*

// ==/UserScript==

if (location.pathname === "/watch")
{
document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-collapsed sidebar-expanded ";
document.getElementById('guide-container').style.left="-70px";
document.getElementById("watch-owner-container").style.position="relative";
document.getElementById("watch-owner-container").style.right="-508px";

}
else
{

if (location.pathname === "/")
{
window.location.replace("http://www.youtube.com/feed/subscriptions/u");
document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded";
}
else
{
if (location.pathname === "/results"){
document.body.className="ltr  gecko gecko-19      site-center-aligned     exp-watch7-comment-ui hitchhiker-enabled      guide-enabled       guide-expanded ";

}
else{
document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded";
}
}
}
