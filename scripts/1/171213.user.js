// ==UserScript==
// @name       IMDB Movie Meter/Star Meter
// @namespace  http://blindbartemais.deviantart.com/
// @version    0.2
// @description  useful for cheapskates.
// @match      http://pro.imdb.com/moviemeter/*
// @match      http://pro.imdb.com/people/*
// @copyright  2013+, Sean Loper
// ==/UserScript==

var main = function () {
    
    // use $ or jQuery here, however the page is using it
    $(document).ready(function() {
        // put all your jQuery goodness in here.
        $('div#pro_upsell_wrapper').remove();
    });
    
};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);