// ==UserScript==
// @name          MozillaZine Forums Mark Read to Index
// @description   On clicking mark all read redirects back to forums index rather than the forum that was being read
// @namespace     http://www.norcimo.com/fun/greasemonkey/
// @include       http://forums.mozillazine.org/viewforum.php*mark=topics
// ==/UserScript==

// When clicking on Mark all topics read in a MozillaZine forum this will redirect to the forums index
// rather than back to the topic you've just been reading.

(function()
{
document.location.href="http://forums.mozillazine.org/index.php";
})();