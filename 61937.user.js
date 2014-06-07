// ==UserScript==
// @name           Minimal Slacker
// @namespace      http://moblog.bradleyit.com
// @description    Remove all but the player from slacker.com
// @include        http://www.slacker.com/
// ==/UserScript==

function yeargh() { // yeargh matey! prepare to be boarded by my javascript!!!
 var divs = ['com.gui.widget.ads','dialogs','modalDialog','smokeglass','sitefooter','tower','upgradebanner','basicnav','sitenav','highlights','sitecopyright'];
 for (var d in divs) {
  document.getElementById(divs[d]).parentNode.removeChild(document.getElementById(divs[d]));
 }
 document.getElementById("sitecontent").style.width = '650px';
}

document.body.addEventListener('load',yeargh,true);