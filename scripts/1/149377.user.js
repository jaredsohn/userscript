// ==UserScript==
// @name        BlackBoard PDF Direct Link
// @namespace   somini
// @description Redirecciona os link para o PDF Viewer do browser
// @include     http://elearning.uminho.pt/webapps/blackboard/execute/content/file*
// @grant	none
// @version     2
// ==/UserScript==

parent.location.replace(document.getElementById('PDFEmbedID').src);
