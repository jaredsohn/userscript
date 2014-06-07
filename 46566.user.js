// Removes libertarians' comments.
// Version: 0.2.2

// Copyright (c) 2010 f00m@nB@r <foomanbar@gmail.com>
// Released under the GNU Public Licence
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           SE de-Austrian
// @namespace      http://sensibleerection.com/profile.php/13614
// @description    Remove donnie's,jaxtraw's, and manoreason's comments from sensibleerection.com
// @include        http://*sensibleerection.com*
// @include        http://*.sensibleerection.com*
// ==/UserScript==

(function() {
    var austrians = new Array(
        "/profile.php/11619",   // jaxtraw
        "/profile.php/3067",    // donnie
        "/profile.php/12099",   // manoreason
        "/profile.php/12016",   // Naruki
        "/profile.php/22658",   // incpenners
        "/profile.php/217",     // Crysallis
        "/profile.php/5465"     // maryyugo
    );

    /****
     * set filter depending on what you want filtered:
     *
     * var filter = '//img';        filter just the images
     * var filter = '//text()';     filter text, keep the images
     * var filter = '';             filter the post completely
     */
    var filter = '';
    var i, j, k;
    var xpath_name = '';
    var xpath_comm = '';
    var xpath_post = '';
    var xpath_byline = '';
    var names = null;
    var posts = null;
    var comments = null;
    var byline = null;
    var p = null;
    var elm = null;
    for (j=0; j<austrians.length; j++) {
        xpath_name = "//span[@class='entry_details_text']/a[contains(@href, '" + austrians[j] + "')]";
        xpath_comm = xpath_name + "/../following-sibling::span" + filter;
        xpath_post = xpath_name + "/../preceding-sibling::div" + filter;
        xpath_byline = xpath_name + "/.." + filter;
        names    = document.evaluate(xpath_name, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        comments = document.evaluate(xpath_comm, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        posts    = document.evaluate(xpath_post, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        byline   = document.evaluate(xpath_byline, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i=0; i<names.snapshotLength; i++) {
            p = names.snapshotItem(i);
            elm = document.createElement("a");
            elm.setAttribute('href', 'http://sensibleerection.com/');
            elm.appendChild(document.createTextNode(" "));
            p.parentNode.replaceChild(elm, p);
        }
        for (i=0; i<comments.snapshotLength; i++) {
            p = comments.snapshotItem(i);
            elm = document.createElement("span");
            elm.className = "text_12px";
            elm.appendChild(document.createTextNode(" "));
            p.parentNode.replaceChild(elm, p);
        }
        GM_log('A: posts.snapshotLength = ' + posts.snapshotLength);
        for (i=0; i<posts.snapshotLength; i++) {
            p = posts.snapshotItem(i);
            elm = document.createElement("span");
            elm.className = "text_12px";
            elm.appendChild(document.createTextNode(" "));
            p.parentNode.replaceChild(elm, p);
        }
        // GM_log('A: byline.snapshotLength = ' + byline.snapshotLength);
        // for (i=0; i<byline.snapshotLength; i++) {
        //  p = byline.snapshotItem(i);
        //  elm = document.createElement("span");
        //  elm.className = "text_12px";
        //  elm.appendChild(document.createTextNode(" "));
        //  p.parentNode.replaceChild(elm, p);
        // }
    }
})();