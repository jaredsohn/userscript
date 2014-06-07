// ==UserScript==
// @name           Alien Visitors - UFO link opener
// @namespace      Integrator
// @description    Opens Alien Visitors - UFO links in new tabs, when clicked button at the bottom.
// @include        http://www.facebook.com/groups/219459598090058*
// @include        http://www.facebook.com/groups/219404754763571*
// @include        http://www.facebook.com/groups/clickclickufo*
// @history        1.00 - Initial release
// ==/UserScript==

var excludes = '&fromWall';
var openedLinks = {};
var theButton = document.createElement('input');
theButton.type = 'button';
theButton.value = 'Start script';
document.body.appendChild(theButton);
theButton.addEventListener('click', function() {
   var theLinks = document.links;
   var currentURL = "";
   for(var i = 0; i < theLinks.length; i++) {
      currentURL = theLinks[i].href;
      if(currentURL.indexOf('http://alien-visitors.com/alienvisitor/bossMonster/assistBoss?instanceId=') != -1 && currentURL.indexOf(excludes) == -1 && openedLinks[currentURL] != true) {
         openedLinks[currentURL] = true;
         GM_openInTab(theLinks[i].href);
      }
   }
}, false);
