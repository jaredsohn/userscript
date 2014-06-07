// ==UserScript==
// @name           DS Editor Comments mover
// @description    Moves Editor comments, in rewrites, from the right side to the center with the rest of the comments
// @include        http*://*.demandstudios.com/view.php*
// ==/UserScript== 

var edcoms = document.getElementById('editorComments');
var edcont = document.getElementById('EditorCommentsContainer');
var divs = document.getElementsByTagName('div');
var newcoms = edcoms.innerHTML;

var divTag=document.createElement('div');

divTag.innerHTML=newcoms;
divs[15].appendChild(divTag);

edcont.parentNode.removeChild(edcont);
