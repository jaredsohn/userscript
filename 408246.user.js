// ==UserScript==
// @name        Auto Form
// @namespace   RobTheKlepto
// @include     *misfitzow.tk*
// @include     *outwar.com*
// @version     1
// @grant       none
// ==/UserScript==
 

// Kleptonian Addition
if ( document.URL.indexOf("world.php") != -1 ) {
  setTimeout(function(){window.location.assign('formraid.php?target=' + roomDetails.innerHTML.split('formraid.php?target=')[1].split('">')[0].replace('&amp;','&'))},2000);
  return
} 

// End Kleptonian Addition