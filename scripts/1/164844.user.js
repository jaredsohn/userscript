// ==UserScript==
// @name        Tumblr Repair 2013-04-12
// @namespace   http://userscripts.org/users/broken-pen/113977
// @description Repairs ask avatars on popular social network tumblr dot com.
// @include     http://www.tumblr.com/inbox*
// @include     http://www.tumblr.com/blog/*/messages*
// @version     1
// ==/UserScript==

(function(){
    var ol = document.getElementById("posts");
    var lis = ol.getElementsByTagName("LI");
    var li = null;
    for (var i = 0; i < lis.length; ++i) {
        li = lis[i];
        if (li.id.startsWith("post_")) {
            li.className = "post note post_tumblelog_ not_mine with_permalink";
        }
    }
})()
