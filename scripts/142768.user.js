// ==UserScript==
// @name           TPM MAP BOT
// @namespace      Razzel
// @description    Tpm map bot. Dont take credit if you didnt make this. i will hunt you down. And eat you
// @include        http://tpmrpg.net/legendary_areas.php?area_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// check for buttons every (1000ms / 1 second)
var interval = setInterval(function() {
    // get elements
    var elements = document.querySelectorAll('input[type="button"]');
    var val, i;
    //--- Note that the contains() text is case-sensitive.
    // loop through all elements
    for (i = 0; i < elements.length; i++) {
        // shorten value for easier use
        val = elements[i].value;
        if (val == 'Continue' || val == 'Search' || val == 'Proceed' || val == ' Attack ') {
            // click element
            elements[i].click();
        }
    }
}, 10);