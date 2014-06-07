// ==UserScript==
// @name        Subpages link for wiki toobox menu
// @description This will add a new link into 'Toolbox' menu of wikipedia and other included wikies - 'Subpages'. It is a link to 'Special:PrefixIndex' page with prefix and namespace parameters extracted from current page title.
// @namespace   linguamatics.com
// @include     http://*.wikipedia.org/wiki/*
// @exclude     *Special:*
// @version     1.2
// @grant       none
// ==/UserScript==

// execute this after complete document load
var add_subpages_link_to_toolbox = function () {
    "use strict";
    // compute path to Special:PrefixIndex relevant for the current page
    // e.g. title=Special:PrefixIndex&prefix=...&namespace=...
    var namespace_list = {
        "Talk": "1",
        "User": "2",
        "User_talk": "3",
        "Linguapedia": "4",
        "Linguapedia_talk": "5",
        "File": "6",
        "File_talk": "7",
        "MediaWiki": "8",
        "MediaWiki_talk": "9",
        "Template": "10",
        "Template_talk": "11",
        "Help": "12",
        "Help_talk": "13",
        "Category": "14",
        "Category_talk": "15"
     };
     var namespace = 0; // main namespace
     var path = window.location.pathname.split('/');
     var prefix = unescape(path.pop()); // get page title and move it out of path array
     
     if (prefix.indexOf(":") !== -1){ // in not main namespace, e.g. "User:2aprilboy"
        prefix = prefix.split(":");
        namespace = namespace_list[prefix[0]];
        prefix = prefix[1];
     };
     path = path.join('/') + '?title=Special:PrefixIndex&prefix=' + prefix + '&namespace=' + namespace;
     
     // create <li><a>Subpages</a></li> element and append it to Toolbox menu
     var li = document.createElement("li");
     var a = document.createElement("a");
     var text = document.createTextNode("Subpages");
     a.appendChild(text);
     a.setAttribute("href", path);
     a.setAttribute("title", "List of all pages with prefix [alt-shift-s]");
     a.setAttribute("accesskey", "s");
     li.appendChild(a);
     li.setAttribute("id", "t-subpages");
     
     var toolbox_list = document.getElementById("p-tb").getElementsByTagName("div")[0].getElementsByTagName("ul")[0];
     toolbox_list.insertBefore(li, toolbox_list.firstChild);
}

// wait for complete document load
document.onreadystatechange = function () {
    "use strict";
    if (document.readyState === "complete") {
        add_subpages_link_to_toolbox();
    }
}