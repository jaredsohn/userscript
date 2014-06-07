// ==UserScript==
// @name           Inline Out
// @namespace      http://www.outeverywhere.com
// @description    Displays desktop out functionality in the left hand column of the main website
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// @include        http://tools.outeverywhere.com/*
// @include        http://tools.journalhound.com/*
// @exclude        http://www.outeverywhere.com/goodbye.cgi*
// @exclude        http://tools.outeverywhere.com/goodbye.cgi*
// ==/UserScript==

var REFRESH_PERIOD = 120000;

var RIGHT_ARROW = new Image();
RIGHT_ARROW.src = "/g/t/triup-brushed.gif";
var DOWN_ARROW = new Image();
DOWN_ARROW.src = "/g/t/tridown-brushed.gif";

//
// Cross browser compatible method to add events.
//
function addEvent(object, eventType, method, useCapture) {
  if (object.attachEvent) {
    object.attachEvent("on" + eventType, method);
  } else if (object.addEventListener) {
    object.addEventListener(eventType, method, useCapture ? true : false);
  }
  return;
}


//
// Returns next sibling of an object, skipping text nodes.
//
function nextSibling(obj) {
  elem = obj.nextSibling;
  while (elem && elem.innerHTML == null) {
    elem = elem.nextSibling;
  }
  return elem;
}


//
// Toggle the visibility of the subject when clicked.
//
function toggleVisibility(event) {
  if (!event) {
    event = event.target;
  }
  
  var image = event.target ? event.target : event.srcElement;
  
  if (image.tagName.toLowerCase() == "img") {
  
    var anchor = image.parentNode;
      
    var contents = anchor.parentNode.getElementsByTagName("table")[0];
    if (contents) {
      if (image.src == RIGHT_ARROW.src) {
        //
        // Make contents visible
        //
        contents.style.display = "block";
        image.src = DOWN_ARROW.src;
        GM_setValue((anchor.parentNode.id + "Visibility").replace(/\s+/g, ""),  "block"); 
        
      } else {
        //
        // Hide contents
        //
        contents.style.display = "none";
        image.src = RIGHT_ARROW.src;
        GM_setValue((anchor.parentNode.id + "Visibility").replace(/\s+/g, ""), "");
    
      }
    }
    
    //
    // Update the stored date to reflect the changes
    //
    var ul = document.createElement("ul");
    var nodes = side.getElementsByTagName("li") ;
    for (var ii = 0; ii < nodes.length; ++ii) {
      if (nodes[ii].className = "inlineOut") {
        ul.appendChild(nodes[ii].cloneNode(true));
      }
    }
    GM_setValue("inlineOutData", ul.innerHTML);

  } 
  
  return;
}


function reloadInlineOut() {

  var frame = document.getElementById("inlineOutIframe");
  if (frame) {
    frame.contentDocument.location.reload()
  } else {
    makeFrame();
  } 
}


function makeFrame() {
  //
  // Create a the hidden iframe in which desktop out is loaded, only if 
  // the data has expired, or it's not present
  //
  var userId = document.links[1].href.split("=")[1];
  var iFrame = document.createElement("iframe");
  iFrame.setAttribute("id", "desktopIframe");
  iFrame.id = "inlineOutIframe";
  iFrame.src = "/desktop.cgi?u=" + userId;
  iFrame.width = "0";
  iFrame.height = "0";
  iFrame.style.border = "none";
  document.body.appendChild(iFrame);  
  return;
}



var menu = document.getElementById("menu");
var side = document.getElementById("side");

if (menu || side) {


  //
  // Create side if it's not present 
  //
  if (!side) {
    var side = document.createElement("ul");
    side.id = "side";
    if (menu.hasChildNodes()) {
      menu.insertBefore(side, menu.firstChild);
    } else {
      menu.appendChild(side);  
    }
    
  } 
  
  //
  // Add event handling to show and hide contents when the arrow is
  // clicked
  //
  addEvent(side, "click", toggleVisibility);
  addEvent(side, "dblclick", reloadInlineOut);
  
  var lastUpdate = parseInt(GM_getValue("inlineOutLastUpdate"));
  var data = GM_getValue("inlineOutData");
  var now = new Date();
  
  var timeSinceRefresh = now.getTime() - lastUpdate;
    
  if (!data || timeSinceRefresh > REFRESH_PERIOD) {
    makeFrame();
  } else {
    window.setTimeout(makeFrame, REFRESH_PERIOD - timeSinceRefresh);
  }
    
  if (data) {
    side.innerHTML += data;
  }

} else if (document.title = "Desktop OUT") {

  var parentDoc = window.parent.document;
  var inlineOut = parentDoc.getElementById("side"); 
  
  if (inlineOut) {
    //
    // Remove existing nodes before updating.
    //
    var nodes = inlineOut.getElementsByTagName("li") ;
    var deleteNodes = [];
    for (var kk = 0; kk < nodes.length; ++kk) {
      if (nodes[kk].className == "inlineOut") {
        deleteNodes.push(nodes[kk]);
      }
    }
    for (var kk = 0; kk < deleteNodes.length; ++kk) {
      deleteNodes[kk].parentNode.removeChild(deleteNodes[kk]);
    } 
    
    
    //
    // Desktop out is loaded in an iframe.  Extract the content from the html and 
    // display it in the parent window
    //
    var headers = document.getElementsByTagName("h2");
    var addedCount = 0;

    //
    // Create a holder for the html elements.  This isn't displayed on the 
    // page itself, but it's inner html is used to append the data.
    //  
    var container = document.createElement("ul");
      
    for (var ii = 0; ii < headers.length; ++ii) {     

      var sibling = nextSibling(headers[ii]);  
      
      //
      // Skip over the new message effect.
      //
      if (sibling && sibling.id == "pulsatet") {
        sibling = nextSibling(sibling);
      }
      
      if (sibling && sibling.tagName != "h2") {
        
        ++addedCount;
        
        var rowLength = 0;
        if (sibling.tagName == "table") {
          rowLength = sibling.getElementsByTagName("tr").length - 1;
        } else if (sibling.tagName == "ul") {
          rowLength =  sibling.getElementsByTagName("li").length;
        }

        var tag = headers[ii].getElementsByTagName("a")[0];
        tag.parentNode.removeChild(tag);
        
        var id = headers[ii].innerHTML;
        
        var li = document.createElement("li");
        li.className = "inlineOut";
        li.id = id;

        var anchor = parentDoc.createElement("a");
        anchor.innerHTML = rowLength + " " + headers[ii].innerHTML;

        //
        // width hack for narrow display on classic stylesheet 
        //
        li.style.minWidth = "150px";
        li.appendChild(anchor);
        
        container.appendChild(li);  
        
        var displayState = GM_getValue((li.id + "Visibility").replace(/\s+/g,''));
        var image = parentDoc.createElement("img");
        image.src = displayState ? DOWN_ARROW.src : RIGHT_ARROW.src;
        image.align = "absmiddle";
        image.style.marginRight = "5px";
        if (rowLength == 0) {
          image.style.visibility = "hidden";
        }
        
        anchor.insertBefore(image, anchor.firstChild);

                          
        //
        // Insert the data 
        //
        if (rowLength > 0) {
          var element;
          if (sibling.tagName == "table") {
            element = parentDoc.createElement(sibling.tagName);
            element.innerHTML = sibling.innerHTML;  
          } else if (sibling.tagName == "ul") { 
            // 
            // Nested lists don't display nicely.  Put into a table for 
            // the moment
            // 
            var element = parentDoc.createElement("table");
            var rows = sibling.getElementsByTagName("li");
            for (var jj = 0; jj < rows.length; ++jj) {
              var td = element.insertRow(jj).insertCell(0);
              td.innerHTML = rows[jj].innerHTML;
            }

          }
          
          if (element) {
            //
            // Hide contents by default
            //
            element.style.display = "none";
            element.style.marginLeft = "3px";
            li.appendChild(element);
            if (displayState) {
              element.style.display = displayState;
            }
          };   
        }
      }
    }
    
    inlineOut.innerHTML += container.innerHTML;

    
    if (0 == addedCount) {
      var li = parentDoc.createElement("li"); 
      li.innerHTML = "Please open Desktop Out and make sure that some tabs are open.";
      inlineOut.appendChild(li);
      
    } else {
      var now = new Date();
      GM_setValue("inlineOutLastUpdate", "" + now.getTime());     
      GM_setValue("inlineOutData", container.innerHTML);
    }
  }
}

window._pageLoaded = true;