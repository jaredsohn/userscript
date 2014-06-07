// ==UserScript==
// @name OGame Frame Remover
// @description Removes the frame with the flags in the new OGame portal
// @author OScript
// @include http://*ogame.*
// ==/UserScript==

// ==VersionInfo==
// @version 0.1
// @date 30-05-2007
// @ogame 0.76
// ==/VersionInfo==

frameremover();

function frameremover() {
 var tags = document.getElementsByTagName('iframe');
 tags[0].parentNode.removeChild(tags[0]);
}