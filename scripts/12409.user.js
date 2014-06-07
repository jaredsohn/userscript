/*
Google Calendar Productivity Chain + ToDo list

Based on:
  version 0.4.1 - last updated 2007-06-06
  http://barklund.org/examples/userscripts/googlecalendartodolist.user.js

Which is Based on:
  version 0.2 - last updated 2006-04-16
  matiaspelenur@gmail.com
  
  version 0.3 - last updated 2006-11-08
  http://gimite.ddo.jp/

Version history since:
  version 2.0 - productivity chains
*/

//
// HOW TO USE:
// Click '+' to add todo
// Simply click on an entry to edit it, Enter to save. 
// Check to complete normal tasks
// Enter '!chain' in title to make task a productivity chain - inspired by todoist
// Enter '!done' to complete a productivity chain
// Check to complete current day on the productivity chain
// Flush completes when necessary
// Click 'SetCal' to select calendar for Productivity Chains
//
// TO DO: from barklund script
// - refactor to use mochikit in stead of homebrewed stuff
// - refactor to use category in stead of time
// - dockable sidebar
// - settings
// - groupable elements
// - colored elements
// - set dates for expiry and show up in calendar too
//
// ==UserScript==
// @name           GCal Productivity Chain + ToDo List
// @namespace      Martin Ruiz
// @description    PRODUCTIVITY CHAINS using ToDo list sidebar for Google Calendar
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

