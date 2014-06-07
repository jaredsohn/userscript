// ==UserScript==
// @name       Mirror on double click
// @namespace  http://e17.dk/
// @version    0.9
// @description  Double click anything to mirror it
// @match      http://www.e17.dk/
// @copyright  2013, Nota
// ==/UserScript==

(function() {
    function run($) {
        $(document).dblclick(
            function(e){
                $(e.target).css({'display': 'block', '-webkit-transform': 'matrix(-1,0,0,1,0,0)'});
                e.preventDefault();
            }
        );
    }
    
    function gm_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(gm_wait, 100);
        } else {
            unsafeWindow.jQuery(function() {run(unsafeWindow.jQuery)});
        }
    }
    gm_wait();

})();
