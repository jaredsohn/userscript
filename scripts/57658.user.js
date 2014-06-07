// ==UserScript==
// @name           Reply button on all messages
// @namespace      rboam@kwierso.com
// @description    Adds a reply button to all messages, regardless of who sent it.
// @include        http://roosterteeth.com/members/messaging/*?pid=*
// @include        http://roosterteeth.com/members/messaging/*?pid=*
// @include        http://*.roosterteeth.com/members/messaging/*?pid=*
// @include        http://*.roosterteeth.com/members/messaging/*?pid=*
// @include        http://redvsblue.com/members/messaging/*?pid=*
// @include        http://redvsblue.com/members/messaging/*?pid=*
// @include        http://achievementhunter.com/members/messaging/*?pid=*
// @include        http://achievementhunter.com/members/messaging/*?pid=*
// @include        http://strangerhood.com/members/messaging/*?pid=*
// @include        http://strangerhood.com/members/messaging/*?pid=*
// ==/UserScript==

(function() {
    var posts = getAllPosts(document.getElementById("pageContent"));

    var bold = document.createElement("b");
    bold.innerHTML = "Reply";

    for(i in posts) {
        if(posts[i].getElementsByTagName("a").length < 2) {
            var clone = posts[i].getElementsByTagName("a")[0].cloneNode(false);
            clone.href = clone.href.replace("delete", "reply");
            var spacer = document.createElement("span");
            spacer.innerHTML = " ] &nbsp; ";
            posts[i].insertBefore(spacer, posts[i].childNodes[0]);
            posts[i].insertBefore(clone, posts[i].childNodes[0]);
            posts[i].insertBefore(document.createTextNode(" [ "), posts[i].childNodes[0]);
            clone.appendChild(bold.cloneNode(true));
        }
    }
})();

function getAllPosts(elem) {
    var posts = new Array();
    var everything = elem.getElementsByTagName("div");
    for(i in everything) {
        if(everything[i].className == "small")
            posts.push(everything[i]);
    }
    return posts;
}