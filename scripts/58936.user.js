// ==UserScript==
// @name           Forum Username Correction
// @namespace      http://userscripts.org/scripts/show/58936
// @description    Fixes posters' usernames.
// @include        http://forums.kingdomofloathing.com*
// ==/UserScript==

var nameset = ['A Retarded Moron', 'Rampant Arsery', 'ArsRetard', 'ArsOle', 'DumbArs'];
var namechoice = Math.floor(Math.random()* nameset.length);

document.body.innerHTML= document.body.innerHTML.replace(/ArsRampancy/g,nameset[namechoice]);
