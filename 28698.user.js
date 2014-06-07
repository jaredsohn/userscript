// ==UserScript==
// @name           MyNYTimes Clean Up Summaries
// @namespace      http://userscripts.org/shervey
// @include        http://my.nytimes.com/*
// ==/UserScript==


/* How many SECONDS before modifying RSS feeds?
  (Best to wait until all are loaded) */
  
window._DELAY = 6;


// Store widget IDs for use in openCloseAll().

window._WIDGET_IDS = new Array();



/* functToStr() converts the function into a single line of Javascript 
  that can be used inside links. This is necessary because links cannot
  call functions created inside Greasemonkey */
  
function functToStr(funct) {
  funct = funct.toString();
  // Get what's inside the function
  var str = funct.slice((funct.indexOf("{") + 1),(funct.length - 1));
  // Make it a single line
  str = str.replace(/(\n)/g,"");
  str = str.replace(/'/g,"$");
  // Replace double quotes with single quotes
  str = str.replace(/"/g,"'");
  // Escape single quotes
  str = str.replace(/\$/g,"\\'");
  return str;
}



// openCloseAll() opens and closes all feed sections

window.openCloseAll = function() {
  // Replace XXX with list from window.toggleIds
  var widgIds = "XXX".split(",");
  var newLinkText = "Close All";
  var currStatus = "closed";
  var toggle;
  var toggleFunct;
  
  if(this.innerHTML.indexOf("Close") > -1) {
    newLinkText = "Open All";
    currStatus = "open";
  }
  
  for(i = 0; i < widgIds.length; i++) {
    toggle = document.getElementById("toggle_" + widgIds[i]);
    if(toggle) {
      // Only open closed sections and vice-versa
      if(toggle.className.indexOf(currStatus) > -1) {
        toggleFunct = "MYTW.widgets['" + widgIds[i] + "'].collapse(document.getElementById('toggle_" + widgIds[i] + "'))";
        eval(toggleFunct);
      }
    }
  }
  // Change link text
  this.innerHTML = newLinkText;
}



// cleanUp() gets rid of what comes after the summary

window.cleanUp = function() {
  var node = document.getElementsByTagName("body")[0];
  var els = node.getElementsByTagName("p");
  var brIndex = "";
  
  for(i = 0; i < els.length; i++) {
    if(els[i].className == "summary") {
      brIndex = els[i].innerHTML.indexOf("<br");
      if(brIndex > 0) {
        els[i].innerHTML = els[i].innerHTML.substr(0,brIndex);
      }
    }
  }
}



// addCloseLinks() adds Close links to the bottom of each feed section

window.addCloseLinks = function() {
  var widgetId;
  var widgetDiv;
  var widgetInnerDivs;
  var contentDiv;
  var toggleDiv;
  var toggleId;
  var getToggleStr;
  var toggleFunct;
  var onClickStr;
  var closeLink;
  
  // Get all divs
  var divs = document.getElementsByTagName("div");
  
  // Loop through divs and identify content divs
  for(i = 0; i < divs.length; i++) {
    if(divs[i].className == "contentHolder") {
      contentDiv = divs[i];
      // Get the widget that contains this content section
      widgetDiv = contentDiv.parentNode;
      // Get the widget ID
      widgetId = widgetDiv.id.match(/w_[0-9]+/);

      if(widgetId && widgetId.length > 0 && widgetDiv.id == widgetId) {
        widgetId = widgetId.toString().replace("w_","");
        
        // Get all the divs inside the widget
        widgetInnerDivs = widgetDiv.getElementsByTagName("div");
        
        // Get the toggle div
        toggleDiv = null;
        for(j = 0; j < widgetInnerDivs.length; j++) {
          if(widgetInnerDivs[j].className.indexOf("toggle") > -1) {
            toggleDiv = widgetInnerDivs[j];
          }
        }
        
        if(toggleDiv) {
          // Give the toggle an ID so that it can be modified
          toggleId = "toggle_" + widgetId;
          toggleDiv.id = toggleId;
          
          // Create the toggle function call for this toggle
          getToggleStr = "document.getElementById('" + toggleId + "')";
          toggleFunct = "MYTW.widgets['" + widgetId + "'].collapse(" + getToggleStr + ")";
          
          // Create the Close link that goes at the bottom of the section
          closeLink = document.createElement("a")
          closeLink.href = "#";
          closeLink.innerHTML = "Close";
          
          // Set the toggle function
          closeLink.setAttribute("onclick",toggleFunct);
          
          // Add the Close link to the bottom of the section
          contentDiv.appendChild(closeLink);
          
          // Save the widgetId for use in openCloseAll()
          window._WIDGET_IDS.push(widgetId);
        }
      }
    }
  }
}



// addContentLinks() add the Clean Up and Open/Close All links

window.addContentLinks = function() {
  // get the ul list that begins with "+ Add Content"
  var addContentUl = document.getElementById('add-content-buttons');
  
  // create Clean Up list item
  var cleanUpLi = document.createElement('li');
  cleanUpLi.innerHTML = " | <a href=\"#\" id=\"\" onClick=\"" + functToStr(window.cleanUp) + "return(false);\">Clean Up</a>";
  
  // create Open/Close All list item
  var openAllLi = document.createElement('li');
  openAllLi.innerHTML = " | <a href='#' onClick=\"" + functToStr(window.openCloseAll).replace("XXX",window._WIDGET_IDS.join(",")) + "return(false);\">Open All</a>";
  
  // add new list items to list
  addContentUl.appendChild(cleanUpLi);
  addContentUl.appendChild(openAllLi);
}



// removeAd() gets rid of the ad in the upper right-hand corner

function removeAd() {
  if(document.getElementById("Middle1")) {
    document.getElementById("Middle1").style.display = "none";
  }
}



// Functions that operate on the fees have to wait until they are loaded

window.callDelayedFunctions = function() {
  window.cleanUp();
  window.addCloseLinks();
  window.addContentLinks();
}



function callFunctions() {
  removeAd();
  setTimeout(window.callDelayedFunctions,(window._DELAY * 1000));
}



window.addEventListener("load",function(){callFunctions()},false);


