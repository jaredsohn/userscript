// ==UserScript==
// @name           Youtube AutoUnclick Google plus share
// @namespace      https://www.youtube.com/user/WASDsweden
// @description    Automatically unclicks 'Also share on Google+' every second
// @version        1.1
// @include        https://apis.google.com/*/*/*/*/*/widget/render/comments*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://code.jquery.com/jquery-2.0.3.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    //TODO Instead of clicking every second, add a listener to click when it is detected
    setInterval(function(){
        //b-P-M is the class of the enabled checkbox. When clicked, the class is removed from the checkbox.
        jQQ(".b-P-M").click();
    }, 1337);
}

addJQuery(main);
