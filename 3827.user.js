/*
Google Calendar TODO list prototype
version 0.2 - last updated 2006-04-16
matiaspelenur@gmail.com

Released under The MIT License

Copyright (c) 2006 Matias Pelenur

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//
// NOTE NOTE NOTE NOTE NOTE
// This version of the script is a *prototype*; it stores the TODO entries in the local Greasemonkey store, so it will keep separate entries on separate firefox installations or computers. But it should be easy to extend to save the data to other places (like Amazon S3 for example).
// 
// HOW TO USE:
// Simply click on an entry to edit it, Enter to save. Escape to cancel may not work very well yet.
//
// TO DO:
// - selecting one entry while editing another should save and stop editing the previous entry
// - way to undo checking-off entries?
//
// ==UserScript==
// @name           Google Calendar todo list prototype
// @namespace      http://matiaspelenur.com/greasemonkey
// @description    A really basic TODO list for Google Calendar
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

GM_log('Howdy, the calendar todo list script is running on ' + document.location);

//////////////////////////////////////////////////////////////////////
// Utility functions
//////////////////////////////////////////////////////////////////////
//
// Memory-Leak-free event handling
//
// Current Browser/Javascript implementations contain memory leaks in their
// native DOM addEventListener methods.  Use these functions instead.
//

var registeredEventListeners = new Array();

//
// Equivalent to target.addEventListener(event, listener, capture)
// Returns nothing.
//
function addEventListener(target, event, listener, capture)
{
    registeredEventListeners.push( [target, event, listener, capture] );
    target.addEventListener(event, listener, capture);
}

//
// Removes all event listeners from the page when it unloads.
//
function unregisterEventListeners(event)
{
    // GM_log('unloading');
    while (registeredEventListeners.length > 0) {
        var rel = registeredEventListeners.pop();
        rel[0].removeEventListener(rel[1], rel[2], rel[3]);
    }
    window.removeEventListener('unload', unregisterEventListeners, false);
}
// And add the unload event handler that will unload all the registered
// handlers, including itself.
addEventListener(window, 'unload', unregisterEventListeners, false);


function xpath(query) {
  return document.evaluate(query, document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function single_xpath(query) {
  var eltList = xpath(query)
  return eltList.snapshotItem(0);
} 

function add(siblingNode,node) {
  siblingNode.parentNode.insertBefore(node, siblingNode.nextSibling); 
}

function remove(node) {
  node.parentNode.removeChild(node);
}

function hide(node) {
  node.style.display = 'none';
}

function show(node) {
  node.style.display = 'block';
}

function swap(something, other) {
  hide(something);
  show(other);
}

var todo_status_div;
var entry_dom;
var todoEditList = new Array();
var todoUndoList = {};


function setStatus(s) {
  todo_status_div.innerHTML = s;
  window.setTimeout(function() { todo_status_div.innerHTML = '&nbsp;'; }, 5000);
}

// begin closure
(function() {

KEY = 'calendar-todo';

var calendar_div = document.getElementById('nb_0');

if (calendar_div) {
	GM_log("found calendar_div");

	todo_div = document.createElement('div');
	todo_div.id = 'nb_todo';
	todo_div.innerHTML = new String(calendar_div.innerHTML);
	todo_div.style.paddingTop = '8px';
	todo_div.style.paddingRight = '6px';

	
	// first we hide this new div and add it to the document, so that we can 
	// perform xpath queries on it
	todo_div.style.display = 'none';
	calendar_div.parentNode.insertBefore(todo_div, calendar_div.nextSibling);

	
	// now modify the html we copied: remove the calendars div, change the name, etc
	remove(single_xpath("//div[@id='nb_todo']//div[@id='calendars']"));


	todo_title_div = single_xpath("//div[@id='nb_todo']//div[@class='s h']");
	todo_title_div.id = 'nt_todo';
	todo_title_div.innerHTML = 
		"<img width='11' height='11' src='images/opentriangle.gif' id='todo_tri_fav' onClick=\"_SwapDisplay('todo_ext_fav', 'todo_tri_fav');\"/> To do";
	todo_title_div.setAttribute('onclick',''); // to get rid of copied SwapDisplay call from calendar div
	
	var new_entry_link = document.createElement('a');
	addEventListener(new_entry_link, 'click', function() { createTodoEntry('new entry', true);  }, false);
	new_entry_link.innerHTML = ' <img src="http://www.google.com/calendar/images/btn_add.gif"/>';
	todo_title_div.appendChild(new_entry_link);
	//todo_title_div.setAttribute('onclick', "_SwapDisplay('todo_ext_fav', 'todo_tri_fav');");

	todo_content_div = document.createElement('div');
	todo_content_div.class='nb';
	todo_content_div.id='todo_ext_fav';
	todo_content_div.style.backgroundColor = 'white';
	add(todo_title_div, todo_content_div);
	
	todo_status_div = single_xpath("//div[@id='nb_todo']//div[@id='calendarsBottomChrome']");
	todo_status_div.id = 'todoBottomChrome';
	todo_status_div.innerHTML = '&nbsp;';
	
	
	// if we were getting the contents from a URL...
	/*
	setStatus("Loading...");
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: TODO_GET_URL,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'text/plain,application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	    	processTodoContents(responseDetails.responseText);
	        setStatus("Loaded successfully");
	    }
	 });
	*/

  	// but since we are not...
	GM_log("getting from local store");
	processTodoContents(deserializeEntries(GM_getValue(KEY,encodeURIComponent("['entry1','entry2','entry3']"))));
	
	// finally show the todo box
	show(todo_div);
	
}

// expectes entries as a |-separated list of URI-encoded text
function deserializeEntries(s) {
	GM_log("serialized entries are " + s);
  
	var encodedEntries = s.split("|");
	var todoList = new Array(encodedEntries.length);

	for (var i=0; i<encodedEntries.length;i++) {
		todoList[i] = decodeURIComponent(encodedEntries[i]);
	}

    GM_log("unserialized entries are " + todoList);
 	return todoList;

}

function serializeEntries(entries) {
	GM_log("unserialized entries are " + entries);
  
	var encodedEntries = new Array();
	
	for (var i=0; i<entries.length;i++) {
		encodedEntries[i] = encodeURIComponent(entries[i]);
	}
	
	var s = encodedEntries.join("|");
    GM_log("serialized entries are " + s);
 	return s;
}

function processTodoContents(todoList) {
    
    for (var i in todoList) {
		createTodoEntry(todoList[i]);
    }

	setStatus('Loaded');
}

function save() {
	// save!
	var todoList = new Array();

	for (var i=0; i<todo_content_div.childNodes.length; i++) {
		var todo_div = todo_content_div.childNodes[i];
		//GM_log("div " + todo_div + " with attr=" + todo_div.getAttribute('todo_content'));
        todoList[i] = todo_div.getAttribute('todo_content');
    }

	var serializedTodo = serializeEntries(todoList);

          //GM_log(todoList);

	  // if we were POSTing this to a URL...
          /*
	  GM_xmlhttpRequest({
	          method: 'POST',
	          url: TODO_POST_URL,
	          headers: {'Content-Type': 'application/x-www-form-urlencoded' },
	          data: "data=" + serializedTodo,
	          onload: function(responseDetails) {
	              GM_log("response.status=" + responseDetails.status);
		      if (responseDetails.status >= 300) {
	                alert("Sorry, could not save todo notes! Please try again");
	              }
	              else {
	                setStatus("Saved");
	              }
	            }
          });
	  */

          // since we are not POSTing, save it locally
	  GM_setValue(KEY, serializedTodo);
	  GM_log("saved to local store:" + serializedTodo);

	setStatus('Saved');
}

function createTodoEntry(content, focus) {
		var i = (todo_content_div.hasChildNodes() ? todo_content_div.childNodes.length : 0);
		var todo_div = document.createElement('div');
      
      var chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.name = chk.id = 'todo_chk_' + i;
      addEventListener(chk, 'click', function() { todo_content_div.removeChild(todo_div); save(); }, false);
      
      todo_div.appendChild(chk);
      
      //var todo_content = document.createElement('div');
      var todo_edit = document.createElement('input');
      
      todo_edit.id = 'todo_edit_' + i;
      todo_edit.style.fontSize = 'small';
      todo_edit.type = 'text';
      todo_edit.value = content;
      todo_edit.size = 15;
      
      function enableEdit(elt) {
        elt.readOnly = false;
        elt.style.border = '1px solid black';
        elt.style.backgroundColor = 'lightyellow';
        elt.style.color='darkblue';
        elt.selectionStart = 0;
        elt.selectionEnd = elt.value.length;
        todoUndoList[elt.id] = elt.value;
      }
      
      function disableEdit(elt) {
        elt.readOnly = true;
        elt.style.border = 'none';
        elt.style.backgroundColor = 'white';
        elt.style.color='black';
      }
      
      disableEdit(todo_edit);
      
      addEventListener(todo_edit, 'click', function(event) { 
        enableEdit(this);
      }, false);
      
      addEventListener(todo_edit, 'hover', function(event) {
        this.style.border = '1px solid gray';
      }, false);
      
      addEventListener(todo_edit, 'keyup', function(event) { 
        if (!this.readOnly && event.keyCode == 13) { //Enter
          disableEdit(this);
          todo_div.setAttribute("todo_content", this.value);
          save();
        }
        else if (!this.readOnly && event.keyCode == 27) { //Escape 
          // TODO: DOESN'T WORK ON WINDOWS FOR SOME REASON keyCode 27 is not received?
          this.value = todoUndoList[this.id];
          delete todoUndoList[this.id];
          disableEdit(this);
        }
      }, true);

      	todo_div.appendChild(todo_edit);
		todo_div.setAttribute('todo_content',content);
		//GM_log("div " + todo_div + " with attr " + todo_div.getAttribute('todo_content'));
		
		todo_content_div.appendChild(todo_div);
		
		if (focus) {
			enableEdit(todo_edit);
			todo_edit.focus();
		}
}

})(); 	// end closure

