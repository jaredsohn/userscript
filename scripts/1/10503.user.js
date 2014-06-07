// ==UserScript==
// @name           Penny Arcade Remove Side Ad
// @namespace      http://breibrei.livejournal.com
// @description    Removes the side ad on Penny Arcade and resizes the newsposts to fill the gap
// @include        http://www.penny-arcade.com/
// @include        http://www.penny-arcade.com/19*
// @include        http://www.penny-arcade.com/20*
// ==/UserScript==

var vAdBox = document.getElementById("advert");
if (vAdBox) {
  vAdBox.parentNode.removeChild(vAdBox); 
  var newsBox = document.getElementById("news");
  if (newsBox) {
    newsBox.style.width = '100%';
    var divs = document.getElementsByTagName("div");
    if (divs) for (var i=0; i<divs.length; i++) 
      if (divs[i].className=="postheader") {
        divs[i].style.cssFloat = 'left';
        divs[i].style.marginLeft = '8px';
      }    
  }
}  