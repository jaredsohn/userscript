// ==UserScript==
// @name           TVCatchup small Video Player
// @namespace      http://userscripts.org/users/109606
// @description    Adds a button below the video player that allows you to switch to a smaller player
// @include        http://*tvcatchup.com/watch.html?c=*
// @include        https://*tvcatchup.com/watch.html?c=*
// ==/UserScript==


div1 = document.getElementsByTagName("div")[0];
div1 = div1.getElementsByTagName("div")[2];
div1.innerHTML = div1.innerHTML + 
"<br/><a href=# id='small'>Switch to small player</a>";

document.getElementById("small").addEventListener('click', function(event) {               
  size = 650;
  var player = document.getElementById('TVCatchupWebPlayer');
  player.width = size;
  player.height = size / 16 * 9;
  document.getElementById("small").style.display = "none";
}, true);