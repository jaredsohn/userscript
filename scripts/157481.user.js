// ==UserScript==
// @name           MangareaderLinkReplacer
// @namespace      https://github.com/terryngo
// @description    Replaces all mangareader links with mangapanda on all sites (unless you are on mangareader itself)
// @include        *
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("a[href*='mangareader.net']").each(function() {
        this.href = this.href.replace('mangareader.net', 'mangapanda.com');
    });
}); //end ready