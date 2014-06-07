// ==UserScript==
// @name           Reddit Dubs
// @namespace      reddit_dubs
// @description    Converts and displays post identifiers in reddit in base 10.
// @include        http://www.reddit.com/*
// ==/UserScript==

function decodeBase36(id36) {
    var id = 0;
    for (var i = 0; i < id36.length; i++)
        id = (id * 36) + "0123456789abcdefguijklmnopqrstuvwxyz".indexOf(id36[i]);
    return id;
}

var entries = document.getElementsByClassName("entry");
for (var i = 0; i < entries.length; i++) {
    if (!entries[i].parentNode.hasAttribute("data-fullname"))
        continue; // Recently viewed links

    var id36 = entries[i].parentNode.getAttribute("data-fullname").substr(3);
    var id = decodeBase36(id36);

    var title = entries[i].getElementsByClassName("title");
    if (title.length > 0) // Topic
    {
        var postno = document.createElement("span");
        postno.className = "domain";
        postno.innerHTML = " No. " + id;
        title[0].appendChild(postno);
    }
    else // Comment
    {
        var postno_uncollapsed = document.createTextNode(" No. " + id);
        entries[i].getElementsByClassName("tagline")[0].appendChild(postno_uncollapsed);

        var postno_collapsed = document.createTextNode("No. " + id);
        entries[i].getElementsByClassName("collapsed")[0].appendChild(postno_collapsed);
    }
}
