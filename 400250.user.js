// ==UserScript==
// @name        JAVAkiba filter
// @namespace   http://www.userscripts.org
// @description JAVAkiba hide paid files
// @include     http://javakiba.org/*
// @version     1.20
// ==/UserScript==


(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    // Start polling...
    checkReady(function($) {
		$('article.category-special div.entry-content, article.category-special footer').hide();
    });
})();


