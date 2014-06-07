// ==UserScript==
// @name           99 cents fixer
// @namespace      http://unfoldthat.com/userscript/
// @description    Replaces all $N.99 prices to $(N+1).00
// @match http://*/*
// ==/UserScript==

(function() {

    function replace_price(match, p1, offset, s) {
        return '<abbr title="' + match + '">$' + (parseInt(p1) + 1) + '.00</abbr>';
    }

    document.body.innerHTML = document.body.innerHTML.replace(/\$(\d+)\.99/g, replace_price);


})();