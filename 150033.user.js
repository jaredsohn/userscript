// ==UserScript==
// @id             userscripts.org-3fd91fb9-a7fe-4448-81d4-29e28f368177@boxmein.web44.net
// @name           Trolol?
// @version        1.0
// @namespace      THEREISNOSUCHTHINGASNAMESPACES
// @author         IHAVENOAUTHOR
// @description    
// @include        http://*/*
// @include        https://*/*
// @run-at         document-end
// ==/UserScript==
var box = document.createElement("div");
box.setAttribute("style", "position: fixed; top: 100px; left: 10px; width: 100px; height: 50px; color: #000; text-shadow: 0px 0px 2px #FFF;");
box.onmouseover = function() {
    setTimeout(function() {
        console.log("hello trololo!");
        window.location = "http://trololololololololololo.com/";
        }, 25000);
};
box.innerHTML = "&gt;&gt;";
var body = document.getElementsByTagName("body")[0];
body.appendChild(box);
console.log("Script has run.");
