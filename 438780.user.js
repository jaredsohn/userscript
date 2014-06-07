// ==UserScript==
// @name        Campfire Facetime Links
// @namespace   http://fanzter.com/
// @downloadURL 
// @description Assumes that a Campfire email address points to a valid Facetime email, and link to it!
// @include     https://*.campfirenow.com/room/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_log
// @version     1.0
// ==/UserScript==


(function() {
    //window.fluid.include(window.fluid.resourcePath + "jquery-1.10.2.min.js")
    // because I can't get this the above line to work without crashing Fluid
    // inject the jQuery script tag manually
    
    var ignoreEvents = false;
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

    function addMessages() {
    	ignoreEvents = true;
    	    	
        window.jQ("span.author:not(.done)").each(function(index, element) {
          var $element = window.jQ(element);
          var email = $element.data('email');
          
          var name = $element.html();
          $element.addClass("done");
          
          window.jQ(element).html( "<a href='facetime://" + email + "'>" + name + "</a>" )
        });
        
        ignoreEvents = false;
    }

    function onDOMSubtreeModifiedHandler(e){
       if(typeof window.jQ != 'undefined') {

	      if (ignoreEvents == false) {
   	   		  addMessages();
         }
       }
    }

    addJQuery( function() {
        addMessages();
    });


    if (window.fluid) {
        // use old way to avoid loading up yet another dependency
        document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
    } else {
        waitForKeyElements("span.author:not(.done)", onDOMSubtreeModifiedHandler);
    }

}());



/*

Copyright (C) 2014 Ryan Wilcox

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
