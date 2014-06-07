// ==UserScript==
// @name          jpopsuki advanced search script
// @namespace     http://otterish.co.uk
// @description   A script that completely replaces the 'advanced search' placeholder on the jpopsuki tracker. It allows for searching with criteria and filtering of torrent pages. (version 0.4)
// @version       0.4
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

// -- Changelog --
//
// Version 0.2:  To be honest, I didn't ever think the script would be so popular (28 page visits! O.O). Many thanks to all you peeps who've helped me test it and given support, especially |dk|, JKing and everyone else in the IRC channel who's helped out ^___^
//               This version gets rid of the anchor problem, removes XPath dependancies and makes the code a fair bit cleaner (and hopefully faster)
//
// Version 0.3:  Added three new features - 'ignore dead torrents', 'search titles only' and 'remove highlights', also added 'all categories' option to category list
//               Changed to modular system
//               Minor changes: Gave the advanced search dropdown the same style attributes as the other dropdowns, added search parameter cleaning so there's no longer any slashes in the search input or table title
//               Many thanks to k3ph for his endless help with debugging this release, I couldn'tve done it without you ^_^ and also of course to all the peeps in the IRC chan for putting up with his talk of consuming babies (to his credit, it's actually a codename for something XD)
//
// Version 0.4:  Changed module system to allow for post-pageload parsing
//               Unified query string parsing and torrent row removal
//               Minor Changes: Removed redundant code for spacer generation

// BUILD 0.3 - don't play with matches

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






window.kawa_hideTorrentRow = function(row) {
   if (!window.kawa_hiddenTorrentRows)
      window.kawa_hiddenTorrentRows = new Array();
   row.style.display = 'none';
   window.kawa_hiddenTorrentRows.push(row);
};

// Add page load event to load all modules and process them
window.addEventListener(
    'load',
function() {
   if (window.kawa_asearch_modules) {

      var query_search;
      // Query parser
      queryParts = document.location.search.substr(1).split('&');
      for (i in queryParts) {
         queryPart = queryParts[i].split('=');
         eval("var query_"+queryPart[0]+" = '"+queryPart[1]+"'"); // Assign the query parameters to variables
      }

      // Locate the advanced search interface element
      var ssearch, asearch, module, formButton, dropBox;
      ssearch = document.getElementById('ssearch'); // Locate the simple search element
      asearch = document.getElementById('asearch'); // Locate the advanced search element
      asearch.innerHTML = ssearch.innerHTML; // Replace its contents
      if (query_search != null) {
         search = unescape(query_search.replace(/\+/g,  " "));
         ssearch.getElementsByTagName('input')[1].value = search;
         asearch.getElementsByTagName('input')[1].value = search;
         document.getElementsByTagName('th')[1].innerHTML = 'Search results for "'+ search +'"';
      }
      formButton = asearch.getElementsByTagName('input')[2]; // Find the search button
      if (formButton) { // If the form button is there
         formButtonParent = formButton.parentNode;
         formButton.type = 'button';
         formButton.addEventListener('click', function() { // Assign new onClick event to the search button
            if (asearch.getElementsByTagName('input')[1].value == query_search || asearch.getElementsByTagName('input')[1].value == false) {
               // Restore all torrent rows
               for (i in window.kawa_hiddenTorrentRows) {
                  window.kawa_hiddenTorrentRows[i].style.display = '';
               }
               window.kawa_hiddenTorrentRows = new Array();

               // Run the code of selected modules
               function sortNumber(a, b) {return a - b} // This allows us to sort the module index numbers numerically
               window.kawa_asearch_moduleIndex.sort(sortNumber); // Sort the module index array
               for (i in window.kawa_asearch_moduleIndex) { // For each index in the array
                  module = window.kawa_asearch_modules[window.kawa_asearch_moduleIndex[i]]; // Load the corresponding module

                  // Check its query parameter and see if it should be run
                  eval(module[3] + "\n\nif ("+module[2]+" > 0) {\n"+module[4]+"\n}");
               }
            }
            else
               asearch.getElementsByTagName('form')[0].submit();
         }, true);
         function sortNumber(a, b) {return a - b} // This allows us to sort the module index numbers numerically
         window.kawa_asearch_moduleIndex.sort(sortNumber); // Sort the module index array
         for (i in window.kawa_asearch_moduleIndex) { // For each index in the array
            module = window.kawa_asearch_modules[window.kawa_asearch_moduleIndex[i]]; // Load the corresponding module

            // Add the module's interface element to the advanced search interface
            module[1].setAttribute('class','asearch_module');
            module[1].id = module[0] + '_module';
            formButtonParent.insertBefore(module[1], formButton); // Add the interface element
            formButtonParent.insertBefore(document.createTextNode(" "), formButton); // Add a trailing spacer, thanks to k3ph for this

            // Check if its query parameter is greater than zero and run it if it is
            eval("var query_"+module[2]+";\n\n if (query_"+module[2]+" > 0) {\n"+module[2]+" = query_"+module[2]+";\n\n"+module[4]+"\n}");
         }
      }
   }
},
true);

})();