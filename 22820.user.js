// ==UserScript==
// @name           Librarything Macros
// @namespace      
// @include        http://www.librarything.com/talk.php*
// @include        http://www.librarything.com/talk
// ==/UserScript==

//TODO: fix scrolling when row is off page, fix n/p when deleting a row

var cRow = 0; 

const ACTIONS = {
  // d: archive and mark as read, i.e. discard
  68: function() {
	var r = $('r'+cRow);
	if(r)
		window.location = r.childNodes[4].firstChild.firstChild.href;
  },
  //s: star the topic 
  83: function() {
	var r = $('r'+cRow);
	if(r)
		simulateClick(r.childNodes[1].firstChild, 'click', 0);
  },
  //v: view topic 
  86: function() {
	var r = $('r'+cRow);
	if(r)
		simulateClick(r.childNodes[0], 'click', 1);
  },
  //u: view the unread items 
  85: function() {
	var r = $('r'+cRow);
	if(r)
		window.location = r.childNodes[2].firstChild.firstChild.firstChild.href;
  },
  //n: next item
  78: function() {
	move(true);
  },
  //p: previous item
  80: function() {
	move(false);
  }
};

//true is next, false is previous
function move(dir){
	dir ? cRow++ : cRow--; 
	var r = $('r'+cRow);
	if(r){
		colorRow(r, true);
		colorRow($('r'+(dir?cRow-1:cRow+1)), false);
	}
	else 
		dir ? cRow-- : cRow++; 
}

function colorRow(row, highlight){
	if(row == null) return;
	if(highlight)
		row.style.background = '#FFE0A8';
	else 
		row.style.background = row.getAttribute('style') == '' ? '' : '#f5f6fa';
}

function simulateClick(node, eventType, button) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(eventType,
                       true, // can bubble
                       true, // cancellable
                       node.ownerDocument.defaultView,
                       1, // clicks
                       50, 50, // screen coordinates
                       50, 50, // client coordinates
                       false, false, false, false, // control/alt/shift/meta
                       button, // button,
                       node);

  node.dispatchEvent(event);
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         (event.target.type.toLowerCase() == "text" ||
          event.target.type.toLowerCase() == "file"))) {
      return;
    }
  }
  
  var k = event.keyCode;
    
  if (k in ACTIONS) {
    ACTIONS[k]();
    return;
  }
  
  return;
}

function $(id){
	return document.getElementById(id);
}

window.addEventListener('keydown', keyHandler, false); 

