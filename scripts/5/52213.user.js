// ==UserScript==
// @name          Reddit Mass Vote
// @namespace     http://reddit.com
// @description   You can up vote or down vote all comments on any page instantly without having to click each arrow. This is mainly to be used against spammers and trolls.
// @include       http://www.reddit.com/*
// @include       http://reddit.com/*
// ==/UserScript==


GM_registerMenuCommand('Up Vote All', up_vote_all);
GM_registerMenuCommand('Down Vote All', down_vote_all);
GM_registerMenuCommand('Clear All', clear_all);

// From http://snipplr.com/view/1696/get-elements-by-class-name/
function getElementsByClassName(classname, node)  {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
  return a;
}

// From http://jehiah.cz/archive/firing-javascript-events-properly
function fireEvent(element,event){
  if (document.createEventObject){
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt);
  }
  else {
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); 
    return !element.dispatchEvent(evt);
  }
}

function down_vote_all() {
  vote_all('arrow down');
}

function up_vote_all() {
  vote_all('arrow up');
}

function clear_all() {
  vote_all('arrow downmod');
  vote_all('arrow upmod');
}

function vote_all(class_name) {
  arrows = getElementsByClassName(class_name);
  for (var i = 0; i < arrows.length; i++) {
      fireEvent(arrows[i], 'click');
  }
}
