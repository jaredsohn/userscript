// ==UserScript==
// @name        OWA Timeout Refresh
// @namespace   http://userscripts.org/users/tlbdk
// @description Prevent OWA from doing a session timeout
// @exclude     * 
// @version     1
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

setInterval(function() {
    console.log("refresh page");
    exec(function() {
        if (typeof(sessionTimeout) != 'undefined') {
            document.getElementById("divToolbarButtoncheckmessages").click();
        }
    }); 
}, 30000);




