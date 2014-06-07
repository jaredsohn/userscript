// ==UserScript==
// @name       elektrisch-roken.com , geen animaties etc.
// @namespace  http://actie-commitee-tegen-sneewstormen.com
// @version    0.1
// @description  stopt de bewegende smilies,geen sneeuw rond de kerst, en stopt sommige scrollende tekst.
// @match      http://www.elektrisch-roken.com/*
// ==/UserScript==


var initCleanup = function () {
    //stop snowstorm
    if (snowStorm) {
    	snowStorm.stop();
    }
    //stop bewegende gifs
    setTimeout(freeze_gifs_on_init, 500);
    //verwijder marquees
    removeMarqueesFor(document);
};

// freeze gifs by Johan Sundström  : http://userscripts.org/scripts/show/80588
function freeze_gifs_on_init() {
    [].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);
}

function is_gif_image(i) {
  return /^(?!data:).*\.gif/i.test(i.src);
}

function freeze_gif(i) {
  var c = document.createElement('canvas');
  var w = c.width = i.width;
  var h = c.height = i.height;
  c.getContext('2d').drawImage(i, 0, 0, w, h);
  try {
    i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
  } catch(e) { // cross-domain -- mimic original with all its tag attributes
    for (var j = 0, a; a = i.attributes[j]; j++)
      c.setAttribute(a.name, a.value);
    i.parentNode.replaceChild(c, i);
  }
}
//
//Remove Marquees: by Frederik Vanderstraeten http://userscripts.org/scripts/show/6848
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


if ( !!(window.addEventListener) )
window.addEventListener("DOMContentLoaded", initCleanup )
