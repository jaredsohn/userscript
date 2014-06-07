// ==UserScript==
// @name           Google Time Search
// @namespace      erlichmen.googlepages.com
// @description    Adds time range combo to the Google search page
// @include        http*://www.google.*
// @version        1.1
// ==/UserScript==

var as_qdr = document.getElementsByName('as_qdr');

if (as_qdr.length == 0) {
  queryBoxes = document.getElementsByName('q');
  if (queryBoxes.length > 0) {
    var queryBox = queryBoxes[0];
    GM_log(queryBox.length);
    var dateRangeSelect=document.createElement("SELECT");
    dateRangeSelect.setAttribute("type","SELECT");
    dateRangeSelect.setAttribute("name","as_qdr");
    
    AddOption("anytime", "all", 0);
    AddOption("past 24 hours", "d", 1);
    AddOption("past week", "w", 2);
    AddOption("past month", "m", 3);
    AddOption("past 2 months", "m2", 4);
    AddOption("past 3 months", "m3", 5);
    AddOption("past 6 months", "m6", 6);
    AddOption("past year", "m6", 7);
    
    dateRangeSelect.value = GM_getValue("GM_as_qdr", "all");
      
    var wholeCell=queryBox.parentNode;
    wholeCell.appendChild(dateRangeSelect);  
  }
  else {
    GM_log("q was not found");
  }
}

function AddOption(text, value, index) {
  var opt = document.createElement("OPTION");
  opt.value = value;
  opt.text = text;
  dateRangeSelect.options.add(opt, index);    
}

function newSubmit(event) {  
    var as_qdr = document.getElementsByName('as_qdr');

    if (as_qdr.length > 0) {
      var dateRangeSelect;
      
      for (var i = 0; i < as_qdr.length; i++) {
          if (as_qdr[i].type == "select-one")
          {
            dateRangeSelect = as_qdr[i];
            GM_setValue("GM_as_qdr", dateRangeSelect.value);
          }          
      }
      
      for (var i = 0; i < as_qdr.length; i++) {
            as_qdr[i].value = dateRangeSelect.value;
      }      
    }
}

// capture the onsubmit event on all forms
window.addEventListener('submit', newSubmit, true);
