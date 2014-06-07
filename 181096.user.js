// ==UserScript==
// @name         Facepunch TimeSinceLastRefresh
// @namespace    https://github.com/hypershadsy
// @version      0.1
// @description  reminds you how old the page you're viewing is
// @match        http://*facepunch.com/*
// @copyright    2013, Hypershadsy
// @require      http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js
// @licence      http://opensource.org/licenses/MIT
// ==/UserScript==

(function(){
    var loadTime = moment();
    /* wtf fp you have the same id for multiple elements */
    var parent = $(".threadfoot h2 #reply_button"); 
    if (parent.length == 0) return;
    
    var newSpan = document.createElement("span");
    var textNode = document.createTextNode("Refreshed: Just now");
    newSpan.appendChild(textNode);
    newSpan.id = "refreshtimer";
    newSpan.style.marginLeft = "10px";
    parent.append(newSpan);
    
    setInterval(
    	function() {
            var now = moment();
            var diffHr = now.diff(loadTime, "hours");
            var diffMin = now.diff(loadTime, "minutes");
            var diffSec = now.diff(loadTime, "seconds");
            
            if (diffHr)
            {
            	textNode.textContent = "Refreshed: " + diffHr + " hour" + (diffHr == 1 ? "" : "s") + " ago";
                return;
            }
            if (diffMin)
            {
            	textNode.textContent = "Refreshed: " + diffMin + " minute" + (diffMin == 1 ? "" : "s") + " ago";
                return;
            }
            if (diffSec)
            {
                textNode.textContent = "Refreshed: " + diffSec + " second" + (diffSec == 1 ? "" : "s") + " ago";
                return;
            }
        },1000);
})();