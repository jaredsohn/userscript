// ==UserScript==
// @name           Habin-adblockFix
// @version        1.0
// @namespace      
// @include        *habin.me*
// @run-at         document-start
// ==/UserScript==

var changed = 1;

window.addEventListener('beforescriptexecute', function(e) {
    
        if(e.target.innerHTML.search("TestPage") != -1){ 
            changed--;
            e.stopPropagation();
            e.preventDefault();
        }

	if(changed == 0) window.removeEventListener(e.type, arguments.callee, true);

}, true);