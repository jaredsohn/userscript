// ==UserScript==
// @author			Mark Husson (with simulateClick function by Mihai Parparita. Google Reader Blog Post: http://googlereader.blogspot.com/2005/11/warning-geekery-ahead.html)
// @name           Google Reader Auto-Read
// @namespace      http://userscripts.org/people/99
// @description    A good (but slooow) way of marking all items as read. Might want to run this in a background tab or when you go to sleep. change the "speed" variable to make it faster
// @include        http://www.google.com/reader*
// @include        http://google.com/reader*
// 
// Updated: 6/27/06
// ==/UserScript==

	var speed = 1500; //(In miliseconds)
	var sd, newElement, to;
	sd = document.getElementById("starred-selector");
	
	if (sd) {
		newElement = document.createElement('div');
		newElement.id = "newDiv";
		newElement.className = "item";
		newElement.innerHTML="<a href='javascript:autoRead(\"start\");' class='title'>Start Auto-Read</a>";
		sd.parentNode.insertBefore(newElement, sd.nextSibling);
	}
	
	unsafeWindow.autoRead=function(control){
		if(control == "start"){
			simulateClick(getNode("queue-down"));
			if(!to){
				document.getElementById("newDiv").innerHTML="<a href='javascript:autoRead(\"stop\");' class='title'>Stop Auto-Read</a>";
			}
			to = window.setTimeout("autoRead('start')", speed);
		}else if(control == "stop"){
			window.clearTimeout(to);
			document.getElementById("newDiv").innerHTML="<a href='javascript:autoRead(\"start\");' class='title'>Start Auto-Read</a>";
			to = false;
		}
	}


	
	function getNode(id) {
    return document.getElementById(id);
  }
  
  function simulateClick(node) {
    var event = node.ownerDocument.createEvent("MouseEvents");
  
    event.initMouseEvent("click",
                         true, // can bubble
                         true, // cancellable
                         node.ownerDocument.defaultView,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         node);
  
    node.dispatchEvent(event);
  }
