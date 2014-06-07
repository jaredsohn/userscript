// ==UserScript==
// @name          jpopsuki advanced search module loader
// @namespace     http://otterish.co.uk
// @description   standalone module loader
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

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