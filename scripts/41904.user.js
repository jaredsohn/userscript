// ==UserScript==
// @name               Facebook Reload Button
// @namespace          http://userscripts.org/users/78654
// @description        Adds a reload button on Be A Tycoon page to refresh the page to update the price
// @include            http://apps.facebook.com/beatycoon/*
// ==/UserScript==

// Adds the button next to the price update clock, with the new change to the UI

function insertAfter(newNode, node) {
    if (node.nextSibling) // does next sibling exist? If so, insert before
        node.parentNode.insertBefore(newNode, node.nextSibling);
    else node.parentNode.appendChild(newNode);        // if not, append last
}

try {
    var fbdiv = document.getElementById('app15420082636_price_update');
    if (fbdiv) {
        var reloadDiv = document.createElement('div');
        reloadDiv.setAttribute('id','fb_reload');
        reloadDiv.style.margin = "5px";
        reloadDiv.innerHTML = "<input id=\"fb_reload_button\" type=\"button\" value=\"Refresh\" onclick=\"window.location.href=window.location.href\"></input>";
        insertAfter(reloadDiv, fbdiv);
       
    }
} catch (err) { GM_log("Error: " + err); }

