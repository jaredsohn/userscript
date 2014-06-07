// ==UserScript==
// @name           Twitter - Connard Certifié
// @namespace      Twitter
// @description    Change "Compte vérifié" en "Connard certifié"
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var div = document.getElementById('side');
cleanElement(div);
var profile = cleanElement(div.firstChild);
var spanSelectionLinks = cleanElement(profile.firstChild);
var address = cleanElement(spanSelectionLinks.nextSibling);
var ul = cleanElement(address.nextSibling);
var li = cleanElement(ul.firstChild);
var a = cleanElement(li.firstChild);
var em = cleanElement(a.firstChild);
em.innerHTML = "Connard Certifié";

/**
* ProggerPete function
*/
function cleanElement(element)
{    
  if (element == null) return 0;
  var numTextElementsRemoved = 0;
  var node = element.firstChild;
  while (node != null)
  {
    var tmp = node.nextSibling;
    if (node.nodeName == '#text')
    {  
      element.removeChild(node);
      numTextElementsRemoved++;
    }
    node = tmp;
  }
  // return numTextElementsRemoved;
  return element;
}