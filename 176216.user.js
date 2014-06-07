// ==UserScript==
// @name       CakeQuickScript
// @namespace  http://leakforums.org/fixdna
// @version    0.1
// @description  enter something useful
// @match      http://leakforums.org/*
// @match      http://www.leakforums.org/*
// @include      http://leakforums.org/*
// @include      http://www.leakforums.org/*
// @run-at document-start
// @copyright  2012+, You
// ==/UserScript==

function replace_url(elem, attr) {
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        elems[i][attr] = elems[i][attr].replace('netdna.', 'www.');
    }
}

replace_url('link', 'href');
replace_url('script', 'src');
replace_url('img', 'src');