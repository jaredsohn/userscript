// ==UserScript==
// @name        Derpibooru Navigation
// @namespace   Derpibooru
// @description When viewing an individual image on derpiboo.ru, the left and right arrow keys navigate prev/next, and ctrl+up navigates to the global image list.
// @include     /^http*://derpiboo\.ru/(images/)?[0-9]*?(\?scope=.*?)?$/
// @version     1
// @grant       none
// ==/UserScript==


var result = document.evaluate("//div[@class='metasection']",
                               document.documentElement, null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var links = Array();
var host = location.href.substring(0, location.href.indexOf('/'));
var controlIsDown = false;
var navDiv,navNodes;

if(result)
  for(var i = 0, len = result.snapshotLength; i < len; i++)
  {
    navDiv = result.snapshotItem(i);
    if(navDiv.firstChild.nextSibling.nodeName == 'SPAN')
      break;
  }

navNodes = navDiv.childNodes;
for(var i = 0, len = navNodes.length; i < len; i++)
  if(navNodes[i].nodeName == 'SPAN')
    links.push(navNodes[i]);

//-----------------------------------------------------------------------------

window.addEventListener('keydown', function(event) {
  switch(event.keyCode)
  {
    case 17: // Control
      controlIsDown = true;
      break;
    default:
      break;
  }
});

window.addEventListener('keyup', function(event) {
  var target = event.target;
  var tagName = target ? event.target.tagName : '';
  var isFocusedText = tagName == 'INPUT' || tagName == 'TEXTAREA';
  
  switch(event.keyCode)
  {
    case 17: // Control
      controlIsDown = false;
      break;
    case 37: // Left
      if(!isFocusedText) location.assign(links[0].firstChild);
      break;
    case 38: // Up
      if(controlIsDown) location.assign(links[1].firstChild);
      break;
    case 39: // Right
      if(!isFocusedText) location.assign(links[2].firstChild);
      break;
    default:
      break;
  }
});