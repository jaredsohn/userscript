// ==UserScript==
// @name       Remove Pimpwerx PEACE
// @version    1.0
// @description  Everyone hates it when Pimpwerx signs his post, this will get rid of it.
// @include http://www.neogaf.com/*
// @author Skytylz
// ==/UserScript==

//Taken from Naveen on Stack as seen here: http://stackoverflow.com/questions/6991494/javascript-getelementbyid-base-on-partial-string
function getElementsByIdStartsWith(container, selectorTag, prefix) {
    var items = [];
    var myPosts = document.getElementById(container).getElementsByTagName(selectorTag);
    for (var i = 0; i < myPosts.length; i++) {
        //omitting undefined null check for brevity
        if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
    }
    return items;
}

//Gets all posts
var els = getElementsByIdStartsWith("main","div","edit");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
//if post contains his username and 
    if(el.innerHTML.indexOf("Pimpwerx")!=-1)
  el.innerHTML = el.innerHTML.replace(/PEACE./gi, '');
}