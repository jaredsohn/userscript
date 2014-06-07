// ==UserScript==
// @name          Gmail Label Colors
// @namespace     http://persistent.info/greasemonkey
// @description	  Optionally colors label names (when they have a #color suffix)
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// Constants
const LABELS_INDEX = 8;
const RULES = [
  ".ct .colored {-moz-border-radius: 8px; padding: 2px 4px 2px 4px; color: #fff;}"
];

const NO_ESCAPE_START = '<!-- NES -->';
const NO_ESCAPE_END = '<!-- NEE -->';

// All data received from the server goes through the function top.js.P. By
// overriding it (but passing through data we get), we can be informed when
// new sets conversations arrive and update the display accordingly.
try {
  if (unsafeWindow.P && typeof(unsafeWindow.P) == "function") {
    var oldP = unsafeWindow.P;
    
    overrideEscape();

    unsafeWindow.P = function(iframe, data) {
      // Only override if it's a P(iframe, data) signature that we know about
      if (arguments.length == 2) {
        hookData(iframe, data);
      }
      oldP.apply(iframe, arguments);
    }
  }
} catch (error) {
  // ignore;
}

function hookData(iframe, data) {
  var mode = data[0];
  
  switch (mode) {
    // conversation data
    case "t":
      for (var i = 1; i < data.length; i++) {
        var conversationData = data[i];
        var labels = conversationData[LABELS_INDEX];
        
        for (var j = 0; j < labels.length; j++) {
          var info = getLabelColorInfo(labels[j]);
          
          if (!info.color) continue;
          
          labels[j] = 
            NO_ESCAPE_START + 
            '<span style="background: ' + info.color + '" class="colored">' +
              info.name +
            '</span>' +
            NO_ESCAPE_END;
        }
      }
      break;
  }
}

// Label names pass through an escaping function, which means that we can't
// use HTML to color them. We override this function and allow the use of
// markers within it turn off escaping as necessary.
function overrideEscape() {
  // First find the function (most escaping functions invoke the replace method
  // of the string object and have the string "&lt;" in them
  for (var propName in unsafeWindow) {
    var propValue = unsafeWindow[propName];
    
    if (typeof(propValue) != "function") {
      continue;
    }
    
    var functionBody = propValue.toString();
    
    if (functionBody.indexOf("replace") != -1 &&
        functionBody.indexOf("&lt;") != -1) {
           
      unsafeWindow[propName] = getEscapeClosure(propValue);
      break;
    }
  }
}

function getEscapeClosure(oldEscapeFunction) {
  return function(str) {
    var escaped = "";
    var start, end;
    while ((start = str.indexOf(NO_ESCAPE_START)) != -1) {
      escaped += oldEscapeFunction(str.substring(0, start));
      
      start += NO_ESCAPE_START.length;
      end = str.indexOf(NO_ESCAPE_END);
      escaped += str.substring(start, end);
      str = str.substring(end + NO_ESCAPE_END.length);
    }
    escaped += oldEscapeFunction(str);
    
    return escaped;
  }
}


function getLabelColorInfo(rawLabelName) {
  if (rawLabelName.indexOf(" #")) {
    var split = rawLabelName.split(" #");
    return {name: split[0], color: split[1]};
  } else {
    return {name: rawLabelName};
  }
}

if (document.getElementById("tbd")) {
  insertStyles();
}

function insertStyles() {
  var styleNode = document.createElement("style");
  
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }
}

