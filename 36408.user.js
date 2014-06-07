// Author:   StEELSnARL
// Website:  http://steelsnarl.blogspot.com
// Version:  0.1
// Based on John Keyes' "Google Reader To Ma.gnolia" (http://userscripts.org/scripts/show/27085) THX!
// 
// ==UserScript==
// @name           Google Reader To Diigo
// @namespace      http://steelsnarl.blogspot.com
// @description    Opens window to bookmark feed entries in Diigo.
// @include        https://google.com/reader/*
// @include        https://*.google.com/reader/*
// @include        http://google.com/reader/*
// @include        http://*.google.com/reader/*
// ==/UserScript==

document.getElementById("entries").addEventListener('DOMNodeInserted',  function (event) {
    var node = event.target;
    if (node.tagName.toLowerCase() == 'div') {
        var entryactions;

        if (hasClass(node, "entry-actions")) {
            entryactions = node;
        }
        else if (hasClass(node, "entry") && hasClass(node.firstChild, "card")) {
            entryactions = node.firstChild.firstChild.childNodes[2].childNodes[1].firstChild;
        }

        if (entryactions) {
            var action = document.createElement("span");
            action.className = "tag link";
            action.innerHTML = "Post to Diigo";
            action.addEventListener("click", bookmark, false);
            entryactions.appendChild(action);
        }
    }
}, true);

 
function bookmark(event){
    var node = event.target;
    var entry = findEntry(node);
    var h2 = entry.getElementsByTagName("h2");
    var link = h2[h2.length > 1 ? 1 : 0].firstChild;
    var url = link.getAttribute('href');
    var title = link.textContent;
    var tags = getTags(node.parentNode);
    window.open('http://www.diigo.com/post?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&tags='+encodeURIComponent(tags),'magnolia','scrollbars=1,status=0,location=0,toolbar=0');
}

function getTags(linkbar) {
    var lists = linkbar.getElementsByTagName("ul");
    var tags = [];
    for (var j = 0; j < lists.length; j++) { 
        var list = lists[j];
        if (list.className == 'user-tags-list') {
            var links = list.getElementsByTagName("a");
            for (var k = 0; k < links.length; k++) {
                tags.push(links[k].textContent);
            }
        }
    }
    return tags.join(',')
}

function findEntry(node) { 
    if (hasClass(node, "entry")) {
        return node;
    } else {
        return findEntry(node.parentNode);
    }
}

function hasClass(node, className) {
    if (node && node.className) {
        var classnames = node.className.split(/\s+/);
        for (var i = 0, length = classnames.length; i < length; i++) {
            if (classnames[i] == className) {
                return true;
            }
        }
    }
    return false;
}