(function() { // begin closure
setupShortcut(); // 'r' = 'refresh'
//////////////////////////////////////////////////////////////////////
// Utility functions
//////////////////////////////////////////////////////////////////////
//
// Memory-Leak-free event handling
//
// Current FBrowser/Javascript implementations contain memory leaks in their
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
// Todo Chain functions
//////////////////////////////////////////////////////////////////////
var CalMenu = new SetCalMenu();

function Chain(isChain,lastupdate,count,id,editUrl,prevupdate)
{
	this.count = (count?count:0);
	this.lastupdate = (lastupdate?lastupdate:"");
	this.isChain = (isChain?true:false);
	this.prevupdate = (prevupdate?prevupdate:"");

	this.lastid = (id?id:"");
	this.lastEditUrl = (editUrl?editUrl:"");

	this.increment = function() {
		if (this.lastupdate!=""&&this.lastupdate!=this.today())
		{
			this.prevupdate = this.lastupdate;
		}
		this.lastupdate = this.today();
		this.count = this.count+1;
		return this;
	}

	this.decrement = function() {
		this.lastupdate = this.prevupdate;
		this.count = this.count-1;
		return this;
	}

	this.reset = function() {
		this.lastupdate = "";
		this.count = 0;
		return this;
	}

	this.toString = function() {
		var s =	'new Chain('+
			(this.isChain?'true':'false')+','+
			'"'+this.lastupdate+'",'+
			this.count+','+
			'"'+this.lastid+'",'+
			'"'+this.lastEditUrl+'",'+
			'"'+this.prevupdate+'")';
		return s;
	}

	this.today = function() {
		var d = new Date();
		var s =	d.getFullYear()+'-'+
			(d.getMonth()<9?'0'+(d.getMonth()+1):d.getMonth()+1)+'-'+
			(d.getDate()<10?'0'+d.getDate():d.getDate());
		return s;
	}

	this.yesterday = function() {//buggy
		var d = new Date();
		d.setDate(d.getDate()-1);
		var s =	d.getFullYear()+'-'+
			(d.getMonth()<9?'0'+(d.getMonth()+1):d.getMonth()+1)+'-'+
			(d.getDate()<10?'0'+d.getDate():d.getDate());
		return s;
	}

	this.isBroken = function() {
		return (this.isChain)&&(this.prevupdate!="")&&(this.prevupdate!=this.yesterday())&&(this.lastupdate!="")&&(this.lastupdate!=this.yesterday());
	}

	this.doneToday = function() {
		return (this.isChain)&&(this.lastupdate==this.today());
	}

	this.setFlagFromTitle = function(s) {
		var re = /(\!chain)|(!link)|(!links)/i;
		this.isChain = re.test(s);
		return this;
	}
	
	this.createLink = function(title, callback, date)
	{
		var content;
		if (Note(title)) {
			content = prompt("Enter Note for ("+title+"):");
		}
		var t = '['+(this.count+1)+(this.count==0?' day] ':' days] ')+title;
		date = (date!=null&&date!="")?date:this.today();
		var status = EVENT_OPEN;
  		var req_data=
    "<entry xmlns='http://www.w3.org/2005/Atom'"+
    "    xmlns:gd='http://schemas.google.com/g/2005'>"+
    "  <category scheme='http://schemas.google.com/g/2005#kind'"+
    "    term='http://schemas.google.com/g/2005#event'></category>"+
    "  <title type='text'>"+t+"</title>"+
    (content?("<content type='text'>"+content+"</content>"):"")+
    "  <gd:transparency"+
    "    value='http://schemas.google.com/g/2005#event.opaque'>"+
    "  </gd:transparency>"+
    "  <gd:eventStatus"+
    "    value='"+status+"'>"+
    "  </gd:eventStatus>"+
    "  <gd:when startTime='"+date+"'></gd:when>"+
    "</entry>";

		var self = this;

  		gcalHttpRequest({
    			method: "POST",
    			url: CalMenu.cal().link, //"https://www.google.com/calendar/feeds/default/private/full",
    			data: req_data,
    			onComplete: function(detail){
      				var elem= responseXml(detail);

				self.lastid = getTagText(elem, "id");
  				var links = elem.getElementsByTagName("link");
  				for (var j= 0; j<links.length; ++j){
    					if (links[j].getAttribute("rel") == "edit"){
      						self.lastEditUrl = links[j].getAttribute("href");
    					}
  				}
				self.increment();
				callback();
    			}
  		})
	}

	this.deleteLink = function(title, callback) //function updateTodo(todo, title, status, callback, content){
	{
		var date = this.lastupdate;
		var status = EVENT_CANCELED;
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
    "  <gd:when startTime='"+date+"'></gd:when>"+
    "</entry>";

		var self = this;

  		gcalHttpRequest({
    			method: "PUT",
    			url: self.lastEditUrl,
    			data: req_data,
    			onComplete: function(detail) {
					self.decrement();
					callback();
    			}
  		})
	}

	return this;
}

function DeleteChain(s)
{
	var re = /\!done/i;
	return re.test(s);
}

function Note(s) {
	var re = /\!note/i;
	return re.test(s);
}

function StringToChain(s)
{
	try
	{
		if (s==null||s=="") return new Chain();
		return eval('('+s+')');
	} catch(e) { return new Chain(); } //some error occured
}

function SetCalMenu() {
	this.initialized = false;
	this.cals = [];

	this.initialize = function() 
	{
		var url = 'http://www.google.com/calendar/feeds/default/allcalendars/full';	

		var self = this;

  		gcalHttpRequest({
    			method: "GET",
    			url: url,
    			onComplete: function(detail){
				self.cals = [];
				self.cals.push({id:"https://www.google.com/calendar/feeds/default/private/full",
						title:"Default",
						color:"",
						link:"https://www.google.com/calendar/feeds/default/private/full"});

      				var entries= responseXml(detail).getElementsByTagName("entry");
				for (var i=0;i<entries.length;i++)
				{
					var cal = {};
					cal.id = getTagText(entries[i],'id');
					cal.title = getTagText(entries[i], 'title');
					cal.color = getTagText(entries[i], 'color'); //doesn't work
  					var links = entries[i].getElementsByTagName("link");
 	 				for (var j= 0; j<links.length; ++j){
    						if (links[j].getAttribute("rel") == "alternate")
						{
      							cal.link = links[j].getAttribute("href");
							break;
    						}
  					}
					self.cals.push(cal);
				}
				self.initialized=true;
    			}
  		})
	}

	this.initialize();

	this.getCal = function() { return GM_getValue("Calendar","Default"); }
	this.setCal = function(s) { return GM_setValue("Calendar", s); }

	this.cal = function()
	{
		var n = this.getCal();
		for (var i=0;i<this.cals.length;i++)
		{
			if (this.cals[i].title==n) return this.cals[i];
		}
		return this.cals[0]; //default;
	}

	this.setBold = function()
	{
		var n = this.cal();
		for (var i=0;i<this.cals.length;i++)
		{
			if (n.title==this.cals[i].title) 
			{
				this.cals[i].menu.style.fontWeight='bold';
			}
			else
			{
				this.cals[i].menu.style.fontWeight='';
			}
		}
	}

	this.show = function()
	{
		if (!this.initialized) return;
//	var setcal = document.getElementById('todo_setcal');
	var setcal = settings;
	var menu_div = document.getElementById('todo_setcal_menu');
	if (!menu_div)
	{	
		var self = this;
		menu_div = document.createElement('div');
		menu_div.setAttribute('id','todo_setcal_menu');
		menu_div.setAttribute('style',"display: none; position: absolute; z-index: 100");
		var menu = document.createElement('div');
		menu_div.appendChild(menu);
		menu.setAttribute('id','addP');
	
		for (var i=0;i<this.cals.length;i++)
		{
			var menuItem = document.createElement('div');
			menuItem.className = 'addmenu';
			menuItem.setAttribute('onmouseout','this.style.textDecoration="none"');
			menuItem.setAttribute('onmouseover','this.style.textDecoration="underline"');
			menuItem.setAttribute('style','text-decoration: none;');
			//menuItem.style.backgroundColor = this.cals[i].color;
			menuItem.innerHTML = this.cals[i].title;
	
			addEventListener(menuItem, 'mousedown', function(o) { self.setCal(o.target.innerHTML);self.hide();});
			menu.appendChild(menuItem);

			this.cals[i].menu = menuItem;
		}
		setcal.appendChild(menu_div);
	}

	menu_div.style.left = (setcal.offsetLeft+15)+'px';
	menu_div.style.top = (setcal.offsetTop+setcal.offsetHeight)+'px';
	this.setBold();
	menu_div.style.display = '';
	}

	this.hide = function()
	{
		var menu_div = document.getElementById('todo_setcal_menu');
		if (menu_div)
		{
			menu_div.style.display='none';
		}
	}
}

function ShowSetCal()
{
	var menu_div = document.getElementById('todo_setcal_menu');
	if (!menu_div||menu_div.style.display=='none')
	{
		CalMenu.show();
	}
	else
	{
		CalMenu.hide();
	}
}

function setupShortcut() // keyboard shortcut: "r"
{
 	window.addEventListener('keydown', function(e) { 
		if (e.altKey || e.ctrlKey || e.metaKey) {
    			return false;
  		}  
		if (e.keyCode==82) unsafeWindow._Ping(); //gcal internal function;; 
	}, true);
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
    onComplete: function(detail){//GM_log("getTodos:onComplete: "+detail.responseText);
      var entries= responseXml(detail).getElementsByTagName("entry");
	  GM_log("getTodos:entries: "+entries.length);
      var events= [];
      for (var i= 0; i<entries.length; ++i){
        events.push(elementToTodo(entries[i]));
      }
	  GM_log("getTodos:events: "+events.length);
      callback(events);
    }
  });
}

