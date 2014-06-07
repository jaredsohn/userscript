// ==UserScript==
// @name           Out forum enhancements
// @namespace      http://www.outeverywhere.com
// @description    Adds extra functionality to the Out forums
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// ==/UserScript==

//
// Add a trim function to the String object
//
String.prototype.trim = function(){ 
  return this.replace(/^\s+|\s+$/g, "") 
}


//
//  Add getElementsByClassName method to the document object
//
//  tagName paremter is option.  If null or omitted, all tags
//  are returned
//
document.getElementsByClassName = function(clsName, tagName) {
  var retVal = new Array();
  var elements = document.getElementsByTagName(tagName ? tagName : "*");
  for (var i = 0; i < elements.length; ++i){
    if (elements[i].className.indexOf(" ") >= 0) {
      var classes = elements[i].className.split(" ");
      for (var j = 0; j < classes.length; ++j) {
      if (classes[j] == clsName)
         retVal.push(elements[i]);
      }
    } else if(elements[i].className == clsName) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}



//
// Focus on the text area
//
function focusOnMessage() {

  //
  // The only way I've found to focus on the text area after a user clicks 
  // quote is to use the mouseup and mouseout events.  The mouseout event
  // should only focus immediately after the user has clicked quote.  The
  // needsFocus boolean is used to ignore extraneous mouseout events.
  //
  // The browser behaviour regards focusing in this particular instance is 
  // quite bizarre.
  //
  if (window.needsFocus) {
    document.getElementById("message").focus();
    window.needsFocus = false;
  }
  return;
}


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
// Returns the object containing the selected range.
//
function getRangeNode() {

  var node = null;
  if (window.getSelection) {
    node = window.getSelection().anchorNode;
  } else if (document.selection) {
    var range = document.selection.createRange();
    if (range) {
      node = range.parentElement(); 
    }
  }
  return node;
}

//
// Prevent the default action associated with an element from taking place
//
function preventDefault(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  return false;
}

//
// Return text selected by the user.  Text is trimmed.
//
function getSelectedText(obj) {
  var text = "";
  if (document.selection) {
    var range = document.selection.createRange();
    text = range.text;
  } else if (obj && undefined != obj.selectionStart) {
    var start = obj.selectionStart;
    var end = obj.selectionEnd;
    text = obj.value.substring(start, end); 
  } else if (window.getSelection) {
    text = window.getSelection();
  }
  return text;
}


//
// Clear text selected within the specified text area
//
function clearSelectedText(obj) {
  if (document.selection) {
    var range = document.selection.createRange();    
    if (range.parentElement() == obj) {
      range.text = "";
    }
  } else if (undefined != obj.selectionStart) {
    var start = obj.selectionStart;
    var end   = obj.selectionEnd;
	  var text = obj.value.substring(start, end);
	  var startText = obj.value.substring(0, start);
	  var endText = obj.value.substring(end, obj.value.length);
	  if (text.length > 0) {
      obj.value = startText + endText;  
	  }
    setCaretTo(obj, start, start);
  }
  return;
}




//
// Replace text selected by the user with the specified text.
//
function replaceSelectedText(obj, newText) {
  clearSelectedText(obj);
  insertAtCaret(obj, newText);
  return;
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
    var scrollHeight = obj.scrollHeight;
    var scrollTop = obj.scrollTop;
    
    var start = obj.selectionStart;
    var end = obj.selectionEnd;

    obj.value = obj.value.substring(0, start) +
                text +
                obj.value.substring(end, obj.value.length);
             
    //
    // Retain scroll position in firefox
    // 
    if (scrollTop) {
      obj.scrollTop = scrollTop + (obj.scrollHeight - scrollHeight);
    }
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




function setSelectionRange(textArea, start, end) {
	if (textArea.setSelectionRange) {
		textArea.setSelectionRange(start, end);
	} else if (document.selection && document.selection.createRange) {
	  textArea.focus();
	  var cursorStart = getCaretPosition(textArea);
		var range = document.selection.createRange();
		
		//
		// Cursor positioning in IE is relative not absolute hence the offset
		//
		range.moveStart("character", cursorStart - start);
		range.moveEnd("character", cursorStart - end);

	}

  return;
}




//
// Need to test this:
//
function getCaretPosition(input) {
	var result = { start: 0, end: 0 };
	if (input.setSelectionRange) {
		result.start = input.selectionStart;
		result.end = input.selectionEnd;
	} else if (document.selection && document.selection.createRange) {
		var range = document.selection.createRange();
		var r2 = range.duplicate();
		result.start = 0 - r2.moveStart('character', -100000);
		result.end = result.start + range.text.length;
	}
	return result;
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
// Process a click on the quote button in a forum post.
// 
function quoteSelectedText(event) {

  if (!event) {
    event = window.event;
  }
   
  var textArea = document.getElementById("message");
  var selectedText = getSelectedText();
    
  if (("" + selectedText).length > 0 && textArea) {
   
    //
    // Get the user id
    //
    var userId = null;
    var node = getRangeNode();
    for (post = node; post && post.className != "forumpost"; post = post.parentNode);
    if (post) {
      var postTop = post.getElementsByTagName("div")[0];
      var start = postTop.innerHTML.lastIndexOf("(") + 1;
      var end = postTop.innerHTML.lastIndexOf(")");
      userId = postTop.innerHTML.substring(start, end);
    }
                      
    insertAtCaret(
      textArea, 
      "(" + fixText(selectedText) + ")q" + (userId ? ":" + userId : "") + "\n\n"
    );
    window.needsFocus = true;
  } else {
    alert("Please select some text to quote first");
  }
  
  return preventDefault();
}




//
// Wrap the selected text in Out's italics notation
//
function italiciseText() {
  var textArea = document.getElementById("message");
  var text = getSelectedText(textArea);
  replaceSelectedText(
    textArea, 
    "(" + fixText(text) + ")i"
  );
   window.needsFocus = true;
  return;
}


//
// Wrap the selected text in Out's quotation notation
//
function quoteText() {
  var textArea = document.getElementById("message");
  var text = getSelectedText(textArea);
  replaceSelectedText(
    textArea, 
    "(" + fixText(text) + ")q"
  );
  window.needsFocus = true;
  return;
}


//
// Insert a bullet point character
//
function insertBullet() {
  insertAtCaret(
    document.getElementById("message"), 
    document.getElementById("bulletButton").innerHTML + " "
  );
  window.needsFocus = true;
  return;
}


//
// Return the preceeding position of the specified character.  Only scans
// back as far as the first instance of a newline character
//
function getPreceedingPosition(text, chr, startPosition) {
  var pos = -1
	for (var ii = startPosition ; ii >= 0; --ii) {
		var testChr = textArea.value.charAt(ii);
	  if (testChr == chr) {
			pos = ii;
			break;	
		} else if (testChr == "\n") {
			break;
		}
	}  
  return pos;
}


// 123\n cursorStart-1 = "3"

//
// Insert double slashes and bullet points when the user hits enter if 
// the bullet point button is active.
//
function processEnter(event) {
  event = event ? event : window.event;
  //
  // Only process when the enter key is pressed
  //
  var returnVal = true;
  if (event.keyCode == 13 || event.charCode == 13) {
     
		var textArea = document.getElementById("message");
		var text = textArea.value;
		
		var cursorStart = getCaretPosition(textArea).start;		
		var bullet = document.getElementById("bulletButton").innerHTML.charAt(0);
		var bulletPos = getPreceedingPosition(text, bullet, cursorStart - 1);
				
		if (bulletPos == 0 || 
		   (bulletPos > 0 && text.charAt(bulletPos - 1) == "\n" )) {

      var testString = text.substring(bulletPos + 1, cursorStart);
      if (/\w/.test(testString)) {
				insertAtCaret(textArea, "\n" + bullet + " "); 
				preventDefault(event);
				returnValue = false;
      } else {
				setSelectionRange(textArea, bulletPos, cursorStart);
				clearSelectedText(textArea);
				setCaretTo(textArea, cursorStart - testString.length - 1);   
		  }
		  cursorStart = getCaretPosition(textArea).start;		
			setSelectionRange(textArea, cursorStart, cursorStart);
			
    } else {


			var newlinePos = getPreceedingPosition(text, "\n", cursorStart - 1);
    
      //
      // Get the position of the first period following the newline;
      //
			var bracePos = 0;
			for (var ii = newlinePos; ii < text.length; ++ii) {
			  if (text.charAt(ii) == ".") {
			    bracePos = ii;
			    break;
			  }
			}
				
			if (bracePos >= 0) {
	
				var listStr = text.substring(newlinePos + 1, bracePos);
				var listInt = parseInt(listStr);

				if (!isNaN(listInt) && listStr.length == (listInt + "").length) {
				
					var testString = text.substring(bracePos + 1, cursorStart);
					if (/\w/.test(testString)) {
						insertAtCaret(textArea, "\n" + (listInt + 1) + ". "); 
						preventDefault(event);
						returnValue = false;
					} else {
						setSelectionRange(textArea, newlinePos + 1, cursorStart);
						clearSelectedText(textArea);
						setCaretTo(textArea, cursorStart - testString.length - 2);   
					}
					cursorStart = getCaretPosition(textArea).start;		
					setSelectionRange(textArea, cursorStart, cursorStart);      
				
				}
				
			}	
    }
  }  

	return returnVal;
}




//
// Fix mismatched parenthesis
//
function fixText(text) {
  //
  // Fix mismatched open and close brackets
  //
  try {
    var text = "" + text;
    var openCount = text.split("(").length;
    var closeCount = text.split(")").length;
      
    if (closeCount != openCount) {  
      text = text.replace(/\(/g, "[");
      text = text.replace(/\)/g, "]");
    }
      
  } catch (e) {};
  
  return text;
}






var textArea = document.getElementById("message");  
if (textArea) {

  //
  // Add bullet point processing
  //
  addEvent(textArea, "keypress", processEnter); 


  //
  // Create a italicise option
  //
  var addQuote = true;
  var button = document.getElementById("setph");
  if (false && !button) {
    //
    // For inbox
    //
    addQuote = false;
  }
  
  //
  // Fix new lines on posting
  //
  var node = textArea;
  for (; node; node = node.parentNode) {
    if (node.tagName.toLowerCase() == "form") {
      break;
    }
  }  
   
  textArea.parentNode.appendChild(document.createElement("br"));
  var italicise = document.createElement("button");
  italicise.innerHTML = "i";
  italicise.title = "Italicise selected text";
  textArea.parentNode.appendChild(italicise);
  addEvent(italicise, "mousedown", italiciseText); 
  addEvent(italicise, "click", preventDefault); 
  addEvent(italicise, "mouseup", focusOnMessage); 
    
  //
  // Add a button for quotes too
  //  
  var quote = document.createElement("button");
  quote.innerHTML = "q";
  quote.title = "Quote selected text";
  textArea.parentNode.appendChild(quote);
  addEvent(quote, "mousedown", quoteText); 
  addEvent(quote, "click", preventDefault);  
  addEvent(quote, "mouseup", focusOnMessage); 
   
  //
  // Add a button for the bullet point inserter too
  //  
  var bullet = document.createElement("button");
  bullet.id = "bulletButton";
  bullet.innerHTML = "&#149;";
  bullet.title = "Insert Bullets";
  textArea.parentNode.appendChild(bullet);
  addEvent(bullet, "mousedown", insertBullet); 
  addEvent(bullet, "click", preventDefault);  
  addEvent(bullet, "mouseup", focusOnMessage); 
  
  if (addQuote) {
    var buttonBlocks = document.getElementsByClassName("postbot", "div");
    
    //
    // If postbot doesn't exist, create it.  This likely indicates the postbox 
    // being displayed rather than a forum thread.
    //
    if (0 == buttonBlocks.length) {
      var buttonBlocks = document.getElementsByClassName("postmid", "div");
      if (1 == buttonBlocks.length) {
        var postmid = buttonBlocks[0];
        var div = document.createElement("div");
        div.className = "postbot links";
        var buttonBlocks = [div];
        postmid.parentNode.insertBefore(div, postmid.nextSibling);        
      }
    
    }
    
    //
    // Create and insert the quote button elements.
    //
    for (var ii = 0; ii < buttonBlocks.length; ++ii) {
      var quote = document.createElement("a");
      quote.innerHTML = "quote";
      quote.title = "Quote selected text";
      addEvent(quote, "mousedown", quoteSelectedText); 
      addEvent(quote, "click", preventDefault); 
      addEvent(quote, "mouseup", focusOnMessage); 
      addEvent(quote, "mouseout", focusOnMessage); 
      
      if (!buttonBlocks[ii].firstChild) {
        buttonBlocks[ii].appendChild(quote);
      } else {
        var spacer = document.createTextNode(" ");
        buttonBlocks[ii].insertBefore(spacer, buttonBlocks[ii].firstChild);
        buttonBlocks[ii].insertBefore(quote, buttonBlocks[ii].firstChild);
      }  
    
    }
  }
}
 

 
 
