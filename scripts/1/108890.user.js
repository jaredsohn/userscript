// ==UserScript==
// @name          cacti_graph_manager_helper
// @version       20110705
// @copyright     2011, jhalfmoon
// @description   A helper for the cacti (v0.9.8g) graph management page. Automatically Filters selection lists based on data source name.
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include       http://greasetest*
// @include       https://your-cacti-server-name-here.local//graphs.php?action=graph_edit*
// ==/UserScript==

//=== main code =================================================================

GM_log('Cacti graph manager helper started.')

// Find element containing text "Graph Item Fields" ; this is were the custom filter elements will be placed
var pageOkay = 0
var allRows = document.getElementsByTagName("tr")
for(i=0; i<allRows.length; i++) {
    var mainRow = allRows.item(i)
    if ( mainRow.textContent == "Graph Item Fields" ) {
		  pageOkay=1
		  break
    }
}

// Exit script if 'graph item fields' not found
if (pageOkay == 0) {
    	throw new Error('Script aborted. Reason: Element containing "Graph Item Fields" not found.');
}

// Find the graph title table, if it exists. If it is found and it contains the
// string 'XXX' , that string will be substituted with the global filter contents
// later on.
var titleInputBak = ''
titleRow = document.getElementById('row_title')
if (titleRow !== undefined) {
    titleInput = document.getElementById('title')
    if (titleInput !== undefined && titleInput.value.indexOf('XXX') != -1 ) {
        var titleInputBak = titleInput.value
    }
}

// Walk through all <tr> elements and find all graph item Lists that we want to filter
mainTable = mainRow.parentNode.parentNode
var itemIndex = 0
var itemArray = new Array()
var allTags = mainTable.getElementsByTagName("tr");
for(i=0; i<allTags.length; i++) {
    var item = allTags.item(i)
    if ( item.id.indexOf('row_task_item_id_') != -1 ) {
        // get the first text object and extract the string between brackets [...] , which is the name of the current list item
        var itemName = item.getElementsByTagName("td").item(0).textContent.split('[')[1].split(']')[0]
        // get the first select element, which is the one we are going to filter
        itemList=item.getElementsByTagName("select").item(0)
        // add element to list where we will display the filtered list length
        var counterText = document.createTextNode(itemName)
        itemList.parentNode.insertBefore(counterText, itemList.nextSibling);
        // create a listfilter for the current list
        var itemFilter = new filterlist(itemList)
        // add the current list info in the itemArray for later use
        itemArray[itemIndex] = new Array( itemName , itemList, itemFilter )
        itemIndex++
    }
}

// Setup our custom filter input elements
var globalFilterInTxt       = document.createTextNode('Free-form global filter text')
globalFilterInTxt.width     ='50%'
var globalFilterIn          = document.createElement('input')

var localFilterChkTxt      = document.createTextNode('Enable automatic filtering')
localFilterChkTxt.width    ='50%'
var localFilterChk         = document.createElement('input')
localFilterChk.type        = "checkbox"
localFilterChk.checked     = 1

// add the elements to the page
insertRow(mainTable,1,globalFilterInTxt,globalFilterIn)
insertRow(mainTable,2,localFilterChkTxt,localFilterChk)

// add event listeners
globalFilterIn.addEventListener('change', function () { filterItems(itemArray,0) ; setTitle() }, false)
localFilterChk.addEventListener('change', function () { filterItems(itemArray,0) ; setTitle() }, false)

// do an initial filter of the lists
filterItems(itemArray,1)

//=== functions ==============================================================

// replaces the string 'XXX' in the title with the contents of the global filter input field
function setTitle() {
    if (titleInputBak != '') {                       // only do this if we previously found 'XXX' in the title
        titleInput.value = titleInputBak            // reset the title to the default
        if (globalFilterIn.value == '') {            
            titleInput.value = titleInputBak        // if global filter is clear, then reset the title to the default
        } else {
            titleInput.value = titleInputBak.replace( 'XXX' , globalFilterIn.value )    // if globabal filter is set, then replace 'XXX' in the title with the string in global filter
        }
    }
}

// Walk through an array of lists and filter them
// Only those items containing itemName will remain in each itemList
// parameters:
// itemarray   Expected array format: { itemName , itemList, itemFilter }
// firstRun    When set, it will not filter items that already have a selectindex > 0 ; This is to prevent existing graph settings from being overwritten when open them in graph management  
function filterItems(itemArray,firstRun) {
    // walk through all items we found during the initialisation
    for(i=0; i<itemArray.length; i++) {

        // only filter if firstrun is not set. If it is then only filter is selectedindex > 0.
        if ( ! (firstRun == 1 && itemArray[i][2].selectobj.selectedIndex > 0) ) {
            var filterText = ''
    
            // get item filter text if the localfilter flag is set
            if (localFilterChk.checked) {
                filterText = itemArray[i][0]
            }
    
            // get global filter text if it is set
            if (globalFilterIn.value != '') {
                if (filterText != '') {
                    // combine the global and local filter texts
                    filterText = ( globalFilterIn.value + '.*' + filterText + '|' + filterText + '.*' + globalFilterIn.value )
                } else {
                    filterText = globalFilterIn.value
                }            
            }
    
            // only use the filter if its length is non-zero, else clear the filter
            if (filterText == '') {
                itemArray[i][2].reset()
            } else {
                itemArray[i][2].set(filterText)
            }
    
            // if the filtered list is empty, then do not apply any filtering
            if (itemArray[i][2].selectobj.length == 0) {
                itemArray[i][2].reset(itemArray[i][0])            
            }
            
        }
        // update length counter (which is located next to the list)
        itemArray[i][1].nextSibling.textContent = '   (' + itemArray[i][2].selectobj.length + ")"
    }
}

// add a node with 2 cells into a table and append one item to each cell 
function insertRow(table,index,item1,item2) {
    var row   = table.insertRow(index);
    var cell1 = row.insertCell(-1)
    var cell2 = row.insertCell(-1)
    cell1.appendChild(item1)
    cell2.appendChild(item2)
}

//===libraries ===============================================================

// NOTE:
// It is possible to add the following libraries as external files.
// Use the following syntax to include libraries into Greasemonkey scripts:
// @require        http://greasetest/filterlist.js

/*==================================================*
 $Id: filterlist.js,v 1.3 2003/10/08 17:13:49 pat Exp $
 Copyright 2003 Patrick Fitzgerald
 http://www.barelyfitz.com/webdesign/articles/filterlist/

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *==================================================*/

function filterlist(selectobj) {

  //==================================================
  // PARAMETERS
  //==================================================

  // HTML SELECT object
  // For example, set this to document.myform.myselect
  this.selectobj = selectobj;

  // Flags for regexp matching.
  // "i" = ignore case; "" = do not ignore case
  // You can use the set_ignore_case() method to set this
  this.flags = 'i';

  // Which parts of the select list do you want to match?
  this.match_text = true;
  this.match_value = false;

  // You can set the hook variable to a function that
  // is called whenever the select list is filtered.
  // For example:
  // myfilterlist.hook = function() { }

  // Flag for debug alerts
  // Set to true if you are having problems.
  this.show_debug = false;

  //==================================================
  // METHODS
  //==================================================

  //--------------------------------------------------
  this.init = function() {
    // This method initilizes the object.
    // This method is called automatically when you create the object.
    // You should call this again if you alter the selectobj parameter.

    if (!this.selectobj) return this.debug('selectobj not defined');
    if (!this.selectobj.options) return this.debug('selectobj.options not defined');

    // Make a copy of the select list options array
    this.optionscopy = new Array();
    if (this.selectobj && this.selectobj.options) {
      for (var i=0; i < this.selectobj.options.length; i++) {

        // Create a new Option
        this.optionscopy[i] = new Option();

        // Set the text for the Option
        this.optionscopy[i].text = selectobj.options[i].text;

        // Set the value for the Option.
        // If the value wasn't set in the original select list,
        // then use the text.
        if (selectobj.options[i].value) {
          this.optionscopy[i].value = selectobj.options[i].value;
        } else {
          this.optionscopy[i].value = selectobj.options[i].text;
        }

      }
    }
  }

  //--------------------------------------------------
  this.reset = function() {
    // This method resets the select list to the original state.
    // It also unselects all of the options.

    this.set('');
  }


  //--------------------------------------------------
  this.set = function(pattern) {
    // This method removes all of the options from the select list,
    // then adds only the options that match the pattern regexp.
    // It also unselects all of the options.

    var loop=0, index=0, regexp, e;

    if (!this.selectobj) return this.debug('selectobj not defined');
    if (!this.selectobj.options) return this.debug('selectobj.options not defined');

    // Clear the select list so nothing is displayed
    this.selectobj.options.length = 0;

    // Set up the regular expression.
    // If there is an error in the regexp,
    // then return without selecting any items.
    try {

      // Initialize the regexp
      regexp = new RegExp(pattern, this.flags);

    } catch(e) {

      // There was an error creating the regexp.

      // If the user specified a function hook,
      // call it now, then return
      if (typeof this.hook == 'function') {
        this.hook();
      }

      return;
    }

    // Loop through the entire select list and
    // add the matching items to the select list
    for (loop=0; loop < this.optionscopy.length; loop++) {

      // This is the option that we're currently testing
      var option = this.optionscopy[loop];

      // Check if we have a match
      if ((this.match_text && regexp.test(option.text)) ||
          (this.match_value && regexp.test(option.value))) {

        // We have a match, so add this option to the select list
        // and increment the index

        this.selectobj.options[index++] =
          new Option(option.text, option.value, false);

      }
    }

    // If the user specified a function hook,
    // call it now
    if (typeof this.hook == 'function') {
      this.hook();
    }

  }


  //--------------------------------------------------
  this.set_ignore_case = function(value) {
    // This method sets the regexp flags.
    // If value is true, sets the flags to "i".
    // If value is false, sets the flags to "".

    if (value) {
      this.flags = 'i';
    } else {
      this.flags = '';
    }
  }


  //--------------------------------------------------
  this.debug = function(msg) {
    if (this.show_debug) {
      alert('FilterList: ' + msg);
    }
  }


  //==================================================
  // Initialize the object
  //==================================================
  this.init();

}

// EOF =======================================================================

