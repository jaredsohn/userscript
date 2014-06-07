// ==UserScript==
// @name Hide 3D illusion titles
// @description Makes 3D things harder to guess
// @namespace 3dillusiontitlehide
// @include http://lookmind.com/illusions.php?id=*
// ==/UserScript==

document.getElementsByTagName('b')[1].style.visibility='hidden';
