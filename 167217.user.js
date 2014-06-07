// ==UserScript==
// @name	Facebook link redirect removal
// @namespace   http://127.0.0.1
// @author	Qb_Master
// @description	Removes tracking for external links clicked on facebook
// @include     *facebook.com*
// @version     0.1
// ==/UserScript==

//==Changelog==
// @history     0.1 Initial release.
//==/Changelog==


document.body.onmousemove = function (e) {
e = e || window.event;
var elementId = e.target;
RemFBFromLinks(elementId);
}

function RemFBFromLinks(e)
{
Clin = e.parentNode.parentNode.parentNode.parentNode;
Clink = Clin.innerHTML;

var regg = /\\u([\d\w]{4})/gi;
Clinky = Clink.replace(regg, function (match,grp) {
return String.fromCharCode(parseInt(grp, 16)); } );
Clinky = unescape(Clinky);

Clinky = Clinky.replace(/onclick=\"LinkshimAsyncLink.swap\(this, \&quot;(.+)\&amp;h\=.+\&amp\;s\=.+?\&quot;\);

\"/,/onclick="LinkshimAsyncLink.swap\(this, \&quot;$1\&quot;\);\"/);

Clinky = Clinky.replace('http://www.facebook.com/l.php?u=','');
Clinky = Clinky.replace('http:\\/\\/www.facebook.com\\/l.php?u=','');

if (Clinky.substring(0,31)=='<a class=\"pam shareText\" href=\"' || Clinky.substring(0,20)=='<div role=\"article\">' || Clinky.substring

(0,43)=='<div class=\"shareRedesign _gxb largeMedia\">' || Clinky.substring(0,45)=='<div class=\"clearfix shareRedesignContainer\">' || 

Clinky.substring(0,32)=='<div class=\"shareRedesign _gxb\">') { 
  Clin.innerHTML = Clinky;
  }
}