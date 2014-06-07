// ==UserScript==
// @name          jpopsuki adv. search: highlight stripper (standalone)
// @namespace     http://otterish.co.uk
// @description   strips the highlights off search pages (standalone version)
// @version       0.2
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

// Interface alignment
module_align = 30;

// Category dropdown module span
moduleSpan = document.createElement('span');

var noHighlightCheckbox, noHighlightLabel;
noHighlightCheckbox = document.createElement('input');
noHighlightCheckbox.type = 'checkbox';
noHighlightCheckbox.name = 'noHighlight';
noHighlightCheckbox.value = '1';
noHighlightCheckbox.id = 'noHighlightCheckbox';
noHighlightLabel = document.createElement('p');
noHighlightLabel = document.createTextNode("Remove highlights");
moduleSpan.appendChild(noHighlightCheckbox);
moduleSpan.appendChild(noHighlightLabel);

// Add the module span to the holding array
moduleArr = new Array();
moduleArr[0] = 'noHighlight'; // Module name
moduleArr[1] = moduleSpan; // Module interface element
moduleArr[2] = 'noHighlight'; // Query parameter (must be greater than 0)
moduleArr[3] = "noHighlight = document.getElementById('noHighlightCheckbox').checked;";
moduleArr[4] = "var allElements, thisElement;\n\
allElements = document.getElementsByTagName('span');\n\
for (var i = 0; i < allElements.length; i++) {\n\
   thisElement = allElements[i];\n\
   if (thisElement.style.backgroundColor.substr(0,3) == 'rgb')\n\
      thisElement.style.backgroundColor = '';\n\
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