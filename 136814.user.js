// ==UserScript==
// @name           Auto redirect and display Quick reply by default
// @namespace      Auto redirect and display Quick reply by default
// @description    Displays the quick reply box by default, and automatically redirects you to your post after editing/posting.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://forums.gametrailers.com*
// ==/UserScript==

{
var TargetLink          = $("a:contains('View your submitted message')")

if (TargetLink  &&  TargetLink.length) 
    window.location.href    = TargetLink[0].href
}
{unsafeWindow.hide_qr(false);}