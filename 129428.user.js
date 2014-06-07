// ==UserScript==
// @name CAPITAL!1!
// @author SEAN C MONAHAN
// @version 1.0
// @description NAPPIERIZES EVERYTHING
// @match *://*/*
// @license MIT License
// ==/UserScript==


//NAPPIERIZE EVERYTHING
function NAPPIERIZE(STR) {
  return STR.toUpperCase();
}

var TEXT_NODE = Node.TEXT_NODE || 3;
var REPLACING_CONTENT = false;

function REPLACE_TEXT_CONTENT(NODE) {
  //FLAG THAT CONTENT IS BEING REPLACED SO THE EVENT IT GENERATES
  //WON'T TRIGGER ANOTHER REPLACEMENT
  REPLACING_CONTENT = true;
  NODE.textContent = NAPPIERIZE(NODE.textContent);
  REPLACING_CONTENT = false;
}

function CHANGE_TEXT_NODES(NODE) {
  var LENGTH, CHILD_NODES;
  //IF THIS IS A TEXT NODE, NAPPIERIZE IT
  if (NODE.nodeType == TEXT_NODE) {
    REPLACE_TEXT_CONTENT(NODE);
  //IF THIS IS ANYTHING BUT A TEXT NODE, RECURSE ITS CHILDREN
  } else {
    CHILD_NODES = NODE.childNodes;
    LENGTH = CHILD_NODES.length;
    for(var I=0; I<LENGTH; ++I){
      CHANGE_TEXT_NODES(CHILD_NODES[I]);
    }
  }
}

function INSERTION_LISTENER(EVENT) {
  //CHANGE ANY NEW TEXT NODES IN A NODE THAT IS ADDED TO THE BODY
  CHANGE_TEXT_NODES(EVENT.target);
}

function CDM_LISTENER(EVENT) {
  //AVOID INFINITE LOOP BY IGNORING EVENTS TRIGGERED BY REPLACEMENT
  if(!REPLACING_CONTENT){
    REPLACE_TEXT_CONTENT(EVENT.target);
  }
}

CHANGE_TEXT_NODES(document.body);
document.title = NAPPIERIZE(document.title);
document.body.addEventListener ("DOMNodeInserted", INSERTION_LISTENER, false);
document.body.addEventListener ("DOMCharacterDataModified", CDM_LISTENER, false);