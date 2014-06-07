// ==UserScript==
// @name     Bidlist AutoUpdater
// @description     Clicks the 'here' link when outbidded
// @include  *neopets.com/auctions.phtml*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Note that the contains() text is case-sensitive.
var TargetLink = $("a:contains('here')")
{
if (TargetLink.length)
    window.location.href = TargetLink[0].href
}