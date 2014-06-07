// ==UserScript==
// @name           C2 Recent Changes Reclaimer
// @namespace      http://www.triv.org.uk/~nelis/
// @description    Hides entries by shark.armchair.mb.ca from the RecentChanges list.
// @include        http://www.c2.com/cgi/wiki?RecentChanges
// @include        http://c2.com/cgi/wiki?RecentChanges
// ==/UserScript==

litags = document.getElementsByTagName('li')

for (var i=0; i<litags.length; i++) {
    if (litags[i].innerHTML.search('shark.armchair.mb.ca') != -1) {
        // Just Hide it.
        litags[i].style.display = 'none';
    } else {
        litags[i].style.display = 'list-item';
    }
}
