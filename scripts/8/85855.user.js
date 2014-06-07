// ==UserScript==
// @name        Help Desk Dock Badge
// @namespace   http://fluidapp.com
// @description Display unread ticket count for Help Desk
// @author      Mark Carver mark.carver@me.com
// ==/UserScript==

(function () {
    if(window.fluid) {
        updateBadge();
        var intervalID = window.setInterval(updateBadge,1000);
    }
})();

function updateBadge() {
    var unread = 0;
    var arr = new Array();
    arr = document.getElementsByTagName( "img" );
    for(var i=0; i < arr.length; i++) {
      if(arr(i).src.match(/new_ticket/)) {
        unread++;
      }
    }
    if (unread && unread > 0) {
        window.fluid.dockBadge = unread;
    } else {
        window.fluid.dockBadge = "";
    }
}