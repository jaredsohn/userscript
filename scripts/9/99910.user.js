// ==UserScript==
// @name           Disable rubies
// @namespace      Disable rubies
// @version        1.0
// @include        http://s*.gladiatus.*/game/index.php?*
// @exclude        http://s*.gladiatus.*/game/index.php?mod=premium*
// @exclude        http://s*.gladiatus.*/game/index.php?mod=powerups*
// ==/UserScript==

var re = /http:\/\/s\d{1,2}(\.[A-Za-z]{2,3})?\.gladiatus\.[A-Za-z]{2,3}\/game\/index\.php\?mod=(premium.*|powerups)/
var aat = document.getElementsByTagName("a");
for(var i = 0; i <  aat.length; i++){
  if(aat[i].href.match(re)){
    aat[i].href = "javascript:if(MooTools.myvarxxx){window.location='" + aat[i].href + "';this.style.display='none';}void(0)";
  }
}
var topBar = document.getElementById("wrapper_game");
var newLnk = document.createElement("a");
newLnk.setAttribute("id", "mylinkxxx");
newLnk.setAttribute("href", "javascript:void(MooTools.myvarxxx = true);void(document.getElementById('mylinkxxx').style.display = 'none')");
newLnk.appendChild(document.createTextNode("Enable rubies"));
newLnk.style.border = "#666 outset 4px";
newLnk.style.backgroundColor = "#666";
newLnk.style.color = "#fff";
newLnk.style.padding = "0.5em";
newLnk.style.position = "fixed";
newLnk.style.top = "1em";
newLnk.style.left = "1em";
newLnk.style.zIndex = "2000";
topBar.appendChild(newLnk);
document.getElementById("header_link").style.width = "500px";
document.getElementById("header_link").style.marginLeft = "200px";