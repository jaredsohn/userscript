// ==UserScript==
// @name           f0nt Shortcuts
// @namespace      f0nt
// @description    simply open all new krajoo in one press
// @include        http://www.f0nt.com/forum/index.php?action=unreadreplies
// @include        http://www.f0nt.com/forum/index.php?action=unread;all
// @include        http://www.f0nt.com/forum/*
// @include        http://*/index.php?action=unread;all
// ==/UserScript==

//======= shortcut.js ============
/**
* http://www.openjs.com/scripts/events/keyboard_shortcuts/
* Version : 2.01.B
* By Binny V A
* License : BSD
*
* Refactored by Nguyen Tien Dung ( http://free-and-happy.blogspot.com )
*/
 
window.shortcut = (function () {
 
  var defaultOptions = {
    type : 'keydown',
    propagate : false,
    disable : 'input textarea text',
    target : document,
    keycode : false
  };
 
  // Work around for Shift key bug created by using lowercase
  // as a result the shift+num combinationnation was broken
  var shiftNums = {
    '`':'~', '1':'!', '2':'@', '3':'#',
    '4':'$', '5':'%', '6':'^', '7':'&', '8':'*',
    '9':'(', '0':')', '-':'_', '=':'+', ';':':',
    "'":'"', ',':'<', '.':'>', '/':'?', '\\':'|'
  };
  
  // Special Keys and their codes
  var specialKeys = {
    'escape' :27,  'space'  :32,
    'return' :13,  'enter'  :13,
    'pause' :19,  'break'  :19,
    'insert' :45,  'home'  :36,
    'delete' :46, 'end' :35,
    'shift' : 16, 'Shift' : 16, 
    'ctrl' : 17,  'Ctrl' : 17, 
    'alt' : 18, 'Alt' : 18, 
    
 
    'backspace' :8, 'esc' :27, 'tab' :9,
    'scrolllock' :145, 'scroll_lock' :145, 'scroll' :145,
    'capslock' :20, 'caps_lock' :20, 'caps' :20,
    'numlock' :144, 'num_lock' :144, 'num' :144,
    'pageup' :33, 'page_up' :33, 'pu' :33,
    'pagedown' :34, 'page_down' :34, 'pd' :34,
 
    'left':37, 'up':38, 'right':39, 'down':40,
    'f1':112, 'f2':113, 'f3' :114, 'f4' :115,
    'f5':116, 'f6':117, 'f7' :118, 'f8' :119,
    'f9':120, 'f10':121, 'f11':122, 'f12' :123
  };
 
  var modifierMapping = {
    ctrl :'ctrl', control :'ctrl',
    shift :'shift', alt :'alt',
    option :'alt', meta :'meta'
  };
  var bindings = {};
 
  function triggeredInDisableTags(event, disableTags) {
    if (typeof disableTags !== 'string') return false;
 
    var element = event.target || event.srcElement;
    if (element.nodeType === 3)
      element = element.parentNode;
 
    return (disableTags.toLowerCase().indexOf(element.tagName.toLowerCase()) >= 0) ? true : false;
  }
  function matching(combination, options, e) {
    var i, key, modifier, wantKey;
    var want = {};
    var keys = combination.split('+');
    //Find Which key is pressed
    var code = e.keyCode || e.which;
    var char = { 188: ',', 190: '.' }[code] || String.fromCharCode(code).toLowerCase();
 
    // Modified 
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      wantKey = key;
      modifier = modifierMapping[key];
      
      if (modifier) {
        want[modifier] = true;
      }
    } // End for (..) 

    return (
    (wantKey === char  || specialKeys[wantKey] === code) &&
      !!want.shift === !!e.shiftKey &&
      !!want.ctrl === !!e.ctrlKey &&
      !!want.alt === !!e.altKey &&
      !!want.meta === !!e.metaKey 
    );
  }
 
  // Return the function to be called at keypress
  function makeKeypressedFun( combination, callback, options ) {
    return function( e ) {
      e = e || window.event;
 
      if ( triggeredInDisableTags(e, options.disable) ||
         !matching(combination, options, e) ) return;
 
      callback(e);
      if( !options.propagate ) {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
      }
    };
  }
   
return /*shotcut*/ {
  add: function(combination, callback, options) {
    options = options || {};
 
    for (var name in defaultOptions)
      if (!options.hasOwnProperty(name))
        options[name] = defaultOptions[name];
    
    var ele = options.target;
 
    if(typeof ele === 'string')
      ele = document.getElementById(ele);
 
    var func = makeKeypressedFun( combination, callback, options );
    
    bindings[combination.toLowerCase()] = {
      'callback' : func,
      'target'   : ele,
      'event' : options.type
    };
 
    //Attach the function with the event
    if (ele.addEventListener)
        ele.addEventListener(options.type, func, false);
    else
    if (ele.attachEvent)
        ele.attachEvent('on' + options.type, func);
    else
      ele['on' + options.type] = func;
  },
 
  //Remove the shortcut - just specify the shortcut and I will remove the binding
  remove: function(combination) {
    combination = combination.toLowerCase();
    var binding = bindings[combination];
 
    delete bindings[combination];
 
    if( !binding ) return;
    
    var type = binding.event;
    var ele = binding.target;
    var callback = binding.callback;
 
    if (ele.detachEvent)
        ele.detachEvent('on'+type, callback);
    else
    if (ele.removeEventListener)
        ele.removeEventListener(type, callback, false);
    else
      ele['on'+type] = false;
  }  
};
})();

