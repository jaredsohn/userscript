// Kadabra New Comments script
// version 0.1 
// Спасибо за идею и часть кода  Paul Wright и его скрипту LJ New Comments
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name          Kadabra New Comments
// @description   Позволяет быстро переходить между новыми комментариями
// @include       http://*.autokadabra.ru/*
// @include       http://autokadabra.ru/*
// ==/UserScript==

// Work around Firefox 1.5 memory leak with event listeners.
// See http://www.squarefree.com/2006/02/04/memory-leak-progress/
// and http://thread.gmane.org/gmane.comp.mozilla.firefox.greasemonkey/7321
// Code from Andre (gm at andrecgn dot de)
EventManager= {
   _registry: null,
   Initialise: function() {
     if (this._registry == null) {
       this._registry = [];
       EventManager.Add(window, "_unload", this.CleanUp);
     }
   },
   Add: function(obj, type, fn, useCapture) {
     this.Initialise();
     if (typeof obj == "string")
       obj = document.getElementById(obj);
     if (obj == null || fn == null)
       return false;
     if (type=="unload") {
         // call later when CleanUp is called. don't hook up
         this._registry.push({obj:obj, type:type, fn:fn,
useCapture:useCapture});
         return true
     }
     var realType=(type=="_unload"?"unload":type);
     obj.addEventListener(realType, fn, useCapture);
     this._registry.push({obj:obj, type:type, fn:fn,
useCapture:useCapture});
     return true;
   },
   CleanUp: function() {
     for (var i = 0; i < EventManager._registry.length; i++) {
       with(EventManager._registry[i]) {
         if(type=="unload") {
             fn();
         } else {
             if (type=="_unload") type = "unload";
             obj.removeEventListener(type,fn,useCapture);
         }
       }
     }
     EventManager._registry = null;
   }
};


function ScrollToElement(theElement){
 //alert('scroll func');
  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY);

}

var newComments=new Array();
var newCommentsCount;
var current;

newCommentsCount=0;
current=0;

// Handle keypresses on the individual entry and on entries/friendlist pages
function keypress_handler(event)
{
    var t = event.target;
    if (t && t.nodeName && (t.nodeName == "INPUT" || t.nodeName == "SELECT" || t.nodeName == "TEXTAREA"))
        return;

    // Return if any modifier is active, so we don't handle e.g. ctrl+n
    if(event.ctrlKey || event.altKey  || event.ctrlKey  || event.metaKey  || event.shiftKey)
        return;


    if (event.which != 110 && event.which != 112 && event.which != 1090)
        return;
    var obj;
    
    if (event.which == 110 || event.which == 1090) // 'n'
    {
	if (newCommentsCount>0) {
		if (current<newCommentsCount) {
			//alert('scroll');
			ScrollToElement(newComments[current]);
			current++;
		}
	}
	}
    
}//end keypress_handler

//получим список новых комментариев
allDivs = document.evaluate("//li",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
 
    a=thisDiv.className;
    
    if (a.match("comment") && a.match("new")) {
	//нашли новый комментарий
	divid=thisDiv.id;
	newComments[newCommentsCount]=thisDiv;
	newCommentsCount++;
    }
   
}//end for var i=0

//alert('New comments ' + newCommentsCount);
EventManager.Add(document, "keypress", keypress_handler, true);