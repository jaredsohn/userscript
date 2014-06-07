// ==UserScript==
// @name        Campfire Shaddup Robot
// @namespace   http://fanzter.com/
// @downloadURL https://gist.github.com/rwilcox/6693982/raw/greasemoney_campfire_shaddup_robot.js
// @description Grays out Campfire talk by (defined) robots
// @include     https://*.campfirenow.com/room/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_log
// @version     1
// ==/UserScript==

/*
    At work we have a pretty noisey Hubot (which we named Les Grossman).

    Les is great, telling us about pushes, GI builds, deploys, bug etc. But
    sometimes Les is just too talkative, and drowns out grownups doing real talking.

    Les's chatter is certainly important, but less (haha!) so then chatter by humans.
    (sorry, Les!) As such I wrote this Greasemonkey script so that robot texts are gray.

    TO USE: install the script, then edit the ROBOT_NAME variable below. I have
    no idea how to provide configuration options to Greasemonkey. If you know please do tell.

    Ryan Wilcox, Sept 24, 2013.
*/

(function() {
    var ROBOT_NAME = "Les Grossman";  // the name of our robot. Yours is different.
    var DIM_TO_COLOR = "#D3D3D3"

    //window.fluid.include(window.fluid.resourcePath + "jquery-1.10.2.min.js")
    // because I can't get this the above line to work without crashing Fluid
    // inject the jQuery script tag manually
    
    function addJQuery(callback) {
        if (window.fluid) {
            var script = document.createElement("script");
            script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
            script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
        } else {
        	window.jQ = jQuery;
            callback();
        }
    }

    function dimFromRobot(name) {
        window.jQ("span[data-name='" + name + "']").parents("tr").attr("style", "color:" + DIM_TO_COLOR);
    }

    function onDOMSubtreeModifiedHandler(e){
        dimFromRobot(ROBOT_NAME);
    }

    addJQuery( function() {
        dimFromRobot(ROBOT_NAME);
    });


    if (window.fluid) {
        // use old way to avoid loading up yet another dependency
        document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
    } else {
        waitForKeyElements("span.author", onDOMSubtreeModifiedHandler);
    }

})();


/*

Copyright (C) 2013 Ryan Wilcox

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
