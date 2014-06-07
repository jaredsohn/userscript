// Version 1.0
// (c) Sergei Stolyarov 
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           Livejournal.com Threads expander
// @namespace      http://regolit.com
// @description    Add link (Expand thread) to long comments pages.
// @include        http://*.livejournal.com/*
// ==/UserScript==

(function ()
{
    var a_spans = document.getElementsByTagName('SPAN');
    var len = a_spans.length;
    var i;
    var child;
    for (i=0; i<len; i++) {
        var span = a_spans[i];
        if (-1 != span.id.search(/^ljcmt/)) {
            child = span.firstChild;
            if ("TABLE" != child.tagName) {
                continue;
            }
            child = child.firstChild;
            if ("TBODY" != child.tagName) {
                continue;
            }
            child = child.firstChild;
            if ("TR" != child.tagName) {
                continue;
            }
            child = child.lastChild;
            if ("TD" != child.tagName) {
                continue;
            }
            var td = child;
            child = child.lastChild;
            if ("I" != child.tagName) {
                continue;
            }
            // find thread address
            var a = td.firstChild;
            if ("A" != a.tagName) {
                continue;
            }
            var url = a.href;
            var expandLink = document.createElement("A");
            expandLink.innerHTML = "Expand Thread";
            expandLink.href = url;
            expandLink.title = "Expand this thread";

            // parse url
            if (-1 == url.search(/#(t[0-9]+)$/)) {
                continue;
            }
            var tid = RegExp.$1;
            script = "Expander.make(this,'" + url + "','" + tid + "',true);return false;";
            expandLink.onclick = script;
            td.appendChild(document.createTextNode(" ("));
            td.appendChild(expandLink);
            td.appendChild(document.createTextNode(")"));
        }
    }
})();
