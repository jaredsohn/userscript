// ==UserScript==
// @name           RmEvents
// @namespace      http://www.twitter.com/0x7E
// @description    Remove all event handlers
// @run-at         document-start
// ==/UserScript==


(function() { 

function RMchilds(node){

  if (node.hasChildNodes()){
	while (node.childNodes.length >= 1){
		node.removeChild(node.firstChild);       
	}
   }
}

var eventees = ['onmousedown','onmouseup','onclick','ondblclick','onmouseover','onmouseout','onmousemove','oncontextmenu','onkeydown','onkeyup','onkeypress','onfocus','onblur','onload','onunload','onabort','onerror','onsubmit','onreset','onchange','onselect','oninput','onpaint','ontext','onpopupShowing','onpopupShown','onpopupHiding','onpopupHidden','onclose','oncommand','onbroadcast','oncommandupdate','ondragenter','ondragover','ondragexit','ondragdrop','ondraggesture','onresize','onscroll','overflow','onunderflow','onoverflowchanged','onsubtreemodified','onnodeinserted','onnoderemoved','onnoderemovedfromdocument','onnodeinsertedintodocument','onattrmodified','oncharacterdatamodified'];

try {

var lm = document.getElementsByTagName("*");

for(var i=0;i<lm.length;i++){

    for(j=0;j<eventees.length;j++) {
	lm[i].removeAttribute(eventees[j]);
     }
}

} catch(e) {}

})();