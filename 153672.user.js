// ==UserScript==
// @name        Target.com fix
// @namespace   div
// @description removes the target.com overlaw
// @include     http://www.target.com*
// @version     1
// ==/UserScript==
var a = 0;
window.addEventListener("load", function(e) {
  var elements = document.evaluate("//div[contains(@class, 'support-message curtain-open')] | //div[contains(@class, 'overlay default modal no-js')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) 
  {
    var thisElement = elements.snapshotItem(i);
	if ((thisElement.className == 'support-message curtain-open') && (a == 0))
	{
	a = a +1;
	thisElement.parentNode.removeChild(thisElement);
	}
	else if(thisElement.className == 'overlay default modal no-js')
	{
	thisElement.parentNode.removeChild(thisElement);
	}
	else
	{
    thisElement.parentNode.removeChild(thisElement);
	}
  }
},false);
document.getElementById('overlay-curtain').style.visibility='hidden';
document.getElementById('support-message').style.visibility='hidden';
document.getElementById('bgWrapper').style.visibility='hidden';
