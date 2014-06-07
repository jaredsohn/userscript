// ==UserScript==
// @name       ZeroTchat
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

function addJQuery(callback)
{
    // tinyMce utilise une iframe, on veut l'exclure
    if (window.top != window.self)
        return;
    
    var script1 = document.createElement("script");

    script1.src = "http://theoszymko.free.fr/sdz.socket.io.js";
    document.body.appendChild(script1);
 
    var script = document.createElement("script");

    script.textContent = "window.$=jQuery.noConflict(false);(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function Load() {
    
}
  
if (document.location.href.substring(0, 25) == "http://www.siteduzero.com") {
    addJQuery(Load);
}

