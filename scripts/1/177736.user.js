// ==UserScript==
// @name         Steam Market Show/Hide Listings
// @version      0.5
// @description  Add a button to show/hide market listings.
// @include      http://steamcommunity.com/market*
// @updateURL    http://userscripts.org/scripts/source/177736.user.js
// @icon         http://i.imgur.com/tSGYD2X.png
// @copyright    2013+, RMA
// ==/UserScript==

(function() {  
    var div = document.getElementById('myListings')
    var button = document.querySelector('.pick_and_sell_button');
    var ref = document.getElementById('myMarketTabs');
	
    // Hide Listings
    div.style.display = 'none';

    clone = button.cloneNode(true); 
    var link = clone.getElementsByTagName("a")[0]; 
    var content = clone.querySelector('span.item_market_action_button_contents');
    clone.id = "show_hide"; 
    content.innerHTML = 'Show';
    link.removeAttribute("href");
    link.removeAttribute("onclick");
    ref.appendChild(clone);
    
    // Position
    clone.style.position = "relative";
    clone.style.left = '650px';
    clone.style.top = '-5px';
	
    // Onclick function
    clone.onclick = function() {
        if (div.style.display === 'block' || div.style.display === '') {
            div.style.display = 'none'; 
        	content.innerHTML = 'Show';
        }
        else {
            div.style.display = 'block';
        	content.innerHTML = 'Hide';
        }
    }
})();