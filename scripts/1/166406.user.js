// ==UserScript==
// @name       Dorkly Arrow Browser
// @version    1.0
// @description  Script allows you to browse through Dorkly articles with the arrow keys.
// @match      http://www.dorkly.com/*/*
// @copyright  2013, James Sullivan
// ==/UserScript==

// Load jQuery, wait for it to finish loading, then call the callback function
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// Function executed after jQuery is loaded
function main() {
    // Note, jQ replaces $ to avoid conflicts.
    var nextPage = jQ(".next a").attr("href"), previousPage = jQ(".previous a").attr("href");
    jQ(document).keydown(function(e){
        if (e.keyCode === 39) { // Right Arrow
            e.stopPropagation();
            window.location = nextPage;
        } else if (e.keyCode === 37) { // Left Arrow
            e.stopPropagation();
            window.location = previousPage;
        }
    });
}

// load jQuery and execute the main function
addJQuery(main);