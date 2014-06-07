// ==UserScript==
// @name Facebook Newsfeed Cleaner
// @description Removes all applications from the news feed. With the exception of Mafia Wars.
// @namespace Newsfeed Cleaner
// @include http://*facebook.com/home.php*
// @include http://*facebook.com/*ref=home
// @include http://*facebook.com/*ref=logo
// @version 0.3.11
// @author BreakIt
// ==/UserScript==

clean()
function clean () {
  document.addEventListener("DOMNodeInserted", cleanFeed, false);
}
   
function cleanFeed() {      
  var nodes = document.getElementsByClassName("UIActionLinks");

  for (i=0;i<nodes.length;i++) {
    var node = nodes[i];

     if ((node.innerHTML.match('MoscowPromo')) || (node.innerHTML.match('recruit_join_mafia')) || (node.innerHTML.match('story_war_won')) || (node.innerHTML.match('sendgiftshort')) || (node.innerHTML.match('wishlistshort')) || (node.innerHTML.match('ztrack_category=achievement')) || (node.innerHTML.match('lotto_purchased_ticket')) || (node.innerHTML.match('requestmafiashort')) || (node.innerHTML.match('Take a chance and win big'))) {
      node.parentNode.parentNode.parentNode.style.display='none';
    }

    if ((!node.innerHTML.match('inthemafia'))) {
      if ((node.innerHTML.match('apps\.facebook\.com')) || (node.innerHTML.match('quiz\.applatform\.com')) || (node.innerHTML.match(/take this quiz/i))) {
        node.parentNode.parentNode.parentNode.style.display='none';
      }
    }
  }
}