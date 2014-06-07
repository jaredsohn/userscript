// ==UserScript==
// @name           Topic selection enhancement
// @namespace      http://www.outeverywhere.com
// @description    Simplifies the selection of topics when starting theads
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhoundcom/*
// ==/UserScript==

var TOPIC_SELECT_NAME = "f"


//
// Cross browser compatible method to add events.
//
function addEvent(object, eventType, method, useCapture) {
  if (object.attachEvent) {
    object.attachEvent("on" + eventType, method);
  } else if (object.addEventListener) {
    object.addEventListener(eventType, method, useCapture ? true : false);
  }
}



var selects = document.getElementsByTagName("select");
var select = null;
for (var ii = 0; ii < selects.length; ++ii) {
  if (selects[ii].name == TOPIC_SELECT_NAME) {
    select = selects[ii];
    break;  
  }
}

if (null != select) {

  var optionsArray = [];
  var options = select.options;
  
  var firstSection = "";
   
  var previousSectionName = null;
  
  var sectionNameToOptions = {};
  
  for (var ii = 0; ii < options.length; ++ii) {

    if (!options[ii].disabled) {
    
      var colon = options[ii].text.indexOf(": ");
      var sectionName = options[ii].text.substr(0, colon);
      
      if (!firstSection) {
        firstSection = sectionName;
      }
             
      if (previousSectionName != sectionName) {
        var option =  new Option("--------------------", 0);
        option.disabled = true;
        sectionNameToOptions[sectionName] = [option];      
      }
      
      options[ii].text = options[ii].text.substring(colon + 2);
      sectionNameToOptions[sectionName].push(options[ii]);
         
      previousSectionName = sectionName;   
    }
  }

  //
  // Sort the section names alphabettically
  //
  var nameArray = [];
  for (var sectionName in sectionNameToOptions) {
    nameArray.push(sectionName);
    
    //
    // Sort options
    //
    sectionNameToOptions[sectionName].sort(
      function(a, b) {
        a = a.text.toLowerCase();
        b = b.text.toLowerCase();
        if (a < b){ return -1; }
        if (a > b){ return 1; }
        return 0;      
      }
    );
  }
  
  nameArray.sort();

  
  var sectionSelect = document.createElement("select");
  for (var ii = 0; ii < nameArray.length; ++ii) {
    sectionSelect.options[ii] = new Option(nameArray[ii]);
  }
  select.parentNode.insertBefore(sectionSelect, select);
  
  
  addEvent(sectionSelect, "change", function() {
    var options = sectionNameToOptions[this.value];   
    select.options.length = "";
    for (var ii = 0; ii < options.length; ++ii) {
      select.options[ii] = options[ii];  
    }
    select.selectedIndex = 0;
    return; 
  });
  
  //
  // Jump to initial section
  //
  for (var ii = 0; ii < sectionSelect.options.length; ++ii) {
    if (sectionSelect.options[ii].text == firstSection) {
      sectionSelect.selectedIndex = ii;
      
      if (document.createEvent) {
        var evObj = document.createEvent("HTMLEvents");
        evObj.initEvent("change", true, false );
        sectionSelect.dispatchEvent(evObj);
      }    
      
      break;
    }
  }

  
}