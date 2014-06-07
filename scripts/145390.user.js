// ==UserScript==
// @name            Disable slider animation on OMG! Ubuntu! website
// @description     Disables CPU-hungry slider animation on OMG! Ubuntu! website (http://www.omgubuntu.co.uk/)
// @version         0.1
// @match           http://www.omgubuntu.co.uk/*
// @grant           none
// @namespace       http://twitter.com/vkchk
// @copyright       2012+, vkchk
// ==/UserScript==


(function(){
    
    // (Helper) Inject js into real page context to get access to site's jQuery
    function injectFunc(func){
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.textContent = '(' + func.toString() + ')();';
        document.body.appendChild(script);
    }
    
    injectFunc(function(){
        $(document).ready(function(){
            // Stop the damn animation
            $('#banner').flexslider("pause");
        });
    })
   
})()