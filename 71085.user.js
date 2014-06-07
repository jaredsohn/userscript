// ==UserScript==
// @name           ESPN Boards: Anti-Bump script
// @namespace      By sb20021 (based on the original annoying poster removal script)
// @description    Hide posts which don't begin with a dash.
// @include        http://boards.espn.go.com/boards/mb/mb?sport=nfl&id=nwe
// ==/UserScript==
//
// This only works on the New England Patriots board on ESPN.com. Change the @include
// as you see fit to get it to work on other teams boards. If a bump happens you might
// have to go to different pages to see all the dashed posts but you'll never see non 
// dashed ones.
//-----------------------------------------------------------------------------


var trs = document.getElementsByTagName('tr');


for (i=2; i<trs.length; i++)
{
 
  var topicPrefix =  trs[i].firstChild.textContent.substring(0,1);
 
  var goodTopic = (topicPrefix=='-')

  if (goodTopic==false) trs[i].innerHTML = '';
 
}
