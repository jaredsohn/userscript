// ==UserScript==
// @name           Dailyburn remove unnecessary buttons in search result
// @description  Dailyburn remove all buttons in search result exept I ate this
// @namespace      dailyburn
// @include        http://dailyburn.com/nutrition/food_search*


// ==/UserScript==


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

aPlanButtons = getElementsByClassName("wo-planthis-button wo-button");

for(var i=0,j=aPlanButtons.length; i<j; i++) {
 aPlanButtons[i].parentNode.removeChild(aPlanButtons[i].parentNode.children[1]);
} 


aFavButtons = getElementsByClassName("wo-addtofavs-button wo-button");
for(var i=0,j=aFavButtons.length; i<j; i++) {
 aFavButtons[i].parentNode.removeChild( aFavButtons[i].parentNode.children[0]);
}