function addTodo(title, status, callback, content){
  var req_data=
    "<entry xmlns='http://www.w3.org/2005/Atom'"+
    "    xmlns:gd='http://schemas.google.com/g/2005'>"+
    "  <category scheme='http://schemas.google.com/g/2005#kind'"+
    "    term='http://schemas.google.com/g/2005#event'></category>"+
    "  <title type='text'>"+title+"</title>"+
    (content?("<content type='text'>"+content+"</content>"):"")+
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

function updateTodo(todo, title, status, callback, content){
  var req_data=
    "<entry xmlns='http://www.w3.org/2005/Atom'"+
    "    xmlns:gd='http://schemas.google.com/g/2005'>"+
    "  <category scheme='http://schemas.google.com/g/2005#kind'"+
    "    term='http://schemas.google.com/g/2005#event'></category>"+
    "  <title type='text'>"+title+"</title>"+
    (content?("<content type='text'>"+content+"</content>"):"")+
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
  try {
  event.id = getTagText(elem, "id");
  event.title = getTagText(elem, "title");
  event.content = getTagText(elem, "content");
  event.status = elem.getElementsByTagName("gd:eventStatus")[0].attributes[0].value;
  event.chain = StringToChain(event.content); //alert('c: '+event.chain.toString());
  var links = elem.getElementsByTagName("link");
  for (var j= 0; j<links.length; ++j){
    if (links[j].getAttribute("rel") == "edit"){
      event.editUrl = links[j].getAttribute("href");
    }
  }
  } catch(e) { alert(e); }
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
      if (detail.status==200 || detail.status==201){//GM_log(detail.responseText);
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
  var textNode= elem.getElementsByTagName(tagName)[0];//.childNodes[0];
  if (textNode) {textNode=textNode.childNodes[0];}
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
var settings;
var taskInput;

// begin closure
(function() {
GM_log('starting...');	
var calendar_div = document.getElementById('clst_fav').parentNode;// single_xpath("//div[@class='nb_0']");//document.getElementById('nb_0');

if (!calendar_div) return;
GM_log('got calendar div');
if (calendar_div) {
  todo_div = document.createElement('div');
  todo_div.innerHTML = new String(calendar_div.innerHTML);
  todo_div.id = 'nb_todo';
  todo_div.style.paddingTop = '8px';
  todo_div.style.paddingRight = '6px';
  // first we hide this new div and add it to the document, so that we can 
  // perform xpath queries on it
//  todo_div.style.display = 'none';
  //calendar_div.parentNode.insertBefore(todo_div, calendar_div.nextSibling);
  calendar_div.parentNode.insertBefore(todo_div, calendar_div);

  // now modify the html we copied: remove the calendars div, change the name, etc
	remove(single_xpath("//div[@id='nb_todo']//div[@id='calendars_fav']"));

  	var title = single_xpath("//div[@id='nb_todo']//h2[@id='clst_fav']");
	title.id = "clst_todo";
	var tregex = new RegExp(title.textContent,'ig');
	var thtml = title.innerHTML;
	thtml = thtml.replace(tregex,' Productivity Chains');
	title.innerHTML = thtml; 
	todo_title_div = title;
	
	taskInput = single_xpath("//div[@id='nb_todo']//input[@id='searchAddCal']");
	taskInput.id = 'addTask';
	taskInput.className = "label-input-label";
	taskInput.value = 'Add New Chain';

	var form = single_xpath("//div[@id='nb_todo']//form[@id='searchAddCalForm']");
	form.id = 'addTaskForm';
	
	var content = single_xpath("//div[@id='nb_todo']//div[@id='lhscalinner_fav']");
	content.id = 'lhscalinner_todo';

	var footer = single_xpath("//div[@id='nb_todo']//div[@id='calendarsBottomChrome']");
	footer.id = 'todoBottomChrome';
	footer.style.height = "12px";

	settings = footer.firstChild.firstChild;
	settings.setAttribute('onmousedown',"");
	settings.innerHTML = "Set Calendar";

	footer.childNodes[2].innerHTML="<span id='todo_status'> </span>";
	todo_status_span = document.getElementById('todo_status');
	
		var collapsed = false;
		title.addEventListener('click',function() { 
			if (!collapsed) {
				title.setAttribute("class","calHeader normalText goog-zippy-collapsed");
				content.style.display = "none";
			} else {
				title.setAttribute("class","calHeader normalText goog-zippy-expanded");
				content.style.display = "block";
			}
			collapsed = !collapsed;
		}, false);

  	addEventListener(taskInput, 'mousedown', function() { 
		taskInput.className = "";
		taskInput.value = "";
		taskInput.focus();
	}, false);
	addEventListener(taskInput, 'blur', function(event) {
		taskInput.className = "label-input-label";
		taskInput.value = 'Add New Chain';
	}, false);
	addEventListener(taskInput, 'keydown', function(event) { 
		if (!this.readOnly && event.keyCode == 13) { //Enter
		    var t = this.value;
			this.blur();
			createTodoEntry({title:t},false,true);//nofocus, create new todo
		}else if (!this.readOnly && event.keyCode == 27) { //Escape 
//      this.value= todo.title;
			this.blur();
		}
	}, true);

  	addEventListener(settings, 'click', function() { ShowSetCal();  }, false);

  todo_content_div = document.createElement('div');
  todo_content_div.setAttribute("class", "nb");
  todo_content_div.id = 'todo_ext_fav';
  todo_content_div.style.backgroundColor = 'white';
  add(form.parentNode, todo_content_div);
  
  load(function(){GM_log('load');
    // finally show the todo box
    show(todo_div);
	sortTodos();
    setInterval(load, 5*60*1000); // Auto reload
  });
  
}

function writeTodo() {
	taskInput.className = "";
	taskInput.value = "";
	taskInput.focus();
}

function load(callback) {
  getTodos(function(todos){
    if (!editing()){
      todo_content_div.innerHTML= "";
	  GM_log(todos.length);
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

function createTodoEntry(todo, focus, newTodo) {
try {  
  var i = (todo_content_div.hasChildNodes() ? todo_content_div.childNodes.length : 0);
  var todo_div = document.createElement('div');
  
  var chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.name = chk.id = 'todo_chk_' + i;
  chk.checked = (todo.status == EVENT_CLOSED)||(todo.chain?todo.chain.doneToday():false);
  addEventListener(chk, 'click', function() {
    todo_edit.style.backgroundColor = 'yellow';
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
  
  todo_edit.style.textDecoration = (chk.checked) ? "line-through" : "none";
  
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
	unsafeWindow._Ping(); //gcal internal function;
  }
  
  function updateTitle(title, callback) {
    if ((title == todo.title) && todo.id) {
      callback();
    } else if(todo.id) {
	  todo.chain.setFlagFromTitle(title);
	  if (DeleteChain(title))
	  {
		todo.status = EVENT_CANCELED;
	  }	  
	  updateTodo(todo, title, todo.status, function(t) { updateEntry(t); callback(); }, todo.chain.toString());
    } else {
	  var c = new Chain();
	  var content = c.setFlagFromTitle(title).toString();
	  addTodo(title, EVENT_OPEN, function(t) { updateEntry(t); callback(); }, content);
	}
  }
  
  function updateStatus(status, callback) {
//    if (status == todo.status){
//       callback();
//    }else{
	if (todo.chain.isChain)
	{
		switch (status) {
		case EVENT_CLOSED:
			status=EVENT_OPEN;
			if (todo.chain.isBroken()) todo.chain.reset();
			todo.chain.createLink(todo.title, function() {updateTodo(todo, todo.title, status, function(t) { 

updateEntry(t); callback(); }, todo.chain.toString());});
			break;
		case EVENT_OPEN:
			todo.chain.deleteLink(todo.title, function() {updateTodo(todo, todo.title, status, function(t) { 

updateEntry(t); callback(); }, todo.chain.toString());});
			break;
		}
		return;
	}
	updateTodo(todo, todo.title, status, function(t) { updateEntry(t); callback(); }, todo.chain.toString());
//    }
  }
  
  function updateEntry(t) {
	  switch (t.status) {
	  case EVENT_OPEN:
	  case EVENT_CLOSED:
		todo = t;
		todo_edit.value = todo.title || "";
		chk.checked = (t.status == EVENT_CLOSED)||todo.chain.doneToday();
		todo_edit.style.textDecoration = (chk.checked) ? "line-through" : "none";
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

  if (newTodo) {
    disableEdit(true);
    updateTitle(todo.title, function(){ disableEdit(false); });  
  }
  
  if (focus) {
    enableEdit();
    todo_edit.focus();
  }
} catch(e) { alert(e); }  
}

})();   // end closure
})();   // end closure