// ==UserScript==
// @name           Wikipedia Accesskey Disable
// @namespace      http://userscripts.org/users/amacou
// @include        http://*wikipedia.org/*
// ==/UserScript==

(function() {
    window.addEventListener("load",function(aEvent) {
        var elements = document.getElementsByTagName("*");
        if(!elements.length) return;
        for(var i=0; i < elements.length; i++){
            if(elements[i].hasAttribute("accesskey")) elements[i].removeAttribute("accesskey");
        }
    })})();