// ==UserScript==
// @name       Confluence Numbered Heading
// @namespace  http://zhangdi.name/
// @version    0.1
// @description  This script will add number to the headings on a Wiki Page in Confluence.
// @match      https://*.atlassian.net/wiki/*
// @include    ^https://*.atlassian.net/wiki/*
// @copyright  2013+, Di Zhang (Daniel)
// ==/UserScript==

var indexes = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1
};

function resetIndexes() {
    var idx,i=0,size = arguments.length;
    for (i = 0; i<size; i++) {
        idx = arguments[i];
        indexes[idx] = 1;
    }
}

function getText() {
    var arg,i,size = arguments.length,result="";
    for (i=0;i<size;i++) {
        arg = arguments[i];
        if (i == (size-2)) {
            result+= arg;
            result+= "&nbsp;";
        } else if (i == (size-1)) {
            result+= arg;
        } else {
            result+= (arg-1);
            result+= ".";
        }
    }
    return result;
}

var headings = document.querySelectorAll(
    "div#main-content.wiki-content h1,"+
    "div#main-content.wiki-content h2,"+
    "div#main-content.wiki-content h3,"+
    "div#main-content.wiki-content h4,"+
    "div#main-content.wiki-content h5,"+
    "div#main-content.wiki-content h6");

var i,size = headings.length;


for (i=0;i<size;i++) {
    var heading = headings[i];
    
    if (!heading.tagName) {
        continue;
    }
    
    var tagName = heading.tagName.toUpperCase();
    
    var text = heading.innerHTML;
    var headingLevel = tagName.slice(1);
    
    if (isNaN(headingLevel)) {
        continue;
    }
    
    var iLevel = parseInt(headingLevel, 10);
    
    switch (iLevel) {
        case 1:
            heading.innerHTML = getText(indexes[1]++, text);
            resetIndexes(2,3,4,5,6);
            break;
        case 2:
            heading.innerHTML = getText(indexes[1], indexes[2]++, text);
            resetIndexes(3,4,5,6);
            break;
        case 3:
            heading.innerHTML = getText(indexes[1], indexes[2], indexes[3]++, text);
            resetIndexes(4,5,6);
            break;
        case 4:
            heading.innerHTML = getText(indexes[1], indexes[2], indexes[3], indexes[4]++, text);
            resetIndexes(5,6);
            break;
        case 5:
            heading.innerHTML = getText(indexes[1], indexes[2], indexes[3], indexes[4], indexes[5]++, text);
            resetIndexes(6);
            break;
        case 6:
            heading.innerHTML = getText(indexes[1], indexes[2], indexes[3], indexes[4], indexes[5], indexes[6]++, text);
            break;
    }
}
