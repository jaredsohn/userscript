// ==UserScript==
// @name       MAL date fixer
// @namespace  http://userscripts.org/scripts/show/103812
// @version    0.2
// @description  Changes the hideous MM-DD-YY formatted dates on My Anime List to YYYY-MM-DD
// @match      *://myanimelist.net/*
// @copyright  2014+, James Wood
// ==/UserScript==

(function() {
    var el = document.getElementById('contentWrapper');
    el.innerHTML = el.innerHTML.replace(/\d\d-\d\d-\d\d/g, function(s) {
        var mdy = s.split('-');
        return '20' + mdy[2] + '-' + mdy[0] + '-' + mdy[1];
    });
})();