// ==UserScript==
// @name       Twitch Color Strip
// @namespace  http://www.twitch.tv/
// @version    0.1
// @description  Removes all colors from the chat in twitch
// @match      http://www.twitch.tv/*
// @copyright  vgmoose
// @icon       http://vgmoose.com/5ff376.png
// ==/UserScript==

/*global unsafeWindow*/
/* jshint globalstrict:true */

"use strict";

if (unsafeWindow) {
    // pull in globals if needed (for Scriptish)
    var Chat = unsafeWindow.Chat;
    var App = unsafeWindow.App;
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
                            var script = document.createElement("script");
                            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
                            document.body.appendChild(script);
                            }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    jQ(function () {
           
           var addMessage = App.Room.prototype.addMessage;
           
           App.Room.prototype.addMessage = function (e) {
           addMessage.call(this, e);
           e.color = "#000000";
           //       console.log(e.color);
           };
       });
}

// load jQuery and execute the main function
addJQuery(main);
