// ==UserScript==
// @name           Photo tag inserter
// @namespace      http://www.outeverywhere.com
// @description    Utility for inserting photo tags into text fields
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// ==/UserScript==




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

//
// Cross browser compatible method to add events.
//
function removeEvent(object, eventType, method, useCapture) {
  if (object.detachEvent) {
    object.detachEvent("on" + eventType, method);
  } else if (object.removeEventListener) {
    object.removeEventListener(eventType, method, useCapture ? true : false);
  }
}

//
// Returns next sibling of an object, skipping text nodes.
//
function nextSibling(obj, tagName) {
  elem = obj.nextSibling;
  while (elem && elem.innerHTML == null) {
    elem = elem.nextSibling;
  }
  return elem;
}


//
// insertAtCaret and setCaretTo functions taken from
// http://parentnode.org/javascript/working-with-the-cursor-position/
//
function insertAtCaret(obj, text) {
  var start = null;
  
  if (document.selection) {
    obj.focus();
    var orig = obj.value.replace(/\r\n/g, "\n");
    var range = document.selection.createRange();

    if (range.parentElement() == obj) {
      range.text = text;
    
      var actual = tmp = obj.value.replace(/\r\n/g, "\n");

      for (var diff = 0; diff < orig.length; diff++) {
        if (orig.charAt(diff) != actual.charAt(diff)) {
          break;
        }
      }

      for (var index = 0, start = 0; 
           tmp.match(text) && (tmp = tmp.replace(text, "")) && index <= diff; 
           index = start + text.length) {
           
        start = actual.indexOf(text, index);
        
      }
    }
  } else if (undefined != obj.selectionStart) {
    var start = obj.selectionStart;
    var end = obj.selectionEnd;

    obj.value = obj.value.substring(0, start) +
                text +
                obj.value.substring(end, obj.value.length);
  }
  
  if (start != null) {
    if (!document.all) {
      setCaretTo(obj, start + text.length);
    }
  } else {
    obj.value += text;
  }
  return;
}

//
// Move the caret position within an editable text area
//
function setCaretTo(obj, pos) {
  if (obj.createTextRange) {
    var range = obj.createTextRange();
    range.move('character', pos);
    range.select();
  } else if (undefined != obj.selectionStart) {
    obj.focus();
    obj.setSelectionRange(pos, pos);
  }
  return;
}

 





//
// Event method to insert an image tag into the textarea when the user clicks 
// on a thumbnail in the gallery
//
function insertImage(event) {
  if (!event) {
    event = window.event;
  }
  var target = event.target ? event.target : event.srcElement;
  
  if (target.tagName.toLowerCase() == "img") {
    var imageId = /\/\w([\d]+)\./.exec(target.src)[1];
    
    var textArea = document.getElementById("message");
    insertAtCaret(textArea, "photo:" + imageId + " ");
  }
  return;
}
 

//
// Called when a gallery iframe loads
//
function processGalleryLoad(event) {
  if (!event) {
    event = window.event;
  } 
  
  var iFrame = document.getElementById("galleryIframe");
  var gallery = document.getElementById("photoGallery");
  if (iFrame) {
    gallery.innerHTML = "";
  
    var doc = iFrame.contentDocument;  
    var content = doc.getElementById("content");  
    
    var images = [];
    var imageTags = content.getElementsByTagName("img");
    for (var ii = 0; imageTags && ii < imageTags.length; ++ii) {
      if (imageTags[ii].alt == "photo") {
        images.push(imageTags[ii]);
      }
    }    
    
    for (var ii = 0; ii < images.length; ++ii) {
        gallery.appendChild(images[ii]);
    }
  }

  return;
}
 
 
//
// Called when a user iframe loads
//
function processUserLoad(event) {
  if (!event) {
    event = window.event;
  } 
  
  var iFrame = document.getElementById("galleryIframe");
  if (iFrame) {
  
    var doc = iFrame.contentDocument;  
    var side = doc.getElementById("side");
    _userId = getUserId(side.innerHTML);
    if (_userId) {
      loadFrame("/people/pph.cgi?who=" + _userId, processGalleryLoad);
      document.getElementById("photoGallery").innerHTML = "Loading gallery";
    } else {
      alert("Could not find user");
    }
    
  }

  return;
} 
 
 
 
//
// Loads a url into a hidden iframe
//
var _frameLoadMethod = null;

function loadFrame(src, onloadEvent) {
  var iFrame = document.getElementById("galleryIframe");
  if (!iFrame) {
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("id", "galleryIframe");
    iFrame.width = "0";
    iFrame.height = "0";
    iFrame.style.border = "none";
    iFrame.style.border = "none";
    document.body.appendChild(iFrame); 
  } 
  iFrame.src = src;
  removeEvent(iFrame, "load", _frameLoadMethod)
  addEvent(iFrame, "load", onloadEvent);
  _frameLoadMethod = onloadEvent;
  return;
}
 
 
function loadUser(event) {
  var input = document.getElementById("galleryInput");
  var userName = input.value;
  if (/\w/.test(userName)) {
    loadFrame("/quickfind.cgi?code=" + userName, processUserLoad);    
  } else {
    alert("Please enter a user name to load their gallery");
    input.focus(); 
  }
  if (event.preventDefault) {
    event.preventDefault();
  }
  return false;   
}


 
 
var _defaultMessageWidth = null; 
  
function toggleGallery(event) {
  if (!event) {
    event = window.event;
  } 
 
  var textArea = document.getElementById("message");
  var button = document.getElementById("showGalleryButton");

  var gallery = document.getElementById("photoGallery");
  if (!gallery) {
  
    loadFrame("/people/pph.cgi?who=" + _userId, processGalleryLoad);
    
    gallery = document.createElement("div");
    gallery.id = "photoGallery"
    gallery.innerHTML = "Loading gallery";
    gallery.style.display = "none";
    gallery.style.width = "102px";
    gallery.style.textAlign = "center";
    gallery.style.overflow = "auto";
    gallery.style.border = "1px solid black";
    gallery.style.height = textArea.offsetHeight + "px";
    gallery.style.cursor = "pointer";
    addEvent(gallery, "click", insertImage);
    addEvent(gallery, "mouseup", function() {document.getElementById("message").focus()}); 

    var table = document.createElement("table");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");    
    table.style.display = "block";
    table.style.width = textArea.offsetWidth + "px" ;
    
    _defaultMessageWidth = textArea.offsetWidth;    
    textArea.style.height = textArea.offsetHeight + "px";
    textArea.style.width = (parseInt(_defaultMessageWidth) - 104) + "px";
    
    var row = table.insertRow(0);
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    
    textArea.parentNode.insertBefore(table, textArea);
    c1.appendChild(gallery);
    c2.appendChild(textArea)
    
    
  }
  
  var span = document.getElementById("gallerySpan");

  if (gallery.style.display == "block") {
    gallery.style.display = "none";
    span.style.display = "none";
    button.innerHTML = "Show gallery";
    textArea.style.width = _defaultMessageWidth + "px";
  } else {
    gallery.style.display = "block";
    span.style.display = "inline";
    button.innerHTML = "Hide gallery";
    textArea.style.width = (parseInt(_defaultMessageWidth) - 104) + "px";
  }

  
  if (event.preventDefault) {
    event.preventDefault();
  }
  return false; 
}
 
 
 
//
// Extract the user id from a string
//
function getUserId(str) {
  var id = null;
  var start = str.indexOf("who=");
  if (start >= 0) { 
    var end = str.indexOf("&", start);
    id = str. substring(start + 4, end);
  } 
  return id;
}



var nav = document.getElementById("nav");
var _userId = null;
if (nav) {
  _userId = getUserId(nav.innerHTML);
}
 

  
 
var textArea = document.getElementById("message");

if (textArea && _userId) {

  var node = nextSibling(textArea);
  if (node && node.tagName.toLowerCase() == "br") {
    node.parentNode.removeChild(node);
  }
  textArea.style.display = "block"; 
   
  //
  // Add a button to display the gallery
  //  
  var button = document.createElement("button");
  button.id = "showGalleryButton";
  button.innerHTML = "Show gallery";
  button.title = "Show photo gallery";
  textArea.parentNode.appendChild(button);
  
  var span = document.createElement("span");
  span.id = "gallerySpan";
  span.innerHTML = "&nbsp;&nbsp;Gallery user name: ";
  span.style.display = "none";
  
  var input = document.createElement("input");
  input.type = "text";
  input.id = "galleryInput";
  addEvent(input, "keypress", function(event) {
    if (!event) { 
      event = window.event;
    }
    if (event.keyCode == 13) {
      loadUser(event);
    }
  
    return;
  });
  
  var goButton = document.createElement("button");
  goButton.type = "button";
  goButton.innerHTML = "Go";
  addEvent(goButton, "click", loadUser);
  
  span.appendChild(input);
  span.appendChild(goButton);

  textArea.parentNode.appendChild(span);
  
  addEvent(button, "click", toggleGallery);  
}
 
 