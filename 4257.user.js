// ==UserScript==
// @name          jpopsuki adv. search: dead torrent ignore
// @namespace     http://otterish.co.uk
// @description   hides dead/seedless torrents
// @version       0.2
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==
(function(){

// Interface alignment
module_align = 10;

// Create module span
moduleSpan = document.createElement('span');

var noDeadCheckbox, noDeadLabel;
noDeadCheckbox = document.createElement('input');
noDeadCheckbox.type = 'checkbox';
noDeadCheckbox.name = 'noDead';
noDeadCheckbox.value = '1';
noDeadCheckbox.id = "noDead_checkbox";
noDeadLabel = document.createElement('p');
noDeadLabel = document.createTextNode("Ignore dead torrents");
moduleSpan.appendChild(noDeadCheckbox);
moduleSpan.appendChild(noDeadLabel);

// Add the module to the holding array
moduleArr = new Array();
moduleArr[0] = 'deadTorrentHider'; // Module name
moduleArr[1] = moduleSpan; // Module interface element
moduleArr[2] = 'noDead'; // Query parameter (must be greater than 0)
moduleArr[3] = "noDead = document.getElementById('noDead_checkbox').checked;"; // Header code for post-load execution
moduleArr[4] = "var allImgs, thisImg;\n\
allImgs = document.getElementsByTagName('img');\n\
for (var i = 0; i < allImgs.length; i++) {\n\
   thisImg = allImgs[i];\n\
   switch (thisImg.getAttribute('src')) {\n\
      case 'images/noseed.gif':\n\
      case 'images/icon-skull.gif':\n\
         window.kawa_hideTorrentRow(thisImg.parentNode.parentNode);\n\
         break;\n\
   }\n\
}\
";

// Check if the module array exists and create it if it doesn't
if (!window.kawa_asearch_modules)
   window.kawa_asearch_modules = new Array();
if (!window.kawa_asearch_moduleIndex)
   window.window.kawa_asearch_moduleIndex = new Array();

window.kawa_asearch_modules[module_align] = moduleArr;
window.kawa_asearch_moduleIndex.push(module_align);

})();