// ==UserScript==
// @name           calendron-avatar
// @version        0.1
// @namespace      http://userscripts.org/users/500511
// @author         formerlyanon
// @description    Gives old calendron questions a cute avatar.
// @include        http://www.formspring.me/*
// @run-at-document-end
// ==/UserScript==

var ava_large = "http://files-cdn.formspring.me/profile/20130102/n50e3c791c23b8_large.png";

function replace_images(base_elem) {
    var img = Array.prototype.slice.call(base_elem.getElementsByTagName("img"));
    var cimg = img.filter(function(elem){
        return (elem.getAttribute("src")=="http://cdn.formspring.me/images/photo_default_130.jpg" && elem.getAttribute("alt")=="calendron");
    });
    cimg.forEach(function(elem){ elem.setAttribute("src", ava_large) });
}

document.body.addEventListener("DOMNodeInserted", function(){
    replace_images(this);
}, false);

replace_images(document);