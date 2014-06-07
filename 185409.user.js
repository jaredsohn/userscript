// ==UserScript==
// @name       Github Vim Controls
// @version    0.1
// @description  Vim controls while viewing Github repos
// @match      https://github.com/*/*
// @exclude    https://github.com/*/*/edit/*
// @exclude    https://github.com/*/*/issues/*
// @exclude    https://github.com/*/*/issues
// @exclude    https://github.com/*/*/pulls/*
// @exclude    https://github.com/*/*/pulls
// @copyright  2013+, Matt Kula
// ==/UserScript==

var domString = '.content';
var files = $(domString);
var positionStack = [];
var position = 0;
var modifierState = 0;

var isEditing = false;

changeOpacity();

function reset(){
  if(files[0] == $(domString)[0]){
    setTimeout(reset, 300);
    return;
  }
  files = $(domString)
  changeOpacity();
}

// Moving up a directory
function forward() {
  positionStack.push(position);
  position = 0;
  reset();
}

// Moving down a directory
function backward() {
  if(positionStack.length > 0)
    position = positionStack.pop();
  else 
    position = 0;
  reset();
}

function changeOpacity() {
  files.css('opacity', '1');
  $(files[position]).css('opacity', '0.5');
}

window.onpopstate = backward;

var EventHolder = {
  // j key
  106 : function() {
    position += 1;
    if(position == files.length)
      position -= 1;
    changeOpacity();
  },

  // k key
  107 : function() {
    position -= 1;
    if(position < 0)
      position = 0;
    changeOpacity();
  },

  // Enter key
  13 : function() {
    $(files[position]).find('a').click();
    forward();
  },

  // h key
  104 : function(){
    window.history.back();
  },

  // l key
  108 : function() {
    $(files[position]).find('a').click();
    forward();
  },

  // Shift + open bracket
  123 : function() {
    window.scrollBy(0, -100);
  },

  // Shift + close bracket
  125 : function() {
    window.scrollBy(0, 100);
  }
}


$(document).keypress(function(event) {
  if(isEditing)
      return;
  if(EventHolder.hasOwnProperty(event.which))
    EventHolder[event.which]();
});

$("input").focus(function(){
  isEditing = true;
});

$("input").blur(function(){
  isEditing = false;
})

$("textarea").focus(function(){
  isEditing = true;
});

$("textarea").blur(function(){
  isEditing = false;
})