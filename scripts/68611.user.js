// ==UserScript==
// @name        facebook badger
// @namespace   http://facebook.com/mark.olson
// @description Update a badge count for all notifications
// @include     http://*facebook.com/*
// @author      Mark Olson
// ==/UserScript==


function updateBadge() {
    var total = 0
    jewels = document.getElementsByClassName('jewelCount')
    for(i = 0; i < jewels.length; i++) { 
        total += parseInt(jewels[i].children[0].innerHTML)
    }
    
    tabs = document.getElementsByClassName('tab_count')
    for(i = 0; i < tabs.length; i++) { 
        total += parseInt(tabs[i].innerHTML)
    }
    
    if (total==0) {
        total = '';
    } else {
        window.fluid.dockBadge = total;
    }
}


(function () {
    if (window.fluid) {
        window.setInterval(updateBadge,500);
    }
})();