// ==UserScript==
// @name           Dumbtest
// @namespace      Me
// @description    None
// @include        http://www.delugerpg.com/gym*
// @include		   http://www.delugerpg.com/compbattle*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// check for buttons every (1000ms / 1 second)
var interval = setInterval(function() {
    // get elements
    var elements = document.querySelectorAll('input[type="submit"]');
    var val, i;
    //--- Note that the contains() text is case-sensitive.
    // loop through all elements
    for (i = 0; i < elements.length; i++) {
        // shorten value for easier use
        val = elements[i].value;
        if (val == 'Continue' || val == 'Attack' || val == 'Start Battle' || val == ' Attack ') {
            // click element
            elements[i].click();
        }
    }
    var TargetLink = $("a:contains(' Battle This Gym Again')");
    var TargetLink2 = $("a:contains('Click Here')");
    if (TargetLink && TargetLink.length) {
        window.location.href = TargetLink[0].href;
    }
    if (TargetLink2 && TargetLink2.length) {
        window.location.href = TargetLink2[0].href;
    }
}, 300);