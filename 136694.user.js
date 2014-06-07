// ==UserScript==
// @name           xxx
// @author         xxx
// @description    This script will protect you if you come across a URL that is a scam or a phishing page.
// @include        http://www.facebook.com/pages/5-Million-Farmville-Mansion-Get-it-for-free-and-without-reaching-level-70/*

// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='Facebook Scam and Phishing Blocker (Beta) | URL BLOCKED | ANTI SCAMS AND PHISHING ';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>URL Blocked Because It Is A Scam Or Phishing Activity!\n Don\'t worry though! You are now safe! Click the page to escape, or close this window<p> .</p><br>Modified By Tony White<br><img src=\"http://lair360.co.uk/blog/wp-content/uploads/2009/12/caution-logo-wordpress.jpg" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://www.facebook.com/pages/What-is-a-scam/138159622904801?v=wall'");
}
document.body.appendChild(s);