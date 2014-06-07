// ==UserScript==
// @name        Kira-reviews functionality reviver
// @namespace   http://userscripts.org/users/521514
// @description Reenables content selection and right-click on images for kira-reviews.com
// @include     http://www.kira-reviews.com/*
// @grant       none
// @run-at      document-start
// @version     1
// ==/UserScript==

function killEvent(e){
    e.preventDefault();
	e.stopPropagation();
}
window.addEventListener('beforescriptexecute', function(e) {
    
    if (e.target.src === 'http://www.kira-reviews.com/wp-content/plugins/no-right-click-images-plugin/no-right-click-images.js') {
        // Blocking external script to reenable right click on images:
        killEvent(e);
    }else if(e.target.innerHTML.indexOf('disableSelection') !== -1){
        // Blocking inline script to reenable selection:
        killEvent(e);
    }

}, true);