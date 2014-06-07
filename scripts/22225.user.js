// ==UserScript==
// @name          jpopsuki adv. search: size search
// @namespace     http://otterish.co.uk
// @description   allows you to search torrents by size
// @version       0.1
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

// Interface alignment
module_align = 5;

// Category dropdown module span
moduleSpan = document.createElement('span');

var sizeTypes = new Array();
sizeTypes[1] = 'kB';
sizeTypes[2] = 'MB';
sizeTypes[3] = 'GB';

var sizeOps = new Array();
sizeOps[1] = '<=';
sizeOps[2] = '>=';

var sizeSearchInput, sizeSearchLabel, spacer, sizeSearchOpDrop, sizeSearchDrop, newOption;
sizeSearchInput = document.createElement('input');
sizeSearchInput.type = 'text';
sizeSearchInput.id = 'size_text';
sizeSearchInput.name = 'size';
sizeSearchInput.size = 1;
sizeSearchInput.setAttribute('class','input');
sizeSearchLabel = document.createElement('p');
sizeSearchLabel = document.createTextNode("Size ");
spacer = document.createElement('p');
spacer = document.createTextNode(" ");
sizeSearchOpDrop = document.createElement('select');
sizeSearchOpDrop.name = "sizeOp"
sizeSearchOpDrop.id = "sizeOp_dropbox";
sizeSearchOpDrop.setAttribute('class','input');
for (sizeOp in sizeOps) {
   newOption = document.createElement('option');
   newOption.text = sizeOps[sizeOp];
   newOption.value = sizeOp;
   sizeSearchOpDrop.add(newOption, null); // Add it
}
spacer2 = document.createElement('p');
spacer2 = document.createTextNode(" ");
sizeSearchDrop = document.createElement('select');
sizeSearchDrop.name = "sizeType";
sizeSearchDrop.id = "sizeType_dropbox";
sizeSearchDrop.setAttribute('class','input');
for (sizeType in sizeTypes) {
   newOption = document.createElement('option');
   newOption.text = sizeTypes[sizeType];
   if (sizeTypes[sizeType] == 'MB')
      newOption.selected = true;
   sizeSearchDrop.add(newOption, null); // Add it
}
moduleSpan.appendChild(sizeSearchLabel);
moduleSpan.appendChild(sizeSearchOpDrop);
moduleSpan.appendChild(spacer);
moduleSpan.appendChild(sizeSearchInput);
moduleSpan.appendChild(spacer2);
moduleSpan.appendChild(sizeSearchDrop);

// Add the module to the holding array
moduleArr = new Array();
moduleArr[0] = 'sizeSearch'; // Module name
moduleArr[1] = moduleSpan; // Module interface element
moduleArr[2] = 'size'; // Query parameter (must be greater than 0)
moduleArr[3] = "sizeOp_dropbox = document.getElementById('sizeOp_dropbox');\nquery_sizeOp = sizeOp_dropbox.options[sizeOp_dropbox.selectedIndex].value;\nsizeType_dropbox = document.getElementById('sizeType_dropbox');\nquery_sizeType = sizeType_dropbox.options[sizeType_dropbox.selectedIndex].value\nsize = document.getElementById('size_text').value"; // Header code for post-load execution
moduleArr[4] = "var sizeOps = new Array();\n\
sizeOps[1] = '<=';\n\
sizeOps[2] = '>=';\n\
\n\
switch (query_sizeType) { // Convert all the size types into bytes\n\
case 'GB':\n\
   size = size * 1024;\n\
case 'MB':\n\
   size = size * 1024;\n\
case 'kB':\n\
   size = size * 1024;\n\
   break;\n\
}\n\
var thisLink, thisRow, torSize;\n\
for (var i = 0; i < document.links.length; i++) {\n\
   thisLink = document.links[i];\n\
   thisRow = thisLink.parentNode.parentNode;\n\
   if ((thisLink.href.indexOf('page=details&id=') > -1) && (thisLink.text.indexOf('page=details&id=') == -1)) {\n\
      torSize = thisRow.getElementsByTagName('td')[3].innerHTML.split(' ');\n\
      switch (torSize[1]) { // Convert all the size types into bytes\n\
         case 'GB':\n\
            torSize[0] = torSize[0] * 1024;\n\
         case 'MB':\n\
            torSize[0] = torSize[0] * 1024;\n\
         case 'kB':\n\
            torSize[0] = torSize[0] * 1024;\n\
         break;\n\
      }\n\
      eval(\"if ((\"+ torSize[0] + ' ' + sizeOps[query_sizeOp] + ' ' + size +\") != true) {window.kawa_hideTorrentRow(thisRow);}\");\n\
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