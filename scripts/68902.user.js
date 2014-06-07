// ==UserScript==
// @name           TGR Rewind playlist link
// @namespace      http://armeagle.nl
// @description    Adds playlist links to the rewind entries
// @include        http://complete.gamingradio.net/modules/mod_rewind/player.php?recidx=*
// ==/UserScript==

var player = document.getElementsByTagName('object')[0];
var urlparam = player.getElementsByTagName('param')[0];
if ( urlparam.getAttribute('name') != 'fileName' ) {
  alert("GMscript error: didn't find the right parameter.");
} else {
  var url = urlparam.getAttribute('value');
  var ahref = document.createElement('a');
  ahref.setAttribute('href', url);
  ahref.setAttribute('style', 'color: white; margin-left: 10px;');
  ahref.textContent = url;
  
  var body = document.getElementsByTagName('body')[0];
  body.insertBefore(ahref, body.childNodes[0]);
}