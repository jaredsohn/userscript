/*
Google Calendar TODO list
version 0.4.1 - last updated 2007-06-06
http://barklund.org/examples/userscripts/googlecalendartodolist.user.js

Based on:
  version 0.2 - last updated 2006-04-16
  matiaspelenur@gmail.com
  
  version 0.3 - last updated 2006-11-08
  http://gimite.ddo.jp/

Version history since:
  version 0.4 - sorting and flushing - 2007-05-11
  version 0.4.1 - fix for google calendar update - 2007-06-06

Released under The MIT License

Copyright (c) 2006 Matias Pelenur, Gimite Ichikawa, Morten Barklund

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//
// HOW TO USE:
// Simply click on an entry to edit it, Enter to save. Mark as complete. Flush completes when necessary
//
// TO DO:
// - refactor to use mochikit in stead of homebrewed stuff
// - refactor to use category in stead of time
// - dockable sidebar
// - settings
// - groupable elements
// - colored elements
// - set dates for expiry and show up in calendar too
//
// ==UserScript==
// @name           Google Calendar TODOlist
// @namespace      http://barklund.org/examples/userscripts/
// @description    A TODO list sidebar for Google Calendar
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

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

//////////////////////////////////////////////////////////////////////
// Gcal todo functions
//////////////////////////////////////////////////////////////////////

// constants for eventStatus - http://code.google.com/apis/gdata/elements.html#gdEventStatus
var EVENT_CANCELED = "http://schemas.google.com/g/2005#event.canceled";
var EVENT_CONFIRMED = "http://schemas.google.com/g/2005#event.confirmed";
var EVENT_TENTATIVE = "http://schemas.google.com/g/2005#event.tentative";
var EVENT_CLOSED = EVENT_TENTATIVE;
var EVENT_OPEN = EVENT_CONFIRMED;

function getTodos(callback){
  gcalHttpRequest({
    method: "GET",
    url: "https://www.google.com/calendar/feeds/default/private/full?"+
      "start-min=1970-01-01T00:00:00.000Z&start-max=1970-01-01T01:00:00.000Z",
    onComplete: function(detail){
      var entries= responseXml(detail).getElementsByTagName("entry");
      var events= [];
      for (var i= 0; i<entries.length; ++i){
        events.push(elementToTodo(entries[i]));
      }
      callback(events);
    }
  });
}

function addTodo(title, status, callback){
  var req_data=
    "<entry xmlns='http://www.w3.org/2005/Atom'"+
    "    xmlns:gd='http://schemas.google.com/g/2005'>"+
    "  <category scheme='http://schemas.google.com/g/2005#kind'"+
    "    term='http://schemas.google.com/g/2005#event'></category>"+
    "  <title type='text'>"+title+"</title>"+
    "  <gd:transparency"+
    "    value='http://schemas.google.com/g/2005#event.opaque'>"+
    "  </gd:transparency>"+
    "  <gd:eventStatus"+
    "    value='"+status+"'>"+
    "  </gd:eventStatus>"+
    "  <gd:when startTime='1970-01-01T00:00:00.000Z'"+
    "    endTime='1970-01-01T01:00:00.000Z'></gd:when>"+
    "</entry>";
  gcalHttpRequest({
    method: "POST",
    url: "https://www.google.com/calendar/feeds/default/private/full",
    data: req_data,
    onComplete: function(detail){
      var event= elementToTodo(responseXml(detail));
      callback(event);
    }
  })
}

function updateTodo(todo, title, status, callback){
  var req_data=
    "<entry xmlns='http://www.w3.org/2005/Atom'"+
    "    xmlns:gd='http://schemas.google.com/g/2005'>"+
    "  <category scheme='http://schemas.google.com/g/2005#kind'"+
    "    term='http://schemas.google.com/g/2005#event'></category>"+
    "  <title type='text'>"+title+"</title>"+
    "  <gd:transparency"+
    "    value='http://schemas.google.com/g/2005#event.opaque'>"+
    "  </gd:transparency>"+
    "  <gd:eventStatus"+
    "    value='"+status+"'>"+
    "  </gd:eventStatus>"+
    "  <gd:when startTime='1970-01-01T00:00:00.000Z'"+
    "    endTime='1970-01-01T01:00:00.000Z'></gd:when>"+
    "</entry>";
  gcalHttpRequest({
    method: "PUT",
    url: todo.editUrl,
    data: req_data,
    onComplete: function(detail) {
      var event = elementToTodo(responseXml(detail));
      callback(event);
    }
  })
}

function elementToTodo(elem){
  var event= {};
  event.id = getTagText(elem, "id");
  event.title = getTagText(elem, "title");
  event.status = elem.getElementsByTagName("eventStatus")[0].attributes[0].value;
  var links = elem.getElementsByTagName("link");
  for (var j= 0; j<links.length; ++j){
    if (links[j].getAttribute("rel") == "edit"){
      event.editUrl = links[j].getAttribute("href");
    }
  }
  event.toString = eventToString;
  return event;
}

function eventToString(){
	return this.title+": "+(this.status == EVENT_OPEN ? "OPEN" : "CLOSED");
}

function gcalHttpRequest(params){
  document.cookie.match(/CAL=([^;]+)/);
  var token= RegExp.$1;
  GM_xmlhttpRequest({
    method: params.method,
    url: params.url,
    headers: {"Content-Type": "application/atom+xml", "Authorization": "GoogleLogin auth="+token},
    data: params.data,
    onload: function(detail){
      if (detail.status==200 || detail.status==201){
        params.onComplete(detail);
      }else{
        error(["HTTP request failed", detail]);
      }
    },
    onerror: function(detail){
      error(["HTTP request failed", detail]);
    }
  });
}

function responseXml(detail){
  var domParser= new DOMParser();
  return domParser.parseFromString(detail.responseText, "application/xml");
}

function getTagText(elem, tagName){ // Tenuki.
  var textNode= elem.getElementsByTagName(tagName)[0].childNodes[0];
  return textNode ? textNode.nodeValue : "";
}

function error(obj){
  if (unsafeWindow.console){
    unsafeWindow.console.log(obj);
  }else{
    GM_log(obj);
  }
}

//////////////////////////////////////////////////////////////////////
// Main
//////////////////////////////////////////////////////////////////////

var todo_status_div;
var todo_status_span;

// begin closure
(function() {
	
var calendar_div = document.getElementById('nb_0');

if (calendar_div) {
  todo_div = document.createElement('div');
  todo_div.id = 'nb_todo';
  todo_div.innerHTML = new String(calendar_div.innerHTML);
  todo_div.style.paddingTop = '8px';
  todo_div.style.paddingRight = '6px';
  
  // first we hide this new div and add it to the document, so that we can 
  // perform xpath queries on it
  todo_div.style.display = 'none';
  //calendar_div.parentNode.insertBefore(todo_div, calendar_div.nextSibling);
  calendar_div.parentNode.insertBefore(todo_div, calendar_div);

  // now modify the html we copied: remove the calendars div, change the name, etc
  remove(single_xpath("//div[@id='nb_todo']//div[@id='calendars']"));

  todo_title_div = single_xpath("//div[@id='nb_todo']//div[@id='nt_0']");
  todo_title_div.id = 'nt_todo';
  todo_title_div.innerHTML = 
    "<img width='11' height='11' src='images/opentriangle.gif' id='todo_tri_fav' onClick=\"_SwapDisplay('todo_ext_fav', 'todo_tri_fav');\"/> To do";
  todo_title_div.setAttribute('onclick',''); // to get rid of copied SwapDisplay call from calendar div
  
  var new_entry_link = document.createElement('a');
  addEventListener(new_entry_link, 'click', function() { createTodoEntry({}, true);  }, false);
  new_entry_link.innerHTML = ' <img src="http://www.google.com/calendar/images/btn_add.gif"/>';
  todo_title_div.appendChild(new_entry_link);

  todo_content_div = document.createElement('div');
  todo_content_div.setAttribute("class", "nb");
  todo_content_div.id = 'todo_ext_fav';
  todo_content_div.style.backgroundColor = 'white';
  add(todo_title_div, todo_content_div);
  
  todo_status_div = single_xpath("//div[@id='nb_todo']//div[@id='calendarsBottomChrome']");
  todo_status_div.id = 'todoBottomChrome';
  todo_status_div.style.fontSize = "80%";
  todo_status_div.style.textAlign = "right";
  todo_status_div.style.paddingRight = "1px";
  var todo_current_span = todo_status_div.getElementsByTagName("span")[0];
  todo_status_span = document.createElement('span');
  add(todo_current_span, todo_status_span);
  remove(todo_current_span);
  todo_status_span.setAttribute("class","lk");
  todo_status_span.appendChild(document.createTextNode("Flush closed"));
  
  load(function(){
    // finally show the todo box
    show(todo_div);
	sortTodos();
    setInterval(load, 5*60*1000); // Auto reload
  });
  
}

function load(callback) {
  getTodos(function(todos){
    if (!editing()){
      todo_content_div.innerHTML= "";
      for (var i= 0; i<todos.length; ++i){
        createTodoEntry(todos[i]);
      }
    }
    if (typeof(callback)=="function") callback();
  });
}

function editing() {
  var todo_divs= todo_content_div.getElementsByTagName("div");
  for (var i=0; i<todo_divs.length; i++) {
    if (todo_divs[i].getAttribute("editing")) return true;
  }
  return false;
}

function sortTodos() {
  var todo_divs = todo_content_div.getElementsByTagName("div");
  var todo_arr = new Array();
  for (var i = 0; i < todo_divs.length; i++)
	  todo_arr.push(todo_divs[i]);
  todo_arr.sort(compareTodos);
  for (var i = 0; i < todo_arr.length; i++) {
	  remove(todo_arr[i]);
	  todo_content_div.appendChild(todo_arr[i]);
  }
}
// link sort to flush after 2 seconds
addEventListener(todo_status_span, 'click', function(event) {
  window.setTimeout(sortTodos, 2*1000);
}, false);

function getInputByType(inputs, type) {
	for (var i = inputs.length; i--; ) 
		if (inputs[i].type == type) return inputs[i];
	return null;
}

function compareTodos(t1, t2) {
	// order by checked if not equal
	var t1s = t1.getElementsByTagName("input");
	var t1_checked = getInputByType(t1s, "checkbox").checked;
	var t2s = t2.getElementsByTagName("input");
	var t2_checked = getInputByType(t2s, "checkbox").checked;
	if (t1_checked && !t2_checked) {
		return 1;
	} else if (t2_checked && !t1_checked) {
		return -1;
	} else {
		// if equal order lexicographically
		var t1_title = getInputByType(t1s, "text").value;
		var t2_title = getInputByType(t2s, "text").value;
		if (t1_title > t2_title) {
			return 1;
		} else if (t1_title < t2_title) {
			return -1;
		} else {
			return 0;
		}
	}
}

function createTodoEntry(todo, focus) {
  
  var i = (todo_content_div.hasChildNodes() ? todo_content_div.childNodes.length : 0);
  var todo_div = document.createElement('div');
  
  var chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.name = chk.id = 'todo_chk_' + i;
  chk.checked = todo.status == EVENT_CLOSED;
  addEventListener(chk, 'click', function() {
    setEditing(true);
    updateStatus(chk.checked ? EVENT_CLOSED : EVENT_OPEN, function(){ disableEdit(false); });
  }, false);
  todo_div.appendChild(chk);
  
  var todo_edit = document.createElement('input');
  
  todo_edit.id = 'todo_edit_' + i;
  todo_edit.style.fontSize = 'small';
  todo_edit.type = 'text';
  todo_edit.value = todo.title || "";
  todo_edit.size = 15;
  
  todo_edit.style.textDecoration = (todo.status == EVENT_CLOSED) ? "line-through" : "none";
  
  function setEditing(flag) {
    todo_div.setAttribute("editing", flag ? "on" : "");
  }
  
  function enableEdit() {
    if (!todo_edit.readOnly) return;
    setEditing(true);
    todo_edit.readOnly = false;
    todo_edit.style.borderTop = '1px solid gray';
    todo_edit.style.borderLeft = '1px solid gray';
    todo_edit.style.borderBottom = '1px solid silver';
    todo_edit.style.borderRight = '1px solid silver';
    todo_edit.style.backgroundColor = 'lightyellow';
    todo_edit.style.color='darkblue';
    todo_edit.selectionStart = 0;
    todo_edit.selectionEnd = todo_edit.value.length;
  }
  
  function disableEdit(saving) {
    todo_edit.readOnly = true;
    todo_edit.style.border = 'none';
    todo_edit.style.backgroundColor = saving ? 'yellow' : 'white';
    todo_edit.style.color='black';
    if (!saving) setEditing(false);
  }
  
  function updateTitle(title, callback) {
    if (title == todo.title) {
      callback();
    } else if(todo.id) {
	  updateTodo(todo, title, todo.status, function(t) { updateEntry(t); callback(); });
    } else {
	  addTodo(title, EVENT_OPEN, function(t) { updateEntry(t); callback(); });
	}
  }
  
  function updateStatus(status, callback) {
    if (status == todo.status){
       callback();
    }else{
		updateTodo(todo, todo.title, status, function(t) { updateEntry(t); callback(); });
    }
  }
  
  function updateEntry(t) {
	  switch (t.status) {
	  case EVENT_OPEN:
	  case EVENT_CLOSED:
		todo = t;
		todo_edit.value = todo.title || "";
		chk.checked = t.status == EVENT_CLOSED;
		todo_edit.style.textDecoration = (todo.status == EVENT_CLOSED) ? "line-through" : "none";
		sortTodos();
		break;
	  case EVENT_CANCELED:
		destroy();
		break;
	  }
  }
  
  function destroy() {
	  // clean up listeners?
	  todo_content_div.removeChild(todo_div);
  }
  
  addEventListener(todo_status_span, 'click', function(event) {
	  if (todo.status == EVENT_CLOSED) {
		  updateStatus(EVENT_CANCELED, function(){});
	  }
  }, false);
  
  disableEdit();
  
  addEventListener(todo_edit, 'click', function(event) { 
    enableEdit();
  }, false);
  
  addEventListener(todo_edit, 'hover', function(event) {
    this.style.border = '1px solid gray';
  }, false);
  
  addEventListener(todo_edit, 'blur', function(event) {
    disableEdit(true);
    updateTitle(this.value, function(){ disableEdit(false); });
  }, false);
  
  addEventListener(todo_edit, 'keydown', function(event) { 
    if (!this.readOnly && event.keyCode == 13) { //Enter
      this.blur();
    }else if (!this.readOnly && event.keyCode == 27) { //Escape 
      this.value= todo.title;
      this.blur();
    }
  }, true);
  
  todo_div.appendChild(todo_edit);
  todo_div.setAttribute('todo_content',todo.title);
  
  todo_content_div.appendChild(todo_div);
  
  if (focus) {
    enableEdit();
    todo_edit.focus();
  }
  
}

})();   // end closure