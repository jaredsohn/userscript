// ==UserScript==
// @name        SB cred storage
// @author      James Quirk (Orion)
// @version     2
// @namespace   localhost
// @description Fills the form to drop creds in your starbase and return them again
// @include     http*://*.pardus.at/starbase_credits.php
// ==/UserScript==

// Change these variables: 
var credsRemain = 100000;    //amount of creds to remain on ship
var credsSBRemain = 11000000; //creds to remain in base if no previous value

// Read the tables and extract creds (hardcoded positions)
var tables = document.getElementsByTagName('table');
var columns = tables[3].getElementsByTagName('td');
var credsPlayer = parseInt(columns[0].textContent.replace(/,/g,''));
var credsStarbase = parseInt(columns[1].textContent.replace(/,/g,''));

// Simple logic: if you have more creds on your ship than in the base
// assume you want to transfer to base
if (credsPlayer > credsStarbase) {
  credsTransfer = credsPlayer - credsRemain;
  unsafeWindow.localStorage.setItem('credStorage', credsTransfer);
} else {
  // If for some reason this value is not set, calculate a new one
  credsTransfer = unsafeWindow.localStorage.getItem('credStorage')||(credsStarbase-credsSBRemain);
}

//Auto-fill the field here if credsTransfer > 0
if (credsTransfer > 0) {
  document.forms['starbasecredits'].elements[0].value = credsTransfer;
}
