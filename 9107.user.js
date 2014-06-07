// ==UserScript==
// @name           Remove WTF ads
// @namespace      WTF
// @description    Removes ads on Worse Than Failure (The Daily WTF)
// @version        1.0
// @include        http://worsethanfailure.com/*
// ==/UserScript==

nuke('SubHeader');
var sidebars = get("//div[@class='CommonSidebarArea']");
nuke(sidebars[3]);
nuke(sidebars[5]);


// xpath function
function get(query)
{
    var array = [];
    var result = document.evaluate(query, document, null, 7, null);
    for(var i = 0; i < result.snapshotLength; i++) {
        array.push(result.snapshotItem(i));
    }
    return array;
}

function nuke(el)
{
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.parentNode.removeChild(el);
}