// ==UserScript==
// @name          jpopsuki adv. search: titles only search
// @namespace     http://otterish.co.uk
// @description   allows searching of torrent titles only
// @version       0.1,1
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

// Interface alignment
module_align = 20;

// Create module span
moduleSpan = document.createElement('span');

var titlesOnlyCheckbox, titlesOnlyLabel;
titlesOnlyCheckbox = document.createElement('input');
titlesOnlyCheckbox.type = 'checkbox';
titlesOnlyCheckbox.name = 'titlesonly';
titlesOnlyCheckbox.value = '1';
titlesOnlyCheckbox.id = 'titlesOnlyCheckbox';
titlesOnlyLabel = document.createElement('p');
titlesOnlyLabel = document.createTextNode("Search titles only");
moduleSpan.appendChild(titlesOnlyCheckbox);
moduleSpan.appendChild(titlesOnlyLabel);

// Add the module to the holding array
moduleArr = new Array();
moduleArr[0] = 'search_titles'; // Module name
moduleArr[1] = moduleSpan; // Module interface element
moduleArr[2] = 'titlesonly'; // Query parameter (must be greater than 0)
moduleArr[3] = "titlesonly = document.getElementById('titlesOnlyCheckbox').checked;\nif (document.getElementById('asearch').getElementsByTagName('input')[1].value == false) {titlesonly = false}"; // Header code for post-load execution
moduleArr[4] = "for (var i = 0; i < document.links.length; i++) {\n\
   thisLink = document.links[i];\n\
   if (thisLink.href.indexOf('page=details&id=') > 0) { // Check if they are a torrent link\n\
      if (thisLink.getElementsByTagName('span').length < 1) // Look for highlights, if there aren't any...\n\
         window.kawa_hideTorrentRow(thisLink.parentNode.parentNode); // Hide their grandparent node\n\
   }\n\
}\
"; // Main body of code

// Check if the module array exists and create it if it doesn't
if (!window.kawa_asearch_modules)
   window.kawa_asearch_modules = new Array();
if (!window.kawa_asearch_moduleIndex)
   window.window.kawa_asearch_moduleIndex = new Array();

window.kawa_asearch_modules[module_align] = moduleArr;
window.kawa_asearch_moduleIndex.push(module_align);

})();