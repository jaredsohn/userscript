// ==UserScript==
// @name           Ultimate eHarmony Matches Table
// @namespace      http://userscripts.org/users/99011
// @description    Perform common tasks (view photos, close match, etc) without leaving the My Matches page
// @include        http://*.eharmony.*/singles/servlet/user/mymatches
// @include        http://*.eharmony.*/singles/servlet/user/mymatches?*
// ==/UserScript==
// =============================================================================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
//
// To use it:
//   1) Install Greasemonkey
//   2) Restart Firefox
//   3) Revisit this page
//   4) Click on install
//
// =============================================================================

// Ultimate eHarmony Enhancement for the "My Matches" Page
// Designed to let you perform common tasks (view photos, close match, etc.)
// without leaving the page.
// Version: 1.08 (2010-May-22)
//
// NOTE: This version works with photos, but the script has not yet been changed
// to take advantage of eHarmony's new Archive Match feature.
//
// WARNING: This script has been developed using the Canadian version of
// eHarmony, and it is unknown whether it works on the US site.
//
// FEATURES:
//
// - Thumbnail column
// - Hover over a thumbnail to cycle through a match's photos
// - Quick Close button closes a match with a single click, using reason "Other"
// - Request a photo right from the matches table
// - Hover over any "Read Closed Message" button to popup the closed reason
// - Adds Height to Member Info column (could easily be customized to another
//   field from the Details page).
// - Larger photos than seen on match details page (note that eHarmony serves
//   large versions from their servers but normally scales them down in the
//   browser)
// - Shows how many days ago photo was requested
// - Matches table cosmetics tweaked very slightly for less wasted whitespace
//
// TIPS:
//
// - Photos, match information, close reasons, etc are all preloaded in the
//   background.  Don't use this extension if your bandwidth is costly.
// - If a picture hasn't yet downloaded when you hover over a thumbnail, it is
//   placed at the top of the download queue.  Just wait a moment and it will
//   appear.
// - Large pictures will still be scaled down if they don't fit in your browser
//   window.
// - Middle-click the "Click for Next Photo" link to open the current photo in
//   a new tab (as a plain old jpeg file, at full native size).
// - If the photo preview popout gets "stuck" and doesn't disappear, swipe your
//   mouse back over the "Next Photo" link and it will go away.
// - You can customize the QUICKCLOSE_REASON constant to any of the reasons on
//   the Close Match page (must match exactly) if you don't want to default
//   to "Other".
// - Add the line "stretchPage()" (no quotes) to the bottom of the script if
//   you want the table to stretch/shrink with the browser window
//
// LICENSING:
//
//   The copyright for this code belongs to the original authors who wrote it.
//   Most of this code is an original work, however some of it (where indicated)
//   was borrowed from internet sources.  YOU ARE FREE TO DO WHATEVER YOU'D LIKE
//   with the original portions of this code.  I can't speak to the licensing of
//   the other portions.
//
//   ABSOLUTELY NO WARRANTY OF ANY KIND COMES WITH THIS SCRIPT.  USE IT AT YOUR
//   OWN RISK.  The author(s) take NO RESPONSIBILITY for any consequences of
//   using this software.  If it inadvertantly closes all your eHarmony
//   matches or crashes your computer, it's your problem not ours.
//
//   If you are redistributing this code or find it useful in your project,
//   I'd appreciate you including a reference to the original at:
//   http://userscripts.org/scripts/show/53471
//
//   If this tool helps you find that perfect match, no thanks is neccessary
//   but feel free to send some good karma our way.
//
// REVISIONS:
//
//  v1.08, 2010-May-22, RK
//  - Change "Member Info" to "Match Details"
//  - Re-enable Quick Close button (seems to work, but no extensive regression
//    testing was performed)
//  v1.05, 2009-Mar-20, RK
//  - Several changes to restore compatibility after eHarmony changed their
//    site layout.
//  - eHarmony now embeds all photo url's into the match details page, so
//    the script no longer needs to visit a separate "photo details" page
//    to get this information.  Removed FetchPhotoListTask, parsePhotos(),
//    PRI_FETCH_PHOTO_LIST, PHOTOS_URL.
//  - Added photos property to MatchDetails, and populate it in parseDetails()
//    and MatchDetails.onDownload() event.  Also added schedulePhotoTasks()
//    to schedule the preload tasks which used to be done by FetchPhotoTaskList.
//  - Corrected parsing in parseDetails()
//  - Added Encoder/Decoder module to decode HTML photo captions
//  - Updated makeButton() - works for single-line buttons, but not yet for
//    buttons which are larger vertically.  Needs more work, so not used for now.
//  - Added getOffset() to get more accurate element coordinates.
//  - Enhanced "Click for Next Photo" text to indicate if there are multiple
//    photos and if viewing last photo.
//  - Added TAB_ constants
//  - Updated CLOSE_NOW_URL
//  - Page body now stretches to 100% instead of 98% in stretchPage(); also
//    added code to remove the 3D border effect when stretched.
//  - Updated elapsedDays() to return more accurate results (especially if
//    matched today).
//  - elapsedString() now returns "yesterday" instead of "1 day ago"
//  - Updated how we check if top ad is visible.
//  - Moved debuggingLayout to be a global variable, and check it in
//    scaleToFit() to avoid spamming debug info.
//  - Renamed CLOSE_CLOSEDACCOUNT_URL to CLOSEDACCOUNT_FOLLOWTHRU_URL and
//    added comments for clarity.  Also updated ACCOUNT_CLOSED hint text
//    (though that may not have been neccessary).
//  - Added addNewStyle() - may be used in future to override CSS styles
//  - Added "LICENSING" section above for clarity.  I retain the right to alter
//    the wording at a later date, but the spirit of the "license" will not
//    change.  This script may not always be maintainted, but it will always be
//    free without any limitations on use.
//  v1.04, 2009-Oct-17, RK
//  - Added ability to middle-click page numbers and tabs (e.g. "New",
//    "Communicating" to open them in a new Firefox tab.
//  - Kills more ads (hides anything with class 'ad').
//  - Minor fix to image scaling.
//  v1.03, 2009-Oct-16, RK
//  - Updates to make the script work again after eHarmony made changes to
//    their website, as listed below:
//  - Fixed matchId() to parse from class 'name-row' instead of
//    '.ib-dash-icon-off', so that script can once again parse match id's from
//    table rows.
//  - New approach to "days elapsed".  No longer see "undefined days ago" after
//    hitting "Request Photo" link.  If photo has been requested, number of days
//    since request is shown instead of "Photo Unavailable".  Matched date and
//    Last Communicated now shown as elapsed days again.
//  - Appended 'px' unit indicator to all style.width, style.height,
//    style.marginTop, etc. assignments to fix layout issues.
//  - Fixes to the popout layout algorithm.  Using window.innerWidth/Height
//    instead of old layout strategy.  Unfortunately this introduces a minor
//    annoyance in that height of horizontal scrollbar is included in max
//    viewport height.. but couldn't find a way to solve it.
//  - Fixed makeButton() so that leftmost TD element of button (containing
//    the left "rounded" button edge) is explicitely defined with height:100%,
//    to ensure Quick Close buttons are displayed correctly.
//  - Fixed getClosedReasonButtonForRow()
//  v1.02, 2009-Jul-14, RK
//  - Added include for match table page when requested with parameters
//  v1.01, 2009-Jul-10, RK
//  - Fixed Quick Close button for matches whose accounts are closed.
//  v1.00, 2009-Jul-10, RK
//  - Initial release.  An utterly big hack, but it does some cool stuff.
//

// *****************************************************************************
// This script was developed in FireBug without GreaseMonkey.  Break free of the
// GreaseMonkey namespace and inject it straight into the page.  Comment this
// out if you want to paste script straight into FireBug console.
// *****************************************************************************
if (typeof window.wrappedJSObject == "object") {
  location.href = "javascript:(" + encodeURI(arguments.callee.toSource()) + ")();";
  return;
}

// *****************************************************************************
// Things you can customize are here
// *****************************************************************************

var QUICKCLOSE_REASON = "Other";
// Other values could be:
//  "I don't feel that the chemistry is there.",
//  "I think the physical distance between us is too great.",
//  "I want to pursue other matches at eharmony.",
//  "I would rather not say.",
//  "This match never responded to my request to communicate.",
//  "Based on statements in their profile, I'm not interested in this match.",
//  "Because there are no photos posted/I couldn't see any photos."

// *****************************************************************************
// General Utilities
// *****************************************************************************
function log(t) {
  if (window.console && window.console.firebug) {
    window.console.log(t);
  }
}

if (!HTMLElement.prototype.contains) {
  HTMLElement.prototype.contains = function(node) {
    if (node == null) return false;
    if (node == this) return true;
    else return this.contains(node.parentNode);
  }
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
  }
}

// Hide the given element or array of elements
function hideElement(el) {
  if (!el) return;
  if (el instanceof Array) {
    for (var i = 0; i < el.length; i++) {
      hideElement(el[i]);
    }
  } else {
    el.style.display = 'none';
  }
}

// Returns the given HTML centered horizontally and vertially in a
// table element.
function centerInTable(content) {
  return '<table cellpadding=0 cellspacing=0 style="width:100%;height:100%">'
    + '<tr><td style="padding:0; background-color:transparent" align="center">'
    + content
    + '</td></tr></table>';
}

// Add new CSS style element
// From http://stackoverflow.com/questions/462537/overriding-important-style-using-javascript
function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

// *****************************************************************************
// SimpleParser (lightweight, cursor-based text parsing)
// *****************************************************************************
function SimpleParser(text) {

  this.text = text;
  this.cursor = 0;

  // Advances the cursor to just after the given symbol (or to its first
  // character, if noOvertake is true).  Cursor is not moved and false is
  // returned if symbol cannot be found in the remaining text.
  SimpleParser.prototype.seek = function(symbol, noOvertake) {
    var idx = this.text.indexOf(symbol, this.cursor);
    if (idx > -1) {
      this.cursor = idx;
      if (!noOvertake) this.cursor += symbol.length;
      return true;
    } else {
      return false;
    }
  }

  // Returns true if symbol can be found at some point after the cursor.
  SimpleParser.prototype.canSeek = function(symbol) {
    var idx = this.text.indexOf(symbol, this.cursor);
    return (idx > -1);
  }

  // Extracts the text between the given symbols, and moves the cursor just
  // to the right of the right symbol.  Returns null if either symbol cannot
  // cannot be found in the remaining text.  Specify "" in the left symbol
  // to start extracting from the cursor.
  SimpleParser.prototype.extract = function(left, right) {   
    var s = this.text.indexOf(left, this.cursor);
    var e;
    if (s < 0) return null;
    s += left.length;
    if (right != "") {
      e = this.text.indexOf(right, s);
      if (e < 0) return null;
    } else {
      e = this.text.length;
    }    
    var result = this.text.substring(s, e);
    this.cursor = e + right.length;
    return result; 
  }

}

// *****************************************************************************
// XMLHttpRequest
// 
// See also, article on HTTP requests and ready state:
// http://www.ibm.com/developerworks/web/library/wa-ajaxintro3/
//
//  // Test
//  httpRequest(
//    "http://example.com/",
//    function(req) {alert("success - " + req.responseText)},
//    function(req) {alert("fail " + req.responseText)},
//    null, 5000);
//
// *****************************************************************************

function createXMLHttpRequest() {
  try { return new XMLHttpRequest(); } catch(e) {}
  try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) {}
  try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) {}
  throw 'XMLHttpRequest not supported';
}
 
var HTTP_TIMEOUT = 20000; // default to 20s
 
// Sends an asynchronous XMLHttpRequest.
// onSuccess:function(req)
//    Function to be fired on completion.
// onFail : function(req)
//    Function to be fired on failure or timeout.  Note the req parameter
//    may be null.
// timeout: milliseconds
//    Request will be aborted if it hasn't completed within the timeout
//    period.  If not specified, default HTTP_TIMEOUT will be used.
//    Pass in -1 for infinite.
function httpRequest(url, onSuccess, onFail, postData, timeout) {
  // Prepare a new XMLHttpRequest instance
  var req = createXMLHttpRequest();
  var method = postData ? 'POST' : 'GET';
  req.open(method, url, true);
  req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
  if (postData) {
    req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  }
  
  // Set up a timeout monitor if requested
  var timer = null;
  if (!timeout) timeout = HTTP_TIMEOUT;
  if (timeout != -1) {
    timer = setTimeout(httpTimeoutClosure(req, onFail), timeout);
  }

  // Hook status change event
  req.onreadystatechange = httpStatusChangeClosure(req, onSuccess, 
    onFail, timer);
  
  req.send(postData);
}
  
function httpTimeoutClosure(req, onFail) {
  return function() {
    req.onreadystatechange = null;
    try {req.abort()}
    finally {if (onFail) onFail(req)}
  }
}

function httpStatusChangeClosure(req, onSuccess, onFail, timer) {
  return function() {
    if (req.readyState != 4) return;
    if (timer) clearTimeout(timer);
    if (req.status != 200 && req.status != 304) {
      if (onFail) onFail(req);
      return;
    }    
    if (onSuccess) onSuccess(req);
  }
}  

// *****************************************************************************
// TaskQueue v1.00
// Original Author: RK
// *****************************************************************************
//
// SUMMARY:
//
//  Task scheduling and "multitasking" classes for Javascript.
//
// FEATURES:
//
//  - tasks can be added / removed at any time
//  - tasks can be prioritized
//  - support for asynchronous tasks (e.g. XmlHttpRequest's)
//  - multiple task queues can be used for preempting asynchronous tasks, and
//    to group tasks that should block each other
//    
// EXAMPLES:
//
//    // Simplest usage
//    var taskQueue = new TaskQueue();
//    taskQueue.schedule("alert('there')", 1);
//    taskQueue.schedule("alert('hello')", 0);
//
//    // Custom tasks
//    MessageTask = function(msg) {
//      this.taskId = null; // set when scheduled
//      this.msg = msg;
//      this.priority = 1;
//      this.description = "Display message '" + msg + "'";
//      MessageTask.prototype.run = function() {
//        alert(msg);
//      }
//    }
//    taskQueue.schedule(new MessageTask("Nice to meet you"));
//
// USAGE NOTES:
//
//  Any class that provides a run() method can be queued as a task.  A
//  GenericTask class is provided to wrap javascript functions, closures, etc
//  on the fly, but you can also create and schedule your own classes.
//
//  The TaskQueue periodically examines its scheduled tasks and runs the one
//  with the smallest priority number.  A timer is used to keep the browser
//  responsive between tasks, and so that tasks are invoked from a clean stack.
//  The timer is only enabled when the queue is not empty.
//  
//  Only one task may run at a time.  A single TaskQueue is not "preemptive",
//  and will not launch a new task until the current one is complete.
//
//  If your task must perform a lot of work, it is suggested you split the
//  work into "chunks" to avoid locking up the browser.  Tasks may requeue
//  themselves at the end of their run() method to resume work at a later time.
//
//  The TaskQueue can be paused and resumed at will.  If a task is active when
//  a pause is requested, the pause will be "acknowledged" as soon as the
//  current task is complete.
//
//  Your task is automatically assigned a taskId when you schedule it.  Your
//  task should also provide the "priority" and "description" fields.  If
//  not provided, they are created automatically when your task is scheduled.
//  
// ASYNCHRONOUS TASKS:
//
//  If your run() method begins an asynchronous operation (such as sending an
//  XmlHttpRequest) and must return before work is complete, you may request
//  a hold to keep the task marked active until you later call the release()
//  method.  This is similar to pausing the queue, but is designed for use
//  by tasks themselves.  It can be used to synchronize asynchronous
//  operations (i.e. when you don't want any other tasks to run until some
//  external event is fired).  The ImagePreloadTask makes use of the feature
//  to avoid loading new images until the current image is complete.
//
//  When using this feature, be sure you eventually do call release(), or you
//  will hold up the queue indefinitely.  A timeout can be specified after
//  which the hold will be automatically released and your task "abandoned".
//  If an expired() method is implemented by your task it is invoked if this
//  occurs.
//
//  If you want the ability to preempt asynchronous tasks, you can create
//  multiple TaskQueue's.  For example, you can create one TaskQueue to
//  synchronize all tasks that require a server connection, and another
//  TaskQueue for UI tasks that operate entirely on the client side.
//  When connection tasks hold up the first queue, UI tasks can still run on
//  the second queue.
//
// REVISIONS:
// 
//  v1.00, 2009-Jun-29, RK
//  - initial release
//
//
// *****************************************************************************

// Generic wrapper to turn any function or string of javascript into a task
function GenericTask(run) {  
  if (run instanceof Function) {
    this.run = run;
    //this.description = run.toString().substring(0, 50);
  } else if (typeof(run) == 'string') {
    this.run = function(){eval(run)};
    //this.description = run.substring(0, 50);
  } else {
    throw 'Must specify callback function';    
  }
  // Note: taskId, priority and description properties are set when task is
  // scheduled.
}

function Tasks() {

  this.items = new Array();
  this._dirty = false;

  Tasks.prototype.add = function(task) {
    this.items.push(task);
    this._dirty = true;
    return task;
  }

  Tasks.prototype.idToIndex = function(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].taskId == id) return i;
    }
    return null;
  }

  // Requires that priority has been set on all tasks
  Tasks.prototype.sort = function() {
    if (!this._dirty) return;
    this.items.sort(Tasks.prototype.priorityComparer);
    this._dirty = false;
  }

  Tasks.prototype.priorityComparer = function (taskA, taskB) {
    return taskA.priority - taskB.priority;
  }

  Tasks.prototype.find = function(id) {
    if (!id) return null;
    return this.items[this.idToIndex(id)];
  }

  Tasks.prototype.remove = function(id) {    
    var idx = this.idToIndex(id);
    if (idx == null) throw 'Task with id ' + id + ' not found.';
    if (idx == 0) {
      this.items.shift();
    } else {
      this.items.splice(idx, 1);
    }
    this._dirty = true;
  }

  // Requires that priority has been set on all tasks
  Tasks.prototype.smallestPriority = function () {
    if (this.count == 0) return null;
    this.sort();
    return this.items[0];
  }

  Tasks.prototype.count = function () {
    return this.items.length;
  }

}

function TaskQueue(timeBetweenTasks) {  
  
  this.tickInterval = timeBetweenTasks ? timeBetweenTasks : 10;
  this.tasks = new Tasks();
  this.pauseRequested = false;
  this.pauseCallback = null;
  this.paused = false;
  this.activeTask = null;
  this.timerId = null;
  
  this.held = false;
  this.heldTimerId = null;
  
  TaskQueue.prototype.generateTaskId = function() {
    if (!TaskQueue.prototype._nextId) TaskQueue.prototype._nextId = 1;
    return TaskQueue.prototype._nextId++;
  }
  
  // Pause the task spooler.  If a task is currently executing, the pause
  // will be delayed until its execution is complete.  A callback function
  // can be provided which will be invoked when the queue is pause is
  // acknowledged.  Note if no tasks are active, the callback will be invoked
  // immediately.
  TaskQueue.prototype.pause = function(callback) {
    if (this.paused) return;
    this.pauseRequested = true;
    this.pauseCallback = callback;
    this._tryAcknowledgePause();
  }
  
  TaskQueue.prototype.resume = function() {
    if(this.paused) {
      this.paused = false;
      this._startTimer();
    } else {
      this.pauseRequested = false;
      this.pauseCallback = null;
    }
  }
  
  // Prepares a task to be scheduled.
  TaskQueue.prototype._prepareTask = function(task, priority, description) {
    if (task == null) throw 'Must specify task';
    if (typeof task == "string" || task instanceof Function) {
      task = new GenericTask(task); // wrap
    }
    // Parameters specified override any already set on task
    if (priority) task.priority = priority;
    if (description) task.description = description;
    // Set defaults for any properties that don't exist
    if (!task.priority) task.priority = 0;
    if (!task.description) task.description = '';
    // Generate a unique id (changes each time task is scheduled)
    task.taskId = TaskQueue.prototype.generateTaskId();    
    return task;
  }
  
  // Places a task in the queue
  TaskQueue.prototype.schedule = function(task, priority, description) {
    task = this._prepareTask(task, priority, description);
    this.tasks.add(task);
    if (!this.paused) this._startTimer();
    return task;
  }

  TaskQueue.prototype._tryAcknowledgePause = function() {
    if (!this.pauseRequested || this.activeTask) return false;    
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = null;
    this.paused = true;
    this.pauseRequested = false;
    if (this.pauseCallback) {
      try {this.pauseCallback()}
      catch(ex){log(ex)}
      this.pauseCallback = null;
    }
    return true;
  }
  
  TaskQueue.prototype._tick = function() {
    this.timerId = null;
    if (this.activeTask || this.paused || this.held) {
      throw 'TaskQueue Detected invalid state in _tick';
    }
    if (this._tryAcknowledgePause()) return;
    if (this.tasks.count() == 0) return; // no more tasks
    this._doTask();
    if (this.held) return;
    if (this._tryAcknowledgePause()) return;
    this._startTimer();
  }
  
  TaskQueue.prototype._startTimer = function() {
    if (this.paused || this.activeTask || this.timerId) return;
    if (this.tasks.count() == 0) return;
    var _self = this;
    this.timerId = setTimeout(function(){_self._tick()}, this.tickInterval);    
  }
  
  TaskQueue.prototype._doTask = function() {
    this.activeTask = this.tasks.smallestPriority();
    this.tasks.remove(this.activeTask.taskId);
    if (this.activeTask.run instanceof Function) {
      log('Running task #' + this.taskToString(this.activeTask));
      try {this.activeTask.run()}
      catch(ex) {log(ex)}
    } else {
      log('No run() method on task #' + this.taskToString(this.activeTask));
    }
    if (!this.held) this.activeTask = null;
  }
  
  // Causes the Task Manager to keep the current task active until release()
  // is called or (optionally) a timeout occurs.  Called by a task when it is
  // about to perform asynchronous work and it wants to block other tasks from
  // running.
  TaskQueue.prototype.hold = function(timeout) {
    if (this.held) throw 'Already in hold mode';
    if (!this.activeTask) throw 'No task currently running';
    this.held = true;
    if (timeout) {
      var _self = this;
      this.heldTimerId = setTimeout(function(){_self._holdExpired()}, timeout);
    }
    return this.activeTask.taskId;
  }
  
  // Release a previously aquired hold.  Called by a task when it has
  // completed its work and the Task Manager can resume processing tasks.
  // Must specify taskId to detect if being called from an abandoned task
  // who's hold has expired.
  TaskQueue.prototype.release = function(taskId) {
    if (!taskId) taskId = this.activeTask.taskId; // for debugging
    if (!taskId) throw 'Must specify taskId to release';
    if (!this.activeTask || !this.held) return;
    if (taskId != this.activeTask.taskId) return;
    this._resumeAfterHold();
  }  
  
  TaskQueue.prototype._holdExpired = function() {
    this.heldTimerId = null;
    if (!this.held || !this.activeTask)
      throw 'TaskQueue detected invalid state in _holdExpired'
    log('Hold expired for task #' + this.taskToString(this.activeTask));
    if (this.activeTask.expired instanceof Function) {
      try {this.activeTask.expired()}
      catch(ex){log(ex)}
    }
   this._resumeAfterHold();
  }
  
  TaskQueue.prototype._resumeAfterHold = function() {
    if (this.heldTimerId) clearTimeout(this.heldTimerId);
    this.heldTimerId = null;
    this._holdId = null;
    this.held = false;
    // Paste commands normally performed after task.run() returns
    this.activeTask = null;
    if (this._tryAcknowledgePause()) return;
    this._startTimer();    
  }
  
  TaskQueue.prototype.taskToString = function(task) {
    var s = '' + task.taskId;
    if (task.description && task.description != '') {
      s += ': ' + task.description;
    }
    return s;
  }
  
  // List tasks to console (for debugging)
  TaskQueue.prototype.listTasks = function() {
    for (var i = 0; i < this.tasks.count(); i++) {
      log('Task #' + this.taskToString(this.tasks.items[i]));
    }
  }

  // for debugging only
  TaskQueue.prototype.clearAll = function() {
    this.tasks = new Tasks();
    this.pauseRequested = false;
    this.pauseCallback = null;
    this.paused = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = null;  
    this.held = false;
    if (this.heldTimerId) clearTimeout(heldTimerId);
    this.heldTimerId = null;
  }
  
}

// *****************************************************************************
// HTML Encoder/Decoder, from:
// http://www.strictly-software.com/htmlencode
// http://www.strictly-software.com/scripts/downloads/encoder.js
// *****************************************************************************
Encoder = {

  // When encoding do we convert characters into html or numerical entities
  EncodeType : "entity",  // entity OR numerical

  isEmpty : function(val){
    if(val){
      return ((val===null) || val.length==0 || /^\s+$/.test(val));
    }else{
      return true;
    }
  },
  // Convert HTML entities into numerical entities
  HTML2Numerical : function(s){
		var arr1 = new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;',
			'&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;',
			'&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;',
			'&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;',
			'&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;',
			'&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;',
			'&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;',
			'&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;',
			'&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;',
			'&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;',
			'&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;',
			'&ocirc;','&otilde;','&ouml;','&divide;','&oslash;','&ugrave;','&uacute;','&ucirc;',
			'&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;',
			'&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;',
			'&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;',
			'&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;',
			'&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;',
			'&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;',
			'&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;',
			'&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;',
			'&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;',
			'&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;',
			'&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;',
			'&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;',
			'&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;',
			'&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;',
			'&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;',
			'&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;',
			'&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');
		var arr2 = new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;',
			'&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;',
			'&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;',
			'&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;',
			'&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;',
			'&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;',
			'&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;',
			'&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;',
			'&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;',
			'&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;',
			'&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;',
			'&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;',
			'&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;',
			'&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;',
			'&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;',
			'&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;',
			'&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;',
			'&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;',
			'&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;',
			'&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;',
			'&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;',
			'&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;',
			'&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;',
			'&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;',
			'&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;',
			'&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;',
			'&#9824;','&#9827;','&#9829;','&#9830;');
    return this.swapArrayVals(s,arr1,arr2);
  },  

  // Convert Numerical entities into HTML entities
  NumericalToHTML : function(s){
		var arr1 = new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;',
			'&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;',
			'&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;',
			'&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;',
			'&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;',
			'&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;',
			'&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;',
			'&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;',
			'&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;',
			'&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;',
			'&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;',
			'&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;',
			'&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;',
			'&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;',
			'&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;',
			'&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;',
			'&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;',
			'&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;',
			'&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;',
			'&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;',
			'&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;',
			'&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;',
			'&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;',
			'&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;',
			'&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;',
			'&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;',
			'&#9824;','&#9827;','&#9829;','&#9830;');
		var arr2 = new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;',
			'&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;',
			'&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;',
			'&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;',
			'&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;',
			'&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;',
			'&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;',
			'&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;',
			'&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;',
			'&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;',
			'&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&oslash;','&ugrave;','&uacute;',
			'&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;',
			'&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;',
			'&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;',
			'&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;',
			'&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;',
			'&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;',
			'&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;',
			'&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;',
			'&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;',
			'&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;',
			'&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;',
			'&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;',
			'&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;',
			'&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;',
			'&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;',
			'&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;',
			'&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;',
			'&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');
    return this.swapArrayVals(s,arr1,arr2);
  },


  // Numerically encodes all unicode characters
  numEncode : function(s){
    
    if(this.isEmpty(s)) return "";

    var e = "";
    for (var i = 0; i < s.length; i++)
    {
      var c = s.charAt(i);
      if (c < " " || c > "~")
      {
        c = "&#" + c.charCodeAt() + ";";
      }
      e += c;
    }
    return e;
  },
  
  // HTML Decode numerical and HTML entities back to original values
  htmlDecode : function(s){

    var c,m,d = s;
    
    if(this.isEmpty(d)) return "";

    // convert HTML entites back to numerical entites first
    d = this.HTML2Numerical(d);
    
    // look for numerical entities &#34;
    arr=d.match(/&#[0-9]{1,5};/g);
    
    // if no matches found in string then skip
    if(arr!=null){
      for(var x=0;x<arr.length;x++){
        m = arr[x];
        c = m.substring(2,m.length-1); //get numeric part which is refernce to unicode character
        // if its a valid number we can decode
        if(c >= -32768 && c <= 65535){
          // decode every single match within string
          d = d.replace(m, String.fromCharCode(c));
        }else{
          d = d.replace(m, ""); //invalid so replace with nada
        }
      }     
    }

    return d;
  },    

  // encode an input string into either numerical or HTML entities
  htmlEncode : function(s,dbl){
      
    if(this.isEmpty(s)) return "";

    // do we allow double encoding? E.g will &amp; be turned into &amp;amp;
    dbl = dbl | false; //default to prevent double encoding
    
    // if allowing double encoding we do ampersands first
    if(dbl){
      if(this.EncodeType=="numerical"){
        s = s.replace(/&/g, "&#38;");
      }else{
        s = s.replace(/&/g, "&amp;");
      }
    }

    // convert the xss chars to numerical entities ' " < >
    s = this.XSSEncode(s,false);
    
    if(this.EncodeType=="numerical" || !dbl){
      // Now call function that will convert any HTML entities to numerical codes
      s = this.HTML2Numerical(s);
    }

    // Now encode all chars above 127 e.g unicode
    s = this.numEncode(s);

    // now we know anything that needs to be encoded has been converted to numerical entities we
    // can encode any ampersands & that are not part of encoded entities
    // to handle the fact that I need to do a negative check and handle multiple ampersands &&&
    // I am going to use a placeholder

    // if we don't want double encoded entities we ignore the & in existing entities
    if(!dbl){
      s = s.replace(/&#/g,"##AMPHASH##");
    
      if(this.EncodeType=="numerical"){
        s = s.replace(/&/g, "&#38;");
      }else{
        s = s.replace(/&/g, "&amp;");
      }

      s = s.replace(/##AMPHASH##/g,"&#");
    }
    
    // replace any malformed entities
    s = s.replace(/&#\d*([^\d;]|$)/g, "$1");

    if(!dbl){
      // safety check to correct any double encoded &amp;
      s = this.correctEncoding(s);
    }

    // now do we need to convert our numerical encoded string into entities
    if(this.EncodeType=="entity"){
      s = this.NumericalToHTML(s);
    }

    return s;         
  },

  // Encodes the basic 4 characters used to malform HTML in XSS hacks
  XSSEncode : function(s,en){
    if(!this.isEmpty(s)){
      en = en || true;
      // do we convert to numerical or html entity?
      if(en){
        s = s.replace(/\'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
        s = s.replace(/\"/g,"&quot;");
        s = s.replace(/</g,"&lt;");
        s = s.replace(/>/g,"&gt;");
      }else{
        s = s.replace(/\'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
        s = s.replace(/\"/g,"&#34;");
        s = s.replace(/</g,"&#60;");
        s = s.replace(/>/g,"&#62;");
      }
      return s;
    }else{
      return "";
    }
  },

  // returns true if a string contains html or numerical encoded entities
  hasEncoded : function(s){
    if(/&#[0-9]{1,5};/g.test(s)){
      return true;
    }else if(/&[A-Z]{2,6};/gi.test(s)){
      return true;
    }else{
      return false;
    }
  },

  // will remove any unicode characters
  stripUnicode : function(s){
    return s.replace(/[^\x20-\x7E]/g,"");
    
  },

  // corrects any double encoded &amp; entities e.g &amp;amp;
  correctEncoding : function(s){
    return s.replace(/(&amp;)(amp;)+/,"$1");
  },


  // Function to loop through an array swaping each item with the value from
  // another array e.g swap HTML entities with Numericals
  swapArrayVals : function(s,arr1,arr2){
    if(this.isEmpty(s)) return "";
    var re;
    if(arr1 && arr2){
      //ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
      // array lengths must match
      if(arr1.length == arr2.length){
        for(var x=0,i=arr1.length;x<i;x++){
          re = new RegExp(arr1[x], 'g');
          s = s.replace(re,arr2[x]); //swap arr1 item with matching item from arr2  
        }
      }
    }
    return s;
  },

  inArray : function( item, arr ) {
    for ( var i = 0, x = arr.length; i < x; i++ ){
      if ( arr[i] === item ){
        return i;
      }
    }
    return -1;
  }

}

// Initialize HTML decoder
Encoder.EncodeType = 'entity';

// *****************************************************************************
// eHarmony General
// *****************************************************************************

var PLUGIN_NAME = "Ultimate eHarmony Matches Table";

// Table headers
var MEMBERINFO = 'Match Details'
var COMMSTAGE = 'Communication Stage'
var NEXTSTEPS = 'Next Steps'
var PHOTO = 'Photo'
var CLOSE = 'Archive'

var debuggingLayout = false;

// Task priorities.
// PRI_FETCH_REASONLIST must be first, since the QuickClose buttons will not be
// created until it is complete.
// Note PRI_LOAD_THUMB must always be smaller than PRI_FETCH_PHOTO_LIST to
// ensure that thumbnail for current row is loaded before moving onto next row.
var PRI_FETCH_REASONLIST = 0;    // download list of possible close reasons
var PRI_CLOSEMATCH = 1;          // submit match close request
var PRI_ACTIVE_BIGPIC = 2;       // download shown big picture
var PRI_LOAD_THUMB = 3;          // create thumbnail in first column
var PRI_FETCH_DETAILS = 4;       // fetch details for match (e.g. height)
var PRI_FETCH_DETAILS_NO_THUMB = 4; // fetch details for row without thumbnail
var PRI_FETCH_CLOSED_REASON = 5; // fetch the reason why a match closed me
var PRI_BIGPIC0_PRELOAD = 6;     // download first big picture for a match
var PRI_BIGPIC_PRELOAD = 7;      // download rest of big pictures

var DETAILS_URL = '/singles/servlet/user/comm/review?set=';
var REQ_PHOTO_URL = '/singles/servlet/photonudge?set=';
var PAGING_URL = '/singles/servlet/user/mymatches?tabId={tab}&gotoPageNumber={page}';
var CLOSED_REASON_URL = '/singles/servlet/user/comm/closedreason?set=';
var CLOSE_URL = '/singles/servlet/user/comm/closematch?set=';
var CLOSE_NOW_URL = '/singles/servlet/user/comm/closematch?set={matchid}&chosenReasons={reasonid}&chooseClosed.x=empty';

// This is the link that eHarmony shows the first time you attempt to close a match who's
// account is closed.  It must be visited to actually close the match.
var CLOSEDACCOUNT_FOLLOWTHRU_URL = '/singles/servlet/user/comm/closedaccount?set={matchid}&closeMatch=true';

// Tabs
var TAB_CLOSED = 3;
var TAB_COMMUNICATING = 4;
var TAB_NEW = 1;

var currentTab = -1;

// Html which indicates we are viewing the matches on the Closed tab
var CLOSED_TAB_ACTIVE = '<li class="tab tabOn ui-tabs-selected"><a href="javascript:goToTab(3);">Closed</a></li>';
var onClosedTab = document.body.innerHTML.indexOf(CLOSED_TAB_ACTIVE) >= 0;

// Html which indicates an account is closed
var ACCOUNT_CLOSED = "<title>eHarmony - Member's Account Closed</title>";

// Sizing
var PADDING = 2; // table cell padding
var THUMB_HEIGHT = 50; // width scaled automatically
var CLOSEBUTTON_WIDTH = 45;
var CLOSEBUTTON_HEIGHT = 40;

// Timeouts
var LOADTHUMB_TIMEOUT = 10000;  // not the end of the world if it times out
var LOADBIGPIC_TIMEOUT = 25000;
var REQPHOTO_TIMEOUT = 20000;

var taskQueue = new TaskQueue();
var matchTable = document.getElementById('myMatchesTable');

// Each of these arrays are indexed by row
var photoSets = new Array();        // Photos objects
var bigImgs = new Array();          // IMG elements for large photos
var matchDetails = new Array();     // match details
var closedMeReasons = new Array();  // closed reasons
var reasonList = new Array();       // reasons available to close a match
var rowCloseStatus = new Array();   // current step in Close Match procedure
var rowCloseTimers = new Array();   // QuickClose undo delay timers

var includeReasons = null;          // not used
var QUICKCLOSE_DELAY = 6000;        // QuickClose undo allowed within this time
if (!QUICKCLOSE_REASON) {
  var QUICKCLOSE_REASON = "Other";  // Reason to give when QuickClosing a match
}
var quickCloseReasonId = null;      // corresponds to above (will be populated)

var POPOUT_COLOR = '#99CCFF';
var popoutDivs = new Array();
var highlightedRow = null;

// Hide ad (in a way which allows "Read More" button to still work)
function hideTopAd() {  
  var ad = document.getElementById('OUT8s');
  var adToggle = document.getElementById('OUT8t');
  // if (ad) log(ad.className);  
  if (ad && adToggle && Outline) {
    if (ad.className.indexOf('on') > 0) Outline(adToggle);
  }
  flashObject = null;
}

function hideOtherAds() {
  try {
    var divs = jQuery('.ad');
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.display = 'none';
    }
  } catch (ex) {
  }
}

// Attempt to identify id of current tab.  Returns -1 if unknown.
function getCurrentTab() {
  try {
    var li = jQuery(".tabOn");
    if (li.length != 1) return -1;
    var links = jQuery('a', li);
    if (links.length != 1) return -1;
    var p = new SimpleParser(links[0].href);
    var tab = new Number(p.extract("javascript:goToTab(", ");"));
    if (tab < 1 || tab > 9) return -1;
    return tab;
  } catch (ex) {
    return -1;
  }
}

// Make the page width strech/shrink with browser window size
function stretchPage() {
  jQuery('BODY').css('width', '100%');
  jQuery('BODY>DIV').css('width', '100%');
  jQuery('BODY>TABLE').css('width', '100%');
  jQuery('#orange>TABLE').css('width', '100%');
  jQuery('#nobg').css(
    {'width':'100%',
     'border':'none',
     'background-color':'#82C7EA'
    });
  // get rid of box border
  jQuery('BODY>.eh-footer').css('background', 'white');
  jQuery('#content-container').css('background', 'white');
  jQuery('#content-container').css('padding', '0px 0px');  
}

// Determine days elapsed since a day in mm/dd/yyyy or mm/dd/yy format
function elapsedDays(dateText) {
  var ms2day = 1/(1000*60*60*24);
  var today = new Date();
  try {
    var startDate = new Date(Date.parse(dateText));
    if (today.getYear() == startDate.getYear()
    		&& today.getMonth() == startDate.getMonth()
    		&& today.getDate() == startDate.getDate()) {
    	return 0;
   	} else {
    	return Math.round((today - startDate)*ms2day) - 1;
    }
  } catch (ex) {
    log("Error in elaspedDays: " + ex);
  }
}

function elapsedString(dateText) {
  var d = elapsedDays(dateText);
  if (d == 0) return 'today';
  if (d == 1) return 'yesterday';
  return d + ' days ago';  
}

function setStyleWidth(el, px) {
  el.style.width = px + 'px';
}

function setStyleHeight(el, px) {
  el.style.height = px + 'px';
}

function setStyleWidthHeight(el, w, h) {
  setStyleWidth(el, w);
  setStyleHeight(el, h);
}

// Create a button of the given dimensions, using the eHarmony orange
// button images.
function makeButton(content, width, height) {
  var button = document.createElement('A');
  button.className = 'btn btn6';
  setStyleWidth(button, width);
  setStyleHeight(button, height);  
  button.innerHTML = '<span>' + content + '</span>';
  // Allow buttons to be side-by-side
  button.style.cssFloat = 'left';
  button.style.marginLeft = '5px';
  return button;
}

// Returns all tasks of the given type which have a row field equal to that
// specified.  Specify null for all rows.
function findTasks(row, type) {
  var results = new Array();
  for (var i = 0; i < taskQueue.tasks.count(); i++) {
    var task = taskQueue.tasks.items[i];
    // log(task.constructor.name);
    if (task instanceof type) {
      if (task.row) {
        if (row == null || task.row == row) results.push(task);
      }
    }
  }
  return results;
}

// Sets priority of all tasks of the given type and row
function setPriority(row, type, newPriority) {
  var tasks = findTasks(row, type);
  for (var i = 0; i < tasks.length; i++) {
    // log('Setting priority on task #' + tasks[i].taskId + ' (' + 
    //   type.prototype.constructor.name + ') for row ' + row + 
    //   ' to ' + newPriority);
    tasks[i].priority = newPriority;
  }
}

// Initialize tasks that customize the matches table
function initTableTasks() {
  if (!onClosedTab) {
    if (columnIndex(CLOSE) == -1) appendColumn(CLOSE, null, CLOSEBUTTON_WIDTH + 2);
    //taskQueue.schedule(new FetchReasonListTask());

    // Initialize arrays and create Close buttons
    for (var i = 2; i < matchTable.rows.length; i++) {
      rowCloseStatus[i] = null;
      rowCloseTimers[i] = null;
      if (isDataRow(i)) initCloseColumnForRow(i);
    }

  }
  if (columnIndex(PHOTO) == -1) appendColumn(PHOTO, MEMBERINFO, 75);
  for (var row = 0; row < matchTable.rows.length; row++) {
    if (isDataRow(row)) {
      //taskQueue.schedule(new FetchPhotoListTask(row));
      taskQueue.schedule(new FetchDetailsTask(row));
      // Look for "Read Closed Message" button and fetch reason
      initClosedReason(row);
    }
  } 
}

function initCloseColumn() {
  // Above task will create buttons on successful completion
}

// *****************************************************************************
// eHarmony Matches Table Manipulation
// *****************************************************************************

// Return index of column with the given header text
function columnIndex(name) {
  // Search through header columns for one with the given text
  for (var i = 0; i < matchTable.rows[0].cells.length; i++) {
    if (matchTable.rows[0].cells[i].textContent == name) {
      return i;
    }
  }
  return -1;
}

function cell(row, col) {
  if (isNaN(col)) col = columnIndex(col); // convert name to index
  return matchTable.rows[row].cells[col];
}

function matchId(row) {
  // Parse ID from a hidden div in the "Match Details" column
  var idDiv = jQuery('.name-row',
    cell(row, columnIndex(MEMBERINFO)))[0];
  return idDiv.id.substring('ib-matchid-'.length);
}

function isDataRow(row) {
  if (row <= 0) return false;
  return matchTable.rows[row].cells.length == matchTable.rows[0].cells.length;
}

// Add a new column into the My Matches table
function appendColumn(name, before, width) {
  var idxToRight = before ? columnIndex(before) : null;
  var rightmostIdx = matchTable.rows[0].cells.length - 1;
  // Add header
  var header = document.createElement('TH');
  header.textContent = name;
  header.className = 'matchtop';
  if (width) setStyleWidth(header, width);
  if (before) {
    cell(0, 0).parentNode.insertBefore(header, cell(0, idxToRight))
  } else {
    cell(0, 0).parentNode.appendChild(header);
  }
  // Add body cells
  for (var i = 1; i < matchTable.rows.length; i++) {    
    var adjacentCell = before ? cell(i, idxToRight) : cell(i, rightmostIdx);
    if (adjacentCell) {
      newCell = document.createElement('TD');
      if (before) {
        cell(i, 0).parentNode.insertBefore(newCell, adjacentCell);
        //newCell.style.borderRight = '2px solid #FFFFFF'; // integrate with styling
      } else {
        cell(i, 0).parentNode.appendChild(newCell);
      }
    } else {
      // Increment colspan of last cell in row
      adjacentCell = cell(i, matchTable.rows[i].cells.length - 1);
      adjacentCell.colSpan = Number(adjacentCell.colSpan) + 1;
    }
  }
}

// Tracks parsing errors so we can abort tasks if we get too many
var parseErrorCount = 0;
function parseErrorCounter(increment) {
  if (increment) {
    parseErrorCount++;
    if (parseErrorCount == 5) {
      alert('Excessive parsing errors detected.  eHarmony may have '
          + 'changed their site to make it incompatible with the "'
          + PLUGIN_NAME + '" GreaseMonkey plugin.');
    }
  }
  return parseErrorCount >= 5;
}

function tweakTableCosmetics() {
  // Remove blank top spacer row from matches table
  if (matchTable.rows[1].cells.length == 1) {
    matchTable.rows[1].style.display = 'none';
  }
  // Reduce padding
  jQuery('#myMatchesTable td').css('padding', PADDING + 'px');
  // Minimum height of each row to fit pictures (so that rows don't enlarge
  // when picture downloads, which could mess up popout sizings)
  for (var i = 2; i < matchTable.rows.length; i++) {
    if (matchTable.rows[i].scrollHeight < (THUMB_HEIGHT + 4 * PADDING)) {
      setStyleHeight(matchTable.rows[i], THUMB_HEIGHT + 4 * PADDING);
    }
  }
}

// *****************************************************************************
// Popout stuff
// *****************************************************************************
function createPopoutDivs() {
  for (var i = 0; i <= 1; i++) {
    popoutDivs[i] = document.createElement('div');
    popoutDivs[i].style.position = 'absolute';
    popoutDivs[i].style.backgroundColor = POPOUT_COLOR;
    popoutDivs[i].style.display = 'none';
    document.body.appendChild(popoutDivs[i]);
  }
}

function prioritizeBigPicPreload(row, active) {
  var tasks = findTasks(row, LoadBigPicTask);
  for (var i = 0; i < tasks.length; i++) {
    tasks[i].setPriority(active);
  }
}

function unpopout(willPopoutAgain) {
  if (highlightedRow) {
    prioritizeBigPicPreload(highlightedRow, false);
    var td = cell(highlightedRow, 0);
    td.style.backgroundColor = '';
    popoutDivs[0].innerHTML = '';
    hideElement(popoutDivs);
    highlightedRow = null;
  }
}

function popMouseout(evt) {
  var toElement = evt.relatedTarget || evt.toElement;
  if (popoutDivs[1].contains(toElement)) return; // hovering over child element
  unpopout();
}

function stripEndingPx(sz) {
  if (sz == undefined || sz == null) return sz;
  s = sz.toString();
  if (s.substring(s.length - 2).toUpperCase() == 'PX') {
    s = s.substring(0, s.length - 2);
    return new Number(s); // make SURE we return it as a number
  } else {
    return sz;
  }
}

// Given an original width and height, this function scales both down as
// neccessary to fit within a maximum width and height, while maintaining
// the original aspect ratio.
function scaleToFit(orgWidth, orgHeight, maxWidth, maxHeight) {
  if (debuggingLayout) log ("ORGWIDTH: " + orgWidth);
  if (debuggingLayout) log ("ORGHEIGHT: " + orgHeight);
  if (debuggingLayout) log ("MAXWIDTH:" + maxWidth)
  if (debuggingLayout) log ("MAXHEIGHT:" + maxHeight)
  orgWidth = stripEndingPx(orgWidth);
  orgHeight = stripEndingPx(orgHeight);
  maxWidth = stripEndingPx(maxWidth);
  maxHeight = stripEndingPx(maxHeight);
  var aspect = orgWidth / orgHeight;
  var result = new Object();
  result.width = orgWidth;
  result.height = orgHeight;
  if (debuggingLayout) log ("RES.W: " + result.width);
  if (debuggingLayout) log ("RES.H: " + result.height);
  if (result.width > maxWidth) {
    if (debuggingLayout) log ("WIDTH")
    result.width = maxWidth;
    result.height = result.width / aspect;
  }
  if (result.height > maxHeight) {
    if (debuggingLayout) log ("HEIGHT")
    result.height = maxHeight;
    result.width = result.height * aspect;
  }
  return result;
}

function getOffset(el) {
	var result = new Object();
	result.left = el.offsetLeft;
	result.top = el.offsetTop;
	var p = el.offsetParent;
	while (p) {
		result.left += p.offsetLeft
		result.top += p.offsetTop;
		p = p.offsetParent;		
	}
	return result;
}

function layoutPopout() {
  var POPOUT_PADDING = 5;
  var contentDiv = popoutDivs[0];
  var cellDiv = popoutDivs[1];
  var td = cell(highlightedRow, 0);
  var index = contentDiv.current;

  if (debuggingLayout) log("LAYOUT")
  
  td.style.backgroundColor = POPOUT_COLOR;
  contentDiv.style.visibility = 'hidden'; // so we can read sizes
  contentDiv.style.display = '';
  contentDiv.style.padding = 0;

  // Position fixed values and calculate maximum size of popout
  contentDiv.innerHTML = ''; // clear
  contentDiv.style.left = getOffset(td).left + td.scrollWidth + 'px';
  var maxOuterWidth = document.body.scrollWidth - td.scrollWidth;
  var maxOuterHeight = window.innerHeight;

  if (debuggingLayout) log("maxOuterWidth : " + maxOuterWidth);
  if (debuggingLayout) log("maxOuterHeight : " + maxOuterHeight);

  // Get image and caption if available
  var img = bigImgs[highlightedRow][index];
  var caption = img.downloaded ? photoSets[highlightedRow][index].caption : "Downloading...";

  // Determine scaled image size (without caption for now)  
  var maxPicWidth = maxOuterWidth - 2 * POPOUT_PADDING;
  var maxPicHeight = maxOuterHeight - 2 * POPOUT_PADDING;
  if (maxPicWidth < 0) maxPicWidth = 0;
  if (maxPicHeight < 0) maxPicHeight = 0;  
  var picSize;
  if (img.downloaded) {
    if (debuggingLayout) log("Scaling pic : " + img.nativeWidth + ", " + 
      img.nativeHeight + " to max " + maxPicWidth + ", " + maxPicHeight);
    picSize = scaleToFit(img.nativeWidth, img.nativeHeight, maxPicWidth, maxPicHeight);    
    if (debuggingLayout) log("Now: " + picSize.width + ", " + picSize.height);
  }
  
  // Append caption
  var captionDiv = null;
  if (caption) {
    captionDiv = document.createElement('DIV');
    captionDiv.textContent = caption;
    if (!img.downloaded) captionDiv.style.fontWeight = 'bold';
    captionDiv.style.marginTop = POPOUT_PADDING / 2 + 'px';
    captionDiv.style.marginLeft = POPOUT_PADDING + 'px';
    // Set width in case picture is narrow and text must wrap
    if (img.downloaded) setStyleWidth(captionDiv, picSize.width);
    contentDiv.appendChild(captionDiv);
    maxPicHeight -= (captionDiv.scrollHeight);
    if (debuggingLayout) log("Caption height: " + captionDiv.scrollHeight);
    // Shrink image a little more to fit caption
    if (debuggingLayout) log("Scaling pic to max " + maxPicWidth + ", " + maxPicHeight);    
    picSize = scaleToFit(img.nativeWidth, img.nativeHeight, maxPicWidth, maxPicHeight);
  }
  
  // Set image size and append
  if (img.downloaded) {  
    img.width = picSize.width;
    img.height = picSize.height;
    img.style.width = picSize.width + 'px';
    img.style.height = picSize.height + 'px';
    img.style.visibility = '';
    img.style.marginTop = (captionDiv ? POPOUT_PADDING / 2 : POPOUT_PADDING) + 'px';
    img.style.marginLeft = POPOUT_PADDING + 'px';
    contentDiv.appendChild(img);
  } else {
    img.style.visibility = 'hidden';
    picSize = new Object();
    picSize.width = 100;
    picSize.height = THUMB_HEIGHT - captionDiv.scrollHeight - 2;
  }

  if (debuggingLayout) log("imgWidth: " + img.width);
  if (debuggingLayout) log("imgHeight: " + img.height);

  // Size the popout to its contents
  var width = picSize.width + 2 * POPOUT_PADDING;
  var height = picSize.height + 2 * POPOUT_PADDING;
  if (captionDiv) {
    height += (captionDiv.scrollHeight);
  }
  
  if (debuggingLayout) log("width: " + width);
  if (debuggingLayout) log("height: " + height);

  // Size the popout, being sure not to exceed maximum outer dimensions
  if (width > maxOuterWidth) width = maxOuterWidth;
  if (height > maxOuterHeight) height = maxOuterHeight;
  setStyleWidthHeight(contentDiv, width, height);
  if (debuggingLayout) log("scrollheight: " + contentDiv.scrollHeight);

  // Position popout so vertical midpoint is aligned with vertical midpoint of
  // related row.  If this causes overflow above/below the viewport, then slide
  // popout up/down to make it fully visible.
  var top = getOffset(td).top + td.scrollHeight / 2 - height / 2;
  if ((top + height) > (window.pageYOffset + window.innerHeight)) {
    top = window.pageYOffset + window.innerHeight - height;
  }
  if (debuggingLayout) log("top: " + top);

  if (top < window.pageYOffset) top = window.pageYOffset;
  if (debuggingLayout) log("top: " + top);

  contentDiv.style.top = top + 'px';
  if (debuggingLayout) log("Actual top: " + contentDiv.offsetTop);
  contentDiv.style.visibility = '';
  
  var thumbDiv = popoutDivs[1];
	thumbDiv.style.left = getOffset(td).left + 'px';
	thumbDiv.style.top = getOffset(td).top + 'px';
  setStyleWidthHeight(thumbDiv, td.scrollWidth, td.scrollHeight);
  contentDiv.style.zIndex = 998;
  thumbDiv.style.zIndex = 999;
  var anchor = document.createElement('A');
  anchor.href = img.src;
  anchor.onclick = function(){nextPhoto();return false};
  anchor.style.textDecoration = 'none';
  anchor.borderStyle = 'none';
  if (photoSets[highlightedRow].length == 1) {
  	anchor.innerHTML = centerInTable('This is the<br/>only photo');
  } else if (index == photoSets[highlightedRow].length - 1) {
  	anchor.innerHTML = centerInTable('Click for<br/>first photo');
  } else {
  	anchor.innerHTML = centerInTable('Click for<br/>next photo');
  }
  thumbDiv.innerHTML = '';
  thumbDiv.appendChild(anchor);
  thumbDiv.style.display = '';
  thumbDiv.onmouseout = popMouseout;
}

function popoutRow(row) {
  unpopout(true);
  highlightedRow = row;  
  popoutDivs[0].current = 0;
  layoutPopout();   
  prioritizeBigPicPreload(highlightedRow, true);
}

function nextPhoto() { 
  try {
    var div = popoutDivs[0];
    // don't allow user to cycle to next pic until current pic is downloaded
    if (!bigImgs[highlightedRow][div.current].downloaded) return;
    div.current++;
    if (div.current >= bigImgs[highlightedRow].length) div.current = 0;
    layoutPopout();
  } catch (ex) {
    log('Error in nextPhoto: ' + ex);
  }
}

// *****************************************************************************
// eHarmony Photo Column
// *****************************************************************************

// Information parsed from the Photos page for a match
function Photo() {
  this.url = '';
  this.caption = '';
  this.width = 0;
  this.height = 0;
  this.thumbUrl = '';
  this.thumbWidth = 0;
  this.thumbHeight = 0;
}

// Send photo request 'nudge' to a match
function reqPhoto(row) {
  var matchid = matchId(row);
  var div = document.getElementById('thumb' + matchid);
  if (!(div instanceof HTMLDivElement)) return;
  //div.style.fontSize = '10px';
  div.textContent = 'Requesting...';
  var _self = this;
  _self.photoReqRow = row;
  httpRequest(REQ_PHOTO_URL + matchid,
    function(req){reqPhotoComplete(_self.photoReqRow, req, true)},
    function(req){reqPhotoComplete(_self.photoReqRow, req, false)},
    null, REQPHOTO_TIMEOUT);    
}

function reqPhotoComplete(row, req, succeeded) {
  var div = document.getElementById('thumb' + matchId(row));
  if (succeeded) {
    p = new SimpleParser(req.responseText);
    var date = parsePhotoReqDate(p);
    if (date != null) {
      matchDetails[row].photoRequestedOn = date;
      div.innerHTML = 'Requested<br/>' + elapsedString(date);
      div.style.fontSize = '11px';      
    } else {
      div.textContent = 'Request Failed';
      log('Failed to request photo for row ' + row + ': ' + req.responseText.trim());
      return;
    }
  } else {
    div.textContent = 'Request Failed';
    log('Failed to request photo for row ' + row);
  }
}

function createEmptyThumbElement(row, isImg) {
  var id = 'thumb' + matchId(row);
  var el = document.getElementById(id);
  if (el) el.parentNode.removeChild(el);
  el = document.createElement(isImg ? 'IMG' : 'DIV');
  el.id = id;
  el.style.display = 'none';
  var td = cell(row, PHOTO);
  td.align = 'center';
  td.appendChild(el);
  return el;
}

function LoadThumbTask(row, photo) {
  
  this.priority = PRI_LOAD_THUMB;
  this.description = 'Load thumbnail for row ' + row;
  this.row = row;
  this.img = null;
  this.photoUrl = photo.thumbUrl;
  
  //log('Creating LoadThumbTask for row ' + row + ', ' +
  //  'src: ..' + this.photoUrl.substr(-10));  
  
  LoadThumbTask.prototype.run = function() {
    this.img = createEmptyThumbElement(row, true);
    var _self = this;
    this.img.parentNode.onmouseover = function(){popoutRow(_self.row)};
    taskQueue.hold(LOADTHUMB_TIMEOUT);    
    this.img.onload = function(){_self.onImageLoad()};        
    this.img.src = this.photoUrl;
  } 

  LoadThumbTask.prototype.expired = function() {
    log('Failed to download image ' + this.photoUrl);
    this.img.onload = null;
    taskQueue.release(this.taskId);
  }
    
  LoadThumbTask.prototype.onImageLoad = function() {
    var img = this.img;
    var aspect = img.width / img.height;
    img.height = THUMB_HEIGHT;
    img.width = img.height * aspect;
    img.style.display = '';
    taskQueue.release(this.taskId);    
  }
  
}

// *****************************************************************************
// eHarmony Match Details
// *****************************************************************************

// Information parsed from the Match Details page
function MatchDetails() {
  this.noLongerMember = false;
  this.name = '';
  this.photoRequestedOn = '';
  this.photoRequestable = false;
  this.height = '';
  this.photos = null;
}

function fillDetails(row, details) {
  // If no photos were available, fill thumbnail cell
  if (!photoSets[row] || photoSets[row].length == 0) {
    var div = createEmptyThumbElement(row, false);
    if (details.photoRequestedOn) {
      div.innerHTML = 'Requested<br/>' + elapsedString(details.photoRequestedOn);
      div.style.fontSize = '11px';
    } else {
      if (!onClosedTab && details.photoRequestable) {
        var anchor = document.createElement('A');
        anchor.onclick = function(){reqPhoto(row)};
        anchor.style.cursor = 'pointer';
        anchor.innerHTML = '<b>Request Photo</b>';
        div.appendChild(anchor);
      } else {
        div.style.fontSize = '11px';
        div.innerHTML = 'Photo Unavailable';
      }
    }
    div.style.display = '';
  }
  // Add match height
  if (details.height && details.height != '') {
    var div = cell(row, MEMBERINFO).childNodes[1];
    var span = document.createElement('SPAN');
    span.textContent = ', ' + details.height;
    div.appendChild(span);
  }
}

function FetchDetailsTask(row) {
  
  this.priority = PRI_FETCH_DETAILS;
  this.description = 'Fetch details for row ' + row;
  this.row = row;
  this.url = null;
  this.details = null;  
  
  // Spawn a request to the Details page for the match
  FetchDetailsTask.prototype.run = function() {
    if (parseErrorCounter()) return; // detect excessive parsing errors
    this.url = DETAILS_URL + matchId(this.row);
    var _self = this;
    httpRequest(this.url,
      function(req){_self.onDownload(req)},
      function(){_self.onDownloadFail()});
    taskQueue.hold(); // wait for request to finish
  }
  
  FetchDetailsTask.prototype.onDownload = function(req) {    
    
    // Parse the details page
    var html = req.responseText;
    try {
      this.details = parseDetails(html);
    } catch(ex) {
      log('Error parsing details page: ' + this.url);
      this.badhtml = html;
      parseErrorCounter(true);
      taskQueue.release(this.taskId);
      return;
    }    
    matchDetails[this.row] = this.details;
    photoSets[this.row] = this.details.photos;
    schedulePhotoTasks(this.row);
    fillDetails(this.row, this.details);    
    taskQueue.release(this.taskId);
  }
  
  FetchDetailsTask.prototype.onDownloadFail = function() {
    log('Failed to get details for row ' + this.row);
    taskQueue.release(this.taskId);
  }
    
}

// p is a SimpleParser
function parsePhotoReqDate(p) {
  if (p.seek('<div id="photo-nudge-sent">')) {
    if (p.seek('Photo Requested On:<br />')) {
      if (p.seek('\n')) { // extra blank line
        return p.extract('\n', '\n').trim();
      }
    }
  }
  return null;
}

// Parses the Details page for a match and returns a Details object
function parseDetails(html) {
  var details = new MatchDetails();
  var p = new SimpleParser(html);
  if (html.indexOf(ACCOUNT_CLOSED) > 0) {
    details.noLongerMember = true;
    return details;
  }
  p.seek('<span class="user-firstname" id="user-firstname">');
  details.name = p.extract('', '</span>').trim();
  details.photoRequestedOn = parsePhotoReqDate(p);
  details.photoRequestable = 
    html.indexOf(
    '<a href="javascript:photoNudgeUpdate(\'/singles/servlet/photonudge\', ')
    >= 0;
        
  // Parse height
  p.seek('<td class="header">Height:</td>');
  p.seek('<td class="info">');
  details.height = p.extract('', '</td>').trim();
   
  // Photo photo info (if available)
  var profilePhotosList = null; // medium size
  var iconPhotoList = null;     // small
  var normalPhotoList = null;   // full size
  p.cursor = 0;
  if (p.seek('var profilePhotoList = ')) {    
    profilePhotoList = eval(p.extract('','\n')) // medium size
  }
  if (p.seek('var iconPhotoList = ')) {   
    iconPhotoList = eval(p.extract('','\n')) // small
  }
  if (p.seek('var normalPhotoList = ')) {   
    normalPhotoList = eval(p.extract('','\n')) // full size
  }
  if (iconPhotoList && iconPhotoList.length > 0 && normalPhotoList
      && normalPhotoList.length == iconPhotoList.length) {
    details.photos = new Array();
    for (var i = 0; i < iconPhotoList.length; i++) {
      var photo = new Photo();
      photo.url = normalPhotoList[i].url;
      photo.width = normalPhotoList[i].width;
      photo.height = normalPhotoList[i].height;
      photo.caption = Encoder.htmlDecode(normalPhotoList[i].caption);
      photo.thumbUrl = iconPhotoList[i].url;
      photo.thumbHeight = iconPhotoList[i].height;
      photo.thumbWidth = iconPhotoList[i].width;
      details.photos.push(photo);
    }   
  }  
  
  return details;
  
}

function schedulePhotoTasks(row) {  
  var photos = photoSets[row];
  if (photos && photos.length > 0) {
    // Schedule tasks to create the thumbnail and Preload Big photos
    taskQueue.schedule(new LoadThumbTask(row, photos[0]));
    // Create bigpic IMG elements, and schedule tasks to download them
    bigImgs[row] = new Array();
    for (var i = 0; i < photos.length; i++) {
      var img = document.createElement('IMG');        
      bigImgs[row][i] = img;
      img.downloaded = false;        
      taskQueue.schedule(new LoadBigPicTask(row, i));
    }
  } else {
    // Bump up priority on the fetch details task, to fill the empty photo
    // space sooner.
    setPriority(row, FetchDetailsTask, PRI_FETCH_DETAILS_NO_THUMB);
  }
}

function LoadBigPicTask(row, index) {
  
  this.priority = (index == 0) ? PRI_BIGPIC0_PRELOAD : PRI_BIGPIC_PRELOAD;
  this.description = 'Preload bigpic ' + index + ' for row ' + row;
  this.row = row;
  this.index = index;
  this.url = null;  
  
  LoadBigPicTask.prototype.run = function() {    
    if (!photoSets[this.row] || photoSets[this.row].length == 0) {
      throw 'Error in LoadBigPicTask.run()';
    }
    this.url = photoSets[this.row][this.index].url;
    if (!this.url) return;
    var img = bigImgs[this.row][this.index];
    if (!img) {
      throw 'Error in LoadBigPicTask.run() - no bigImgs[' + this.row + '][' + this.index + ']';
    }
    var _self = this;
    taskQueue.hold(LOADBIGPIC_TIMEOUT);
    img.onload = function(){_self.onImageLoad()};
    img.src = this.url;
  } 

  LoadBigPicTask.prototype.expired = function() {
    taskQueue.release(this.taskId);
    log('Failed to download bigpic ' + this.url);    
    bigImgs[this.row][this.index].onload = null;
    this.finishUp();
  }
    
  LoadBigPicTask.prototype.onImageLoad = function() {
    taskQueue.release(this.taskId);
    var img = bigImgs[this.row][this.index];
    img.aspect = img.width / img.height;
    img.nativeWidth = img.width;
    img.nativeHeight = img.height;
    img.downloaded = true;
    this.finishUp();
    // If user waiting on image, populate it and re-layout the popout
    if (highlightedRow && this.row == highlightedRow && this.index == popoutDivs[0].current) {
      layoutPopout();      
    }
    // document.body.appendChild(img); // for debugging    
  }
  
  LoadBigPicTask.prototype.finishUp = function() {
    if (findTasks(null, LoadBigPicTask).length == 0) {
      window.status = 'Match photos finished preloading';
    }
  }

  LoadBigPicTask.prototype.setPriority = function(active) {
    if (active) {
      // log('Bumping priority on task #' + this.taskId + ' pic ' + this.index + ' for row ' + this.row);
      this.priority = PRI_ACTIVE_BIGPIC;      
    } else {
      // log('Returning priority on task #' + this.taskId + ' pic ' + this.index + ' for row ' + this.row);
      this.priority = (this.index == 0) ? PRI_BIGPIC0_PRELOAD : PRI_BIGPIC_PRELOAD;
    }
  }
    
}

// *****************************************************************************
// eHarmony - Functionality to popup Closed Reason on Hover
// *****************************************************************************

function rowHasClosedReason(row) {
  // Look for a button with a link to the page that shows why a match
  // closed me.
  return document.body.innerHTML.indexOf(CLOSED_REASON_URL + matchId(row)) >= 0;
}

// If specified row has a Read Closed Message button, schedule a task to fetch
// the closed reason and hook the button to pop up the reason when hovered over.
function initClosedReason(row) {  
  var link = getClosedReasonButtonForRow(row);
  if (!link) return;
  //var _self = this; // note this function can be called from within a loop
  link.onmouseover = function(evt){showClosedReasonPopup(evt, row, true)};
  link.onmouseout = function(evt){showClosedReasonPopup(evt, row, false)};
  taskQueue.schedule(new FetchClosedReasonTask(row));
}

function getClosedReasonButtonForRow(row) {
  if (!rowHasClosedReason(row)) return null;
  var matchid = matchId(row);
  var links = jQuery('A', cell(row, NEXTSTEPS));
  var s = CLOSED_REASON_URL + matchid;
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.substr(-s.length) == s) {     
      return links[i];
    }
  }
  return null;
}

function FetchClosedReasonTask(row) {
  
  this.priority = PRI_FETCH_CLOSED_REASON;
  this.description = 'Fetch closed reason for row ' + row;
  this.row = row;
  this.matchid = matchId(this.row);
  this.url = null;
  
  closedMeReasons[this.row] = '(Reason not yet downloaded)';
  
  // Spawn a request to the Closed Reason page for the match
  FetchClosedReasonTask.prototype.run = function() {
    if (parseErrorCounter()) return; // detect excessive parsing errors
    this.url = CLOSED_REASON_URL + this.matchid;
    var _self = this;
    httpRequest(this.url,
      function(req){_self.onDownload(req)},
      function(){_self.onDownloadFail()});    
    taskQueue.hold(); // wait for request to finish
  }
  
  FetchClosedReasonTask.prototype.onDownload = function(req) {    
    // Parse the closed reason page
    var html = req.responseText;
    closedMeReasons[this.row] = parseClosedReason(html, this.matchid);
    taskQueue.release(this.taskId);
  }
  
  FetchClosedReasonTask.prototype.onDownloadFail = function() {
    log('Failed to fetch close reason for row ' + this.row);
    closedMeReasons[this.row] = '(Failed to download closed reason)';
    taskQueue.release(this.taskId);
  }
    
}

function parseClosedReason(html, matchid) {
  if (html.indexOf(ACCOUNT_CLOSED) >= 0) return 'Account Closed';
  if (html.indexOf('?set=' + matchid) < 0) return null; // not recognized
  var p = new SimpleParser(html);
  if (!p.seek('chose to permanently close communication with you for the following reason')) return null;
  var reason = p.extract('<strong>', '</strong>');
  if (reason == null || reason == '') {
    log('Failed to parse close reason for match ' + matchid);
    parseErrorCounter(true);
    return '(Failed to parse close reason)';
  }
  return reason.trim();
}

function showClosedReasonPopup(evt, row, visible) {
  var popup = document.getElementById('CloseReasonPopup');
  if (visible) {
    var reason = closedMeReasons[row];
    if (!reason) reason = '(Could not determine close reason)';
    if (!popup) {
      popup = document.createElement('DIV');
      popup.id = 'CloseReasonPopup';
      popup.style.position = 'absolute';
      popup.style.padding = '5px';
      popup.style.backgroundColor = POPOUT_COLOR;
      popup.style.display = 'none';
      document.body.appendChild(popup);      
    }
    if (popup.style.display == '') return; // already shown
    popup.textContent = reason;
    popup.style.width = 'auto';
    popup.style.left = evt.pageX + 10 + 'px';
    popup.style.top = evt.pageY + 10 + 'px';
    popup.style.display = '';
  } else {
    if (popup.style.display == 'none') return;    
    var toElement = evt.relatedTarget || evt.toElement;
    var button = getClosedReasonButtonForRow(row);
    if (button.contains(toElement)) return; // hovering over child element
    popup.style.display = 'none';
  }
}

// *****************************************************************************
// eHarmony Quick Close
// *****************************************************************************

// For a bit of safety in case the site changes, the first task to run (unless
// on the Closed matches tab) goes to the Close page for a match and parses
// the list of Close Reasons.  The ID for the default Quick Close reason is
// looked up from it.
function FetchReasonListTask(row) {
  
  this.priority = PRI_FETCH_REASONLIST;
  this.description = 'Fetch list of close reasons';
  if (row) {
    this.row = row;
  } else {
    if (row == null) {
      // Prefer a row that isn't already closed (as it might lead to
      // Account Closed page)
      for (var i = 2; i < matchTable.rows.length; i++) {
        if (!rowHasClosedReason(i)) break;
      }
      if (i >= matchTable.rows.length) i = 2; // use first row if none found..
      this.row = i;
    }
  }
  this.description += ' using row ' + this.row;  
  this.url = null;
  
  // Spawn a request to the Close page for the first match on the page
  FetchReasonListTask.prototype.run = function() {
    this.url = CLOSE_URL + matchId(this.row);
    var _self = this;
    httpRequest(this.url,
      function(req){_self.onDownload(req)},
      function(){_self.onDownloadFail()});
    taskQueue.hold(); // wait for request to finish
  }
  
  FetchReasonListTask.prototype.onDownload = function(req) {
    // Parse the Close Match page
    var html = req.responseText;
    if (html.indexOf(ACCOUNT_CLOSED) >= 0) {      
      if (this.row == matchTable.rows.length - 1) {
        alert('Unable to download list of available close reasons.');        
      } else {
        // Try next row
        taskQueue.schedule(new FetchReasonListTask(this.row + 1));
      }
    } else {
      // Try to parse out reasons
      try {
        reasonList = parseReasonList(html);      
        //createCloseDialog();
        // Initialize arrays and create Close buttons
        for (var i = 2; i < matchTable.rows.length; i++) {
          rowCloseStatus[i] = null;
          rowCloseTimers[i] = null;
          if (isDataRow(i)) initCloseColumnForRow(i);
        }      
      } catch(ex) {
        alert('Failed to parse close reasons from ' + this.url);
      }
    }
    taskQueue.release(this.taskId);
  }
  
  FetchReasonListTask.prototype.onDownloadFail = function() {
    alert('Failed to retrieve close reasons from ' + this.url);
    taskQueue.release(this.taskId);
  }
  
}

function parseReasonList(html) {
  var list = new Array();
  var p = new SimpleParser(html);
  while (p.seek('<td><input type="checkbox" name="chosenReasons"')) {
    var reasonId = p.extract('value="', '"').trim();
    if ((new Number(reasonId)) != reasonId || reasonId < 0 || reasonId > 100) {
      throw 'Parsing error: Unreasonable reason ID';
    }
    p.seek('</td>');
    var reason = p.extract('<td>', '</td>').trim();
    if (reason == '' || reason.length < 3 || reason.length > 200) {
      throw 'Parsing error: Unreasonable reason text';
    }
    if (!includeReasons || includeReasons.indexOf(reason) >= 0) {
      if (reason == QUICKCLOSE_REASON) { // Always put at top of list
        list.unshift(reasonId, reason);
      } else {
        list.push(reasonId, reason);
      }
    }
  }
  if (list.length < 3) throw 'Parsing error: Not enough reasons found';
  if (list.indexOf(QUICKCLOSE_REASON) < 0) throw 'Parsing error: Reason "' + QUICKCLOSE_REASON + '" not found ';
  quickCloseReasonId = list[list.indexOf(QUICKCLOSE_REASON) - 1];
  return list;
}

// Dim out all cells of a row except the Close column
function dimRow(row, dimmed) {
  for (var i = 0; i < matchTable.rows[row].cells.length; i++) {
    if (i != columnIndex(CLOSE)) {
      matchTable.rows[row].cells[i].style.opacity = dimmed ? 0.2 : 1;
      matchTable.rows[row].cells[i].style.textDecoration = dimmed ? 'line-through' : '';
    }
  }  
}

// Update the UI for a row based on how far in the Close process we've gotten.
// Statuses are:
// - waiting: a timer is running which will create the CloseMatchTask.  This
//   gives a user the opportunity to cancel the request if they hit the button
//   by mistake.
// - queued: the CloseMatchTask has been scheduled.  Can still be canceled.
// - canceled: invoked by cancelQuickClose() to clear the timer, cancel the
//   task, and reset the UI to its original state.  This status is only present
//   while the cancel code is executing.
// - submitted: the CloseMatchTask is waiting for a response from the server
// - success: match has been closed
// - fail: the match could not be closed (due to server timeout or unexpected
//   response)
function updateCloseUI(row, step) {
  var button = document.getElementById('closeBtn' + row);
  var content = document.getElementById('closeBtnContent' + row);
  var td = cell(row, CLOSE);
  rowCloseStatus[row] = step;
  if (step == 'waiting' || step == 'queued') {
    dimRow(row, true);
    if (row % 2 != 0) td.style.backgroundColor = '#FCFCFC'; // try to match dimming
    button.onclick = function(){cancelQuickClose(row)};
    content.textContent = 'Cancel';
  } else if (step == 'canceled') {
    button.onclick = function(){startQuickClose(row)};
    content.textContent = 'Quick Close';
    dimRow(row, false);    
    td.style.backgroundColor = '';
    rowCloseStatus[row] = null;
  } else if (step == 'submitted' || step == 'redirecting') {    
    td.removeChild(button);
    td.textContent = 'Closing...';
  } else if (step == 'success') {
    td.textContent = 'Closed';
  } else if (step == 'fail') {
      td.textContent = 'Failed to Close';
  } else {
    throw 'Invalid step';
  }
}

function CloseMatchTask(row, reasonId) {
  
  this.priority = PRI_CLOSEMATCH;
  this.description = 'Close match for row ' + row;
  this.row = row;
  this.reasonId = reasonId;
  this.matchid = matchId(this.row);
  this.url = null;
  this.cancel = false;
  this.submitted = false;
  // Update UI
  updateCloseUI(this.row, 'queued');
  
  // Spawn a request to the Close page for the match
  CloseMatchTask.prototype.run = function() {
    if (this.cancel) return;    
    if (rowCloseStatus[this.row] != 'queued') {
      log('Invalid status detected in CloseMatchTask.run() for row ' + this.row);
      return;
    }
    if (parseErrorCounter()) return; // detect excessive parsing errors
    this.url = CLOSE_NOW_URL.replace('{matchid}', this.matchid).replace('{reasonid}', this.reasonId);
    //log('Submitting quickclose for row ' + row + ': ' + this.url);
    var _self = this;
    httpRequest(this.url,
      function(req){_self.onDownload(req)},
      function(){_self.onDownloadFail()});    
    taskQueue.hold(); // wait for request to finish
    this.submitted = true; // no longer cancelable
    updateCloseUI(this.row, 'submitted');
  }
  
  CloseMatchTask.prototype.onDownload = function(req) {  	
    var html = req.responseText;
    // Check if we hit the "Account Closed" page
    var close_closed_url = 
        CLOSEDACCOUNT_FOLLOWTHRU_URL.replace('{matchid}', this.matchid);
    if (html.indexOf(ACCOUNT_CLOSED) >= 0 && 
        html.indexOf(close_closed_url) >= 0) {          
      // This match's account has been closed.  "Click" the "followthru" link
      // to close it.
      if (this.url == close_closed_url) {
        // We already tried this.. don't redirect again
        log("Failed to a match who's account is closed: " + this.url);
      } else {
        this.description += ' (account is closed)';
        this.url = close_closed_url;
        var _self = this;
        httpRequest(this.url,
          function(req){_self.onDownload(req)},
          function(){_self.onDownloadFail()});    
      }
    } else {
      // Parse the details page
      if (parseClosedResult(html, this.matchid)) {
        updateCloseUI(this.row, 'success');
      } else {
        log('Response shows failed to close match: ' + this.url);
        updateCloseUI(this.row, 'fail');
      }
    }    
    taskQueue.release(this.taskId);
  }
  
  CloseMatchTask.prototype.onDownloadFail = function() {
    log('Failed to close match for row ' + this.row);
    updateCloseUI(this.row, 'fail');
    taskQueue.release(this.taskId);
  }
    
}

// returns True if closed, False otherwise
function parseClosedResult(html, matchid) {
  // Ensure the page has a list of matches
  if (html.indexOf('<table id="myMatchesTable"') < 0) return false;
  // Determine if the results we're getting back is a normal list of
  // matches, or the list of "Closed" matches
  var closedList = html.indexOf(CLOSED_TAB_ACTIVE) >= 0;
  // See if the match that we closed is on the page  
  var matchInList = html.indexOf('?set=' + matchid) >= 0;  
  
  if (closedList && matchInList) return true;
  if ((!closedList) && (!matchInList)) return true;
  return false;  
}

// Create the QuickClose button for a row
function initCloseColumnForRow(row) {
  var td = cell(row, CLOSE);
  td.style.fontSize = '11px';
  td.style.textAlign = 'center';
  td.innerHTML = ''; // clear any old
  var button = document.createElement('a');
  button.id = 'closeBtn' + row;
  button.style.fontSize = '11px';
  button.innerHTML = '<div id="closeBtnContent' + row + '">Quick Close</div>';
  button.onclick = function(){startQuickClose(row)};
  button.style.cursor = 'pointer';  
  td.appendChild(button);
}

// Called when the QuickClose button is clicked
function startQuickClose(row) {
  //console.log("Start quickclose " + row);
  if (rowCloseStatus[row] != null) return;
  updateCloseUI(row, 'waiting');
  rowCloseTimers[row] = setTimeout(function(){quickCloseRow(row)}, QUICKCLOSE_DELAY);
}

// Called when the QuickClose "Cancel" button is clicked
function cancelQuickClose(row) {
  //console.log('Cancel quickclose ' + row);
  if (rowCloseStatus[row] != 'waiting' && rowCloseStatus[row] != 'queued') {
    throw 'Invalid state sensed in cancelQuickClose(' + row + ')';
  }
  // Clear timer if set
  if (rowCloseTimers[row]) clearInterval(rowCloseTimers[row]);
  rowCloseTimers[row] = null;
  // Clear queued task if exists
  var tasks = findTasks(row, CloseMatchTask);
  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].submitted) {
      tasks[i].cancel = true;
    } else {
      alert('Error in cancelQuickClose(' + row + '): Task already submitted.');
      return;
    }
  }
  updateCloseUI(row, 'canceled');
}

// Called when the QuickClose "undo" period has elapsed
function quickCloseRow(row) {
  //console.log('Schedule quickclose ' + row);
  rowCloseTimers[row] = null;
  taskQueue.schedule(new CloseMatchTask(row, quickCloseReasonId));
}

// *****************************************************************************
// Elapsed Days stuff
// *****************************************************************************

function parseTitledDate(text, title) {
  var pos = text.indexOf(title);
  if (pos < 0) return '';
  text = text.substring(pos + title.length);
  try {
    return new Date(text);    
  } catch (ex) {
  }
  return '';
}

function changeDateDivToElapsed(div, title, newTitle) {
  var date = parseTitledDate(div.textContent, title);
  if (date != null) {
    div.textContent = newTitle + elapsedString(date);
  }
}

// Change match date to elapsed time
function changeMatchDateToElapsedTime() {
  var divs = jQuery('div.matchdate-row');
  for (var i = 0; i < divs.length; i++) {
    changeDateDivToElapsed(divs[i], 'matched on:', 'matched ');
  }
}

// Change last communicated date to elapsed time
function changeLastCommunicatedDateToElapsedTime() {
  var divs = jQuery('div.commDate');
  for (var i = 0; i < divs.length; i++) {
    changeDateDivToElapsed(divs[i], 'last communication:', 'last communicated ');
  }
}

// *****************************************************************************
// Pagignation stuff
// *****************************************************************************

function rewriteTabLinks() {
  if (currentTab == -1) return;
  // Start with all list items, pick those with 'tab' class, exclude those with
  // 'tabOn' class, return all child anchors.
  var links = jQuery('li.tab:not(.tabOn)>A');
  if (links.length != 2) return; // eHarmony changed them
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.substring(0, "javascript:".length) == "javascript:") {
      var scriptLink = links[i].href;
      var p = new SimpleParser(scriptLink);
      var tabId = p.extract("goToTab(", ")");
      if (tabId >= 1 && tabId <= 11) {
        links[i].href = PAGING_URL.replace('{tab}', tabId).replace('{page}', 1);
      }
    }    
  }  
}

function rewritePagingLinks() {  
  if (currentTab == -1) return;
  var links = jQuery(".pagelink");  
  if (links.length < 2 || links.length > 15) return;  // safety check
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.substring(0, "javascript:".length) == "javascript:") {
      var scriptLink = links[i].href;
      var p = new SimpleParser(scriptLink);
      var pageNum = p.extract("goToDirectPage('", "')");
      if (pageNum >= 1 && pageNum <= 15) {
        links[i].href = PAGING_URL.replace('{tab}', currentTab).replace(
          '{page}', pageNum);
      }
    }      
  }
}

function go() {
  currentTab = getCurrentTab(); // should be first
  hideTopAd();
  hideOtherAds();
  //stretchPage();
  tweakTableCosmetics();
  changeMatchDateToElapsedTime();
  changeLastCommunicatedDateToElapsedTime();
  createPopoutDivs();
  rewritePagingLinks();
  rewriteTabLinks();
  initTableTasks();
}

go();