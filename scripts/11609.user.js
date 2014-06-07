// ==UserScript==
// @name           Hide Pandora Ads
// @namespace      http://greasemonkey.kramers.ws/
// @description    Hides the advertisements embedded in the Pandora.com player. This refers to those embedded in the main "Tuner" Flash object, and are therefore unblockable using AdBlock or more general ad blocking software. This script can act on its own, or it can complement the "Pandora Tuner Only" greasemonkey userscript by Steve McLenithan.
// @include        http://pandora.com/
// @include        http://www.pandora.com/
// ==/UserScript==

document.getElementById('radio').getElementsByTagName('embed')[0].height = '330px';