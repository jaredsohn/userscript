// ==UserScript==
// @name        Arrow navigation on E-Hentai (Quick Browse only)
// @namespace   http://userscripts.org/users/487476
// @description Enables use of the arrow keys to browse galleries when the Quick Browse perk is used
// @include     http://g.e-hentai.org/s/*
// @include     http://exhentai.org/s/*
// @version     1.0
// ==/UserScript==

Element.prototype.fireEvent = function(type){
  type = (type.substring(0,2) == 'on') ? type.substr(2) : type;
  var eventObject;
  switch(type){
    case 'DOMActivate':
    case 'DOMFocusIn':
    case 'DOMFocusOut':
      // UIEvent
      eventObject = this.ownerDocument.createEvent('UIEvents');
      eventObject.initUIEvent(type, true, true, this.ownerDocument.defaultView, 1);
      break;

    case 'click':
    case 'mousedown':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'mouseup':
    case 'contextmenu': // proprietary Gecko event
      // MouseEvent
      eventObject = this.ownerDocument.createEvent('MouseEvents');
      eventObject.initMouseEvent(type, true, true, this.ownerDocument.defaultView, 1, 
                                 this.ownerDocument.body.getBoundingClientRect().left, 
                                 this.ownerDocument.body.getBoundingClientRect().top, 
                                 0, 0, false, false, false, false, 0, this);
      break;

    case 'keydown':
    case 'keypress':
    case 'keyup':
      // Gecko-only KeyEvent - to be replaced by TextEvent in DOM3 Events
      eventObject = this.ownerDocument.createEvent('KeyEvents');
      eventObject.initKeyEvent(type, true, true, this.ownerDocument.defaultView, false, false, false, false, 0, 0);
      break;

    case 'DOMAttrModified':
    case 'DOMCharacterDataModified':
    case 'DOMNodeInserted':
    case 'DOMNodeInsertedIntoDocument':
    case 'DOMNodeRemoved':
    case 'DOMNodeRemovedFromDocument':
    case 'DOMSubtreeModified':
      // MutationEvent
      eventObject = this.ownerDocument.createEvent('MutationEvents');
      eventObject.initMutationEvent(type, true, false, this, null, null, null, MutationEvent.MODIFICATION);
      break;

    case 'abort':
    case 'blur':
    case 'change':
    case 'error':
    case 'focus':
    case 'load':
    case 'reset':
    case 'resize':
    case 'select':
    case 'scroll':
    case 'submit':
    case 'unload':
      // HTMLEvent
      eventObject = this.ownerDocument.createEvent('HTMLEvents');
      eventObject.initEvent(type, true, true);
      break;

    default:
      // CustomEvent
      eventObject = this.ownerDocument.createEvent('Events');
      eventObject.initEvent(type, true, true);
  }
  this.dispatchEvent(eventObject);
}

var global = {};

global.eventHandler = function(e){
  if(e.keyCode == 37){
    if(current_page <= page_min){
      document.getElementsByClassName("sb")[0].children[0].fireEvent('onclick');
    }else{
      change_prev();
    }
  }
  if(e.keyCode == 39){
    if(current_page >= page_max){
      document.getElementsByClassName("sb")[0].children[0].fireEvent('onclick');
    }else{
      change_next();
    }
  }
};

global.eventListener = document.addEventListener("keydown", global.eventHandler, true);