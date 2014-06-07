// ==UserScript==
// @name           Remove Marquees
// @namespace      http://fvds.frih.net/
// @description    Removes marquees from web pages. The marquee is just replaced by a div element with the same contents, so no information is gone.
// @include        *
// ==/UserScript==

function removeMarqueesFor(someDoc){
  var marquees = someDoc.getElementsByTagName('marquee');
  for(var i = 0; i < marquees.length; i++){
    var marquee = marquees[i];
    var parentNode = marquee.parentNode;
    var pElement = someDoc.createElement('div');
    
    parentNode.removeChild(marquee);
    
    for(var i = 0; i < marquee.childNodes.length; i++){
      pElement.appendChild(marquee.childNodes[i]);
    }
    
    for(var i = 0; i < marquee.attributes.length; i++){
      pElement.setAttribute(marquee.attributes[i].nodeName, marquee.attributes[i].nodeValue);
    }
    
    parentNode.appendChild(pElement);
  }
}

removeMarqueesFor(document);

for(var i = 0; i < frames.length; i++){
  removeMarqueesFor(frames[i].document);
}