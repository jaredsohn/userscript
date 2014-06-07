// ==UserScript==
// @name           No Global Mouse Events
// @description    Remove the "oncopy" attribute from the body
// ==/UserScript==

void(function() {


var deleteFunction = function() {


  var evt, bd, eventHandlerNames;

  eventHandlerNames = ["onunload", "onmousedown", "onmouseup", "onselect", "onchange","oncut", "oncopy", "onpaste","oncontextmenu","onselectstart" ];

  bd = document.body;


  for each(evt in eventHandlerNames) {

      if( bd.hasAttribute(evt) ){ 
      
          bd.setAttribute(evt, "");
      
       }

  }
        



};


//setInterval(deleteFunction, 200);
setTimeout(deleteFunction, 200);


})();