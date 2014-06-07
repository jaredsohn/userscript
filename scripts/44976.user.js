// ==UserScript==

// @name           Retitle Journals

// @namespace      rtj@kw.com

// @description    Change the title of journal entry pages to be the name of the journal

// @include        http://*.roosterteeth.com/members/journal/entry.php?id=*

// @include        https://*.roosterteeth.com/members/journal/entry.php?id=*
// @include        http://roosterteeth.com/members/journal/entry.php?id=*

// @include        https://roosterteeth.com/members/journal/entry.php?id=*

// ==/UserScript==



(function() {

    var htwos = document.getElementsByTagName("h2");

    var dom = document.title.split("Journal Entry")[0];

    document.title = dom + htwos[0].innerHTML;

})();