// ==UserScript==
// @name           Enable right mouse click
// @namespace      Prevents websites from intercepting right mouse clicks
// @description    Drag an image to the adressbar and it will download. Right clicks are enabled now!
// @include        http://*/*
// @include        https://*/*
// @author         K.M. de Haan
// @authorURL	   http://www.k-graphics.nl
// @downloadURL    http://userscripts.org/scripts/source/169090.user.js
// @updateURL      http://userscripts.org/scripts/source/169090.meta.js
// @icon	   http://i1229.photobucket.com/albums/ee462/joeralit/jempollike.png
// @version        1.1
// @license        GNU
// ==/UserScript==


document.body.addEventListener("contextmenu", function(e){e.stopPropagation();}, true);


