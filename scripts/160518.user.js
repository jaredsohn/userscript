// ==UserScript==
// @name        Low creds alert
// @author      James Quirk (Orion)
// @version     1.0
// @namespace   localhost
// @description Changes the color of the amount of creds if below a certain value and alerts at logout screen
// @include     http*://*.pardus.at/main.php
// @include     http*://*.pardus.at/logout.php
// @grant       none
// ==/UserScript==

// Change this to the minimum amount of creds you need to have on you
var minCreds = 80000;
// Change font properties and color
var layoutString = 'font-size:12pt;color:#ff0000;';
// Alert message
var alertMsg = "Creds are low - are you sure you want to log out?"

function mainCreds() {

  //First <span id='credits'> followed by <span style=...
  var credSpan = document.getElementById('credits').children[0];

  // It appears that there is not always an extra span tag
  // perhaps for low cred values
  if (credSpan == undefined) {
    credSpan = document.getElementById('credits');
  }

  // Extract creds
  var creds = credSpan.innerHTML.replace(/,/gi, '');

  if (creds < minCreds) {
    credSpan.setAttribute('style', layoutString);
  }

}

function logoutCreds () {
  var creds = document.getElementById('credits').innerHTML.replace(/,/gi, '');
  if (creds < minCreds) {
    alert(alertMsg);
  }

}

//Main screen or logout screen
if (document.location.href.indexOf('logout') != -1) logoutCreds();

if (document.location.href.indexOf('main') != -1) mainCreds();
