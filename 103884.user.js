// ==UserScript==
// @name        Google Docs New Documents Checker (by www.triplestarholdings.com)
// @namespace   http://fluidapp.com
// @description Please click the Install button
// @include     *
// @author      Triplestar Holdings
// ==/UserScript==

(function () {
    if(window.fluid) {
        updateBadge();
        var intervalID = window.setInterval(updateBadge,10000);
    }
})();

function updateBadge() {
    var unread = 0;
    
    var countRead = document.getElementsByClassName('doclist-tr-viewed').length;
    var countAll = document.getElementsByClassName('doclist-tr').length;
    var countSelected = document.getElementsByClassName('doclist-tr-selected').length; 
    var unread = (countAll + countSelected) - countRead;
    
    if (unread && unread > 0) {
        window.fluid.dockBadge = unread;
    } else {
        window.fluid.dockBadge = "";
    }
}
