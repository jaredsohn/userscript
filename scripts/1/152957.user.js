// ==UserScript==
// @name          Yahoo! Mail Ad Hider
// @namespace     http://markwilson.homeip.net
// @description      Hides the Yahoo! Mail ads
// @include       http*://*mail.yahoo.com*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


// the guts of this userscript
function main() {
    $("#theMNWAd").hide();
    $("#theAd").hide();
    $("#shellcontent").css("right", "0");
}

// load jQuery and execute the main function
addJQuery(main);