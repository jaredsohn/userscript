// ==UserScript==
// @name          jpopsuki adv. search: category search
// @namespace     http://otterish.co.uk
// @description   allows category-specific searches
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

// Interface alignment
module_align = 0;

// Create module span
moduleSpan = document.createElement('span');

// Specify the dropdown entries with their respective category IDs
var searchCategories = new Array();

searchCategories[0] = "All Categories";
searchCategories[1] = "MP3 Single";
searchCategories[2] = "MP3 Album";
searchCategories[3] = "TV-Music";
searchCategories[4] = "TV-Variety";
searchCategories[5] = "TV-Drama";
searchCategories[8] = "PV";
searchCategories[9] = "DVD";
searchCategories[10] = "Kioku";
searchCategories[11] = "Fansubs";
searchCategories[13] = "Pictures";
searchCategories[14] = "Misc";

var dropBox;
dropBox = document.createElement('select'); // Create the dropdown
dropBox.name = "searchCat";
dropBox.id = 'searchCat_dropbox';
dropBox.setAttribute('class','input');
for (searchCategory in searchCategories) { // Assign the search categories as dropdown entries
   newOption = document.createElement('option'); // Create the dropdown entry
   newOption.text = searchCategories[searchCategory];
   newOption.value = searchCategory;
   dropBox.add(newOption, null); // Add it
}

moduleSpan.appendChild(dropBox);
moduleSpan.id = 'asearch_module';

// Add the module to the holding array
moduleArr = new Array();
moduleArr[0] = 'asearch'; // Module name
moduleArr[1] = moduleSpan; // Module interface element
moduleArr[2] = 'searchCat'; // Query parameter (must be greater than 0)
moduleArr[3] = "searchCat_dropbox = document.getElementById('searchCat_dropbox');\nsearchCat = searchCat_dropbox.options[searchCat_dropbox.selectedIndex].value;"; // Header code for post-load execution
moduleArr[4] = "var thisLink;\n\
for (var i = 0; i < document.links.length; i++) {\n\
   thisLink = document.links[i];\n\
   // Hide their grandparent node if they are a category link that doesn't match the search category\n\
   if ( (thisLink.href.indexOf('page=browse&filter_cat=') > -1) && (thisLink.href.substr(thisLink.href.lastIndexOf('=') + 1) != searchCat) )\n\
      window.kawa_hideTorrentRow(thisLink.parentNode.parentNode);\n\
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