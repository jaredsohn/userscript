// ==UserScript==
// @name       Forbes skip ads
// @version    0.1
// @description  Skip frickin ad screen on forbes
// @match      http://www.forbes.com/fdc/welcome_mjx.shtml
// @copyright  2013+, You
// @license    MIT or public domain, whatever is allowed in your country
// ==/UserScript==

(function (){
    function log(t){
        console.log("ForbesSkip: " + t);
    }

    function reschedule(f){
        log("Not loaded enough, re-scheduling");
        window.setTimeout(f, 200);
    }

    function auto_skip(){
        log("Started");
        
        var continues = document.getElementsByClassName('continue');
        var clink = null;
        
        for (var i = 0; i < continues.length; i++) {
            var elem = continues[i];
            
            if (elem.nodeName == 'A') {
                clink = elem;
                break;
            }
        }
        
        if (clink == null) {
            reschedule(auto_skip);
            return;
        }
        
        clink.click();

        log("Finished!");
    }

    log("Loaded.");
    window.setTimeout(auto_skip, 5);
})();
