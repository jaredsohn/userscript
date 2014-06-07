// ==UserScript==
// @name          Django Doc Toggler
// @version       1.4.1
// @description   Toggle the Django related content sidebar by clicking the banner
// @author        Aron Griffis
// @domain        http://userscripts.org/users/436302
// @include       *://docs.djangoproject.com/*
// @match         *://docs.djangoproject.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// In the header above, @include is for greasemonkey, @match is for chrome.
// Chrome respects @include but warns the user that the script will run on 
// all websites because globbing is more liberal in @include. By using the
// @match line too, chrome doesn't complain.
//
// Also note the @require line only applies to greasemonkey. On chrome we
// load jquery manually later.

(function() {
    var main = function($) {
        var $main = $('#content-main').width('100%')
        var $related = $('#content-related, #doc-versions').hide()
        $('#billboard')
            .prepend('<h3 style="float:right">--&gt;||||</h3>')
            .on('click', function() {
                $related.toggle()
                $main.width($related.is(':hidden') ? '100%' : '70%')
                return false
            })
        $('#container').css({minWidth: 0})
    }

    if (typeof jQuery !== 'undefined') {
        // Firefox with greasemonkey
        main(jQuery)
    }
    else {
        // Chrome without @require support
        var script = document.createElement("script")
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
        script.addEventListener('load', function() {
            var script = document.createElement("script")
            script.textContent = "(" + main.toString() + ")(jQuery.noConflict());"
            document.body.appendChild(script)
        })
        document.body.appendChild(script)
    }
})()
