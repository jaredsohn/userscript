// ==UserScript==
// @name        gallog.dcinside.com replace span with actual links
// @namespace   gallog.dcinside.com
// @description Replaces <span> tags with onclick event to regular <a> tags
// @include     http://gallog.dcinside.com/*
// @version     1
// @grant       none
// ==/UserScript==

var gid_regex = new RegExp('gid=([^&]*)')
var lno_regex = new RegExp('lno=([^&]*)')
function fix_link(link) {
    // Fix link so it will open in a new tab
    var gid = gid_regex.exec(link);
    var lno = lno_regex.exec(link);
    var new_link;
    if (gid != null && lno != null) {
        new_link = 'http://gallog.dcinside.com/'+gid[1]+'/'+lno[1];
    } else {
        new_link = link;
    }
    return new_link;
}

// main()
var found, i, onclick_js, link, span_node, a_node
found = document.getElementsByTagName('span');
i = 0;
while (i < found.length) {
    span_node = found[i];
    onclick_js = span_node.getAttribute('onclick');
    if (onclick_js.length > 0 && onclick_js.search('document.location.href="') >= 0) {
        link = onclick_js.slice('document.location.href="'.length, (-1)*'";'.length);
        link = fix_link(link);
        a_node = document.createElement('a');
        a_node.setAttribute('href', link);
        a_node.setAttribute('style', 'color:inherit;');
        a_node.innerHTML = span_node.innerHTML;
        span_node.parentNode.replaceChild(a_node, span_node);
    }
    else { i++; }
}