//======Mycode Start Here =========
function keepStar() {
  var links = document.links;
  for(var i = 0; i < links.length; i++) {
    if(links[i].href.match("topicseen.html#new")) {
      window.open(links[i].href);
      //chrome.tabs.create( { url: links[i].href} );
    }
  }
}
function nextPost() {
alert("next Post");
  var mybody = document.getElementsByTagName("body")[0];
  mytable       = mybody.getElementsByTagName("table");
  mytablebody = mytable.getElementsByTagName("tbody");

  for(var i = 0; i < mytable.length; i++) {
     alert(mytable[i].className);
  }
  
}
function reply() {
  var pageLinks = document.links;
  for(var i = 0; i < pageLinks.length; i++) {
    if(pageLinks[i].href.match("action=post;topic")) {
      window.location.replace(pageLinks[i].href);
      break;
    }
  }
}
function nextPage() {
  var pageNumber = {};
  var pageAddress = {};
  var pageLinks = document.links;
  var counter = 0;
  var isFirstPage = true;
  for(var i = 0; i < pageLinks.length; i++) {
    if(pageLinks[i].className.match("navPages")) {
      pageAddress[counter] = pageLinks[i].href;
      pageNumber[counter] = pageLinks[i].text;
      counter++;
    }
  }  
  //pageLength = pageLinks/2;
  counter = (counter/2) + (counter%2);
  for(var i = 0; i<counter; i++) {
  //alert(pageNumber[i]);
    if((parseInt(pageNumber[i+1]) - parseInt(pageNumber[i])) == 2) {
      window.location.replace(pageAddress[i+1]);
      isFirstPage = false;
      break;
    }
  } 
  if (isFirstPage && (pageNumber[0] != '1')) {
    window.location.replace(pageAddress[0]);
  }
}
function prevPage() {
  var pageNumber = {};
  var pageAddress = {};
  var pageLinks = document.links;
  var counter = 0;
  var isLastPage = true;
  for(var i = 0; i < pageLinks.length; i++) {
    if(pageLinks[i].className.match("navPages")) {
      pageAddress[counter] = pageLinks[i].href;
      pageNumber[counter] = pageLinks[i].text;
      counter++;
    }
  }  
  counter = (counter/2) + (counter%2);
  for(var i = 1; i<counter; i++) {
  //alert(pageNumber[i]);
    if((parseInt(pageNumber[i]) - parseInt(pageNumber[i-1]))  == 2 ) {
      window.location.replace(pageAddress[i-1]);
      isLastPage = false;
      break;
    }
  }
  if (isLastPage && (pageNumber[0] != '2')) {
    window.location.replace(pageAddress[counter-1]);
  }
}
function init() {
  shortcut.add("shift+a", function() {
    keepStar();
  });
  shortcut.add("right", function() {
    nextPage();
  });
  shortcut.add("left", function() {
    prevPage();
  });
  shortcut.add("shift+w", function() {
    window.open("http://www.f0nt.com/forum/index.php?action=who");
  });
  shortcut.add("shift+r", function() {
    reply();
  });
    shortcut.add("j", function() {
    nextPost();
  });
}
function addEvent(obj, evType, fn){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, true);
    return true;
  } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
    return false;
  }
}

addEvent(window, 'load', init);