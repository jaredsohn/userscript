// ==UserScript==
// @name           SpiralFrog
// @namespace      SpiralFrog
// @include        http://www.spiralfrog.com/*
// ==/UserScript==


function simulateClick(node) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, node.ownerDocument.defaultView, 1, 50, 50, 50, 50, false, false, false, false, 0, node);
    node.dispatchEvent(event);
}
 
checkfordownloadbutton();
function checkfordownloadbutton(){
	var button = document.getElementById('ctl00_ContentPlaceHolder2_DlManager1_uiBtnNext');
  if(button){
		simulateClick(button);
  }
  window.setTimeout(checkfordownloadbutton, Math.round(Math.random()*30000+30000));
}