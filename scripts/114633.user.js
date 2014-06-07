// ==UserScript==
// @name           Google music controls
// @description    Control google music with the media keys
// @namespace      rippinblaise
// @include        http://music.google.com/*
// @version        0.1
// ==/UserScript==

//start preferences
var playbutton = 179;
var nextbutton = 176;
var prevbutton = 177;
//end preferences

/* function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
*/

function start(e) {
  if (e.keyCode == playbutton && !e.ctrlKey) {
	replicateClick(document.getElementById('playPause'));
  }
  else if (e.keyCode == nextbutton && !e.ctrlKey) {
    replicateClick(document.getElementById('ff'));
  }
  else if (e.keyCode == prevbutton && !e.ctrlKey) {
    replicateClick(document.getElementById('rew'));
  }
  else {
    return;
  }
}

function triggerMouseEvent(element, eventname){
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent(eventname, true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, element);
  element.dispatchEvent(event);
}
function replicateClick(element){
  triggerMouseEvent(element, 'mousedown');
  triggerMouseEvent(element, 'mouseup');
}


window.addEventListener('keydown', start, true);
