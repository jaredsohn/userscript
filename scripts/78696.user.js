// ==UserScript==



// @name           Gladiatus Cleanup



// @namespace      www.traviantrucchi.org



// @author         Dark Simon



// @description    Remove Ads from Gladiatus



// @version        1.2



// @include        http://*.gladiatus.*/*



// @include	   http://*.gladiatus.*/game/index.php*



// ==/UserScript==



function noDisplayClass(theClass)

{

    var ads = document.getElementsByClassName(theClass);
    for(var i = 0, length = ads.length; i < length; i++)
          ads[i].style.display = 'none';

}



function removeElement(theId) {



  var ads = document.getElementById(theId);

  if (ads && ads.style.display != 'none')

  	ads.style.display = 'none';  



}



removeElement('banner_right');
removeElement('a753ce6b');
noDisplayClass('banner1');

