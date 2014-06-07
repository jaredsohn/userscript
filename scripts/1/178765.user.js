// ==UserScript==
// @name           @HW-adblockFix
// @version        1.0
// @namespace      
// @include        *hardware.no*
// @run-at         document-start
// ==/UserScript==

var changed = 1; // How many scripts need to be edited with

window.addEventListener('beforescriptexecute', function(e) {


    ///for inline script:
    
        if(e.target.innerHTML.search("adblock") != -1){ 
            changed--;
            e.stopPropagation();
            e.preventDefault();
            //alert("stopped one");
        }

	if(changed == 0) window.removeEventListener(e.type, arguments.callee, true);

}, true);
