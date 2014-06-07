// ==UserScript==
// @name           FaceBook Mafia Exterminator
// @namespace      FaceBook Mafia Exterminator
// @description    Removes any status updates with the words "MAFIA" or "PIMPING" in capitals or links to the app "inthemafia". For now at least.
// @include        http://*facebook.com/home.php*
// @include        http://*facebook.com/*ref=home
// @include        http://*facebook.com/*ref=logo
// @version 0.1.0
// @author Jason Anderson
// ==/UserScript==

clean()
function clean () {
  document.addEventListener("DOMNodeInserted", cleanFeed, false);
}
   
function cleanFeed() {      
  var nodes = document.getElementsByClassName("UIIntentionalStory");

  for (i=0;i<nodes.length;i++) {
    var node = nodes[i];

    if ((node.innerHTML.match('MAFIA')) || (node.innerHTML.match('PIMPING')) || (node.innerHTML.match('inthemafia'))) {
      node.style.display = 'none';
    }
  }
}
