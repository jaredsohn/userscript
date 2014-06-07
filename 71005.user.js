// ==UserScript==
// @name GMail Tasks Keyboard Focus
// @namespace	http://twitter.com/greasemonkey/
// @description	Adds a "t" shortcut that moves keyboard focus to the first task. This is particularly useful when having created a new task from an email ("T") you need to retitle the task. 
// @include http://mail.google.com/*
// @include https://mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
  document.addEventListener('keydown', keyHandler, false);
}, true);

function keyHandler(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" || 
        (targetNodeName == "input" && event.target.type && 
         (event.target.type.toLowerCase() == "text" || 
          event.target.type.toLowerCase() == "file")) ||
        (targetNodeName == "html" && 
         event.target.childNodes[1].className.indexOf('editable') != -1) ||
        (targetNodeName == "div" && event.target.className == "EY")) {
      return;
    }
  }
  var k = event.keyCode;
  if (k == 84) {
    focusFirstTask();
    event.stopPropagation();
    event.preventDefault();
  }
  return false;
}

function focusFirstTask() {
  var tasks = top.document.getElementById('tasksiframe');
  if (tasks == null) return;
  var firstTask = tasks.contentDocument.evaluate('//div[@class="EY"]', 
    tasks.contentDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
    null).snapshotItem(1);
  firstTask.focus();
}
