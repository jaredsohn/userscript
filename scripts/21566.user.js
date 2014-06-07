// ==UserScript==
// @name           Google Time Search (MODIFIED)
// @description    Adds time range combo to the Google search page
// @include        http*://www.google.*
// ==/UserScript==

var as_qdr = document.getElementsByName('as_qdr');

if (as_qdr.length == 0) {
  myButtons = document.getElementsByName('btnG');	
  if (myButtons.length > 0) {
	var googleButton = myButtons[0];
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
    //AddOption("past year", "m6", 7);
    AddOption("past year", "y", 7);
    
    dateRangeSelect.value = GM_getValue("GM_as_qdr", "all");
	googleButton.parentNode.insertBefore(dateRangeSelect, googleButton);
	dateRangeSelect.selectedIndex = 0;
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
