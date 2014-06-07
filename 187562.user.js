// ==UserScript==
// @name            Let met autocomplete!
// @namespace       http://texthtml.net/
// @description     Turns on autocomplete on for all text and password fields.
// @why             Not auto completing passwords is annoying and might even be less secure than storing them. http://blog.0xbadc0de.be/archives/124
// @Note            You will be able to store passwords on your computer by using this! Make sure it's protected properly!
// @version         1
// @license         MIT http://www.opensource.org/licenses/MIT
// @include         *
// @grant           none

// ==/UserScript==


(function() {
    function unlock_autocomplete() {
        [].forEach.call(document.querySelectorAll('input,form'), function(el) {
            if(el.autocomplete === 'off') {
                el.autocomplete = 'on';
            }
        });
    };
    
    unlock_autocomplete(); // take care of what's already there
    
    document.addEventListener('ready', unlock_autocomplete); // make sure we got them all
    
    window.setTimeout(unlock_autocomplete, 5000); // nobody use a delayed javascript to prevent autocomplete. or do they?
}) ();