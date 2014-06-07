// ==UserScript==
// @name        Kill Assembla Cardwall AJAX
// @description Open Assembla tickets in new tabs rather than AJAX popup
// @namespace   http://userscripts.org/users/436302
// @include     https://www.assembla.com/spaces/*/cardwall*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant       none
// @version     1.2
// ==/UserScript==

(function() {
    var main = function($) {
        $('.cw-full-link').bind('click', function(ev) {
            var href = $(ev.target).parents('a').attr('href')
            window.open(href)
            return false
        })
    }

    // @require only works for greasemonkey. On chrome user script, load
    // jquery manually.
    if (typeof jQuery !== 'undefined') {
        main(jQuery.noConflict())
    } else {
        var script = document.createElement("script")
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
        script.addEventListener('load', function() {
            var script = document.createElement("script")
            script.textContent = "(" + main.toString() + ")(jQuery.noConflict())";
            document.body.appendChild(script)
        })
        document.body.appendChild(script)
    }
})()