// ==UserScript==
// @name            WeightWatchers SiteRequirements Bypass
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-07-13: www.weightwatchers.* are "optimized" for IE and Netscape 4 etc. Using Firefox, you end up on a page telling you that, and you're stuck. This script is redirecting you to their frontpage.
// @include         http://weightwatchers.*
// @include         http://www.weightwatchers.*
// @author          Carlo Zottmann <carlo@g-blog.net>
// ==/UserScript==

(function() {
    var currentURL = location.href;

    if (currentURL.match(/siteRequirements/i))
    {
         location.href = currentURL.match(/^(https?:\/\/[^\/]+)\//i)[1] + "/index.aspx";
    }
})();

