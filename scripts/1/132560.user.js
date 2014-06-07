// ==UserScript==
// @id             wololo.net-9ed1f5b7-3f6c-46ef-b620-6f700b2657eb@scriptish
// @name           search tabs
// @version        1.1
// @namespace      xnx_search
// @author         Xian Nox
// @description    
// @include        http://wololo.net/talk/search.php?search_id=unreadposts
// @run-at         document-end
// ==/UserScript==

var j = 0;

var t = document.getElementsByTagName("p");

for (j = 0; j < document.getElementsByTagName("p").length; j++) {
    if(t[j].innerHTML == "<a class=\"left\" href=\"./search.php\" title=\"Advanced search\">Return to advanced search</a>") {
        t[j].innerHTML += " <a class='left' href='javascript:open_unread();'>Open unread posts in new tabs</a> <a class='left' href='javascript:window.location.reload();'>Refresh</a>";
    }
};

function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.head.appendChild(script);
};

var script = "";
script += "function open_unread() {";
script += "    var a = document.getElementsByTagName(\"a\");";
script += "    var t = \"\";";
script += "    var links = new Array();";
script += "    ";
script += "    for (j = 0; j < a.length; j++) {";
script += "        t += a[j];";
script += "        if (t.indexOf('&view=unread#unread') !== -1) {";
script += "            links[links.length] = t;";
script += "        }";
script += "        t = \"\";";
script += "    }";
script += "    ";
script += "    for (j = 0; j < links.length; j++) {";
script += "        window.open(links[j]);";
script += "    }";
script += "};";

contentEval(script);
