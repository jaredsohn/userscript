// ==UserScript==
// @name        IMDb lucky search
// @author      George Pop
// @namespace   gp
// @description Redirects to top result in an IMDb search performed through a browser search bar or similar. Does not redirect from results pages for searches performed through the website’s search box.
// @include     http*://*.imdb.com/find?q=*
// @exclude     *&s=all
// @version     1
// @grant       none
// ==/UserScript==

function main() {
    var results = document.getElementsByClassName('findList');
    if (!results.length) return;
    var top_result = results[0].getElementsByClassName('findResult')[0];
    var url = top_result.children[1].children[0].href;
    window.location = url;
}

main();
