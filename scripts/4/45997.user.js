// ==UserScript==
// @name           Gangster Battle: Sort by Family Size
// @namespace      http://userscripts.org/users/7405
// @description    Sorts families smallest first in the Declare War page
// @include        http://apps.facebook.com/gangsterbattle/war.php
// ==/UserScript==

function xpath(pattern){
    // simple xpath parser
    var a_emt = new Array();
    var sshot = document.evaluate(pattern, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if( sshot.snapshotLength > 0){
        for (i=0; i< sshot.snapshotLength; i++){
            a_emt[i] = sshot.snapshotItem(i);
        }
        return a_emt;
    }
    return null;
}

function family_size(node)
{
    return node.innerHTML.match(/Family Size: ([0-9]*)/)[1];
}

function sortby(a, b)
{
    return family_size(a) - family_size(b);
}

var families = xpath("//div[@class='war']");
var sorted_families = new Array();
for (var i=0; i<families.length; i++)
{
    sorted_families[i] = families[i].cloneNode(true);
}

sorted_families.sort(sortby);

for (var i=0; i<families.length; i++)
{
    families[i].parentNode.replaceChild(sorted_families[i], families[i]);
}
