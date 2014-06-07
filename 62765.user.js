// ==UserScript==
// @name          TT
// @namespace     Ereinion
// @description   Allows to see travel time for coaches (only for the moment) in Transporter tycoon game.
// @include       http://www.transporter-tycoon.co.uk/myFleet.php
// ==/UserScript==
var allRoutes, thisRoute, elems, currentTime;

allDivs = document.getElementsByTagName('div');
for (var i = 0; i < allDivs.length; i++) {
  thisDiv = allDivs[i];

  if (thisDiv.getAttribute('class') == 'news')
  {
    var str;
    var obj = thisDiv.getElementsByTagName('div')[0];
    if (obj.getAttribute('class') == "buttons")
    {
      str = thisDiv.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML;
    }
    else
    {
      str = thisDiv.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML;
    }
    // Chargable Hours: Xh XXm
    tmp1 = str.split(':');
    if (tmp1.length < 2) return;
    tmp2 = tmp1[1].split('h');
    if (tmp2.length < 2) return;
    hours = parseInt(tmp2[0]);
    minutes = parseInt(tmp2[1].split('m')[0]);
    currentTime = hours*60 + minutes;
    
  }

  if (thisDiv.getAttribute('class') == 'products')
  {
    var places = thisDiv.getElementsByTagName('strong');
    var index = places.length - 1;
    var divTime = document.createElement("div");
    var dist = places[4].innerHTML;
    var time = Math.ceil(dist / 0.2);
    var strTime = Math.floor(time / 60) + "h " + ((time % 60) < 10 ? "0" + (time % 60) : (time % 60)) + "m";
    var totalTime = currentTime + time;
    var strTotalTime = Math.floor(totalTime / 60) + "h " + (totalTime % 60) + "m";
    divTime.innerHTML = '<div>Trip duration : <strong>' + strTime + '</strong><br/>' +
                        'Total driver hours : <strong>' + strTotalTime + '</strong></div>';
    places[index].parentNode.insertBefore(divTime, places[index].nextSibling);
  }
}
