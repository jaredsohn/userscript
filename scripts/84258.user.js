// ==UserScript==
// @name           Goalll Extended kudolink checker
// @namespace      Made by X_choice
// @description    Checkt of een link een kudolink is
// @include        http://*goalll.nl/forum/viewtopic.php*
// ==/UserScript==

var links = document.getElementsByTagName ('a');for(i=0;i<links.length;i++) {if (links[i].href.indexOf("ssmm987.comyr.com/?a=kudo") == 7) {var oldlink = links[i].href;links[i].href = '#';links[i].setAttribute('onclick', 'var answer = confirm("Je hebt zojuist geklikt op een kudolink. Weet je zeker dat je een kudo wilt geven?");if (answer){window.location = "'+oldlink+'";}');x.appendChild(links[i]); }}