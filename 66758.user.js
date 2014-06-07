// ==UserScript==
// @name           NoFilter
// @namespace      NoFilter
// @include        http://*
// @include        https://*
// ==/UserScript==

const BUTTON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAAEVmidkAAAADFBMVEUAAADDw8OysrL7%2B%2FtTty0RAAAABHRSTlMA%2F%2F%2F%2Fsy1AiAAAABp0RVh0VGl0bGUAYmF0dTNmdXRpbWFydWc5aS5wbmcuUh3OAAAADHRFWHRTb2Z0d2FyZQBWaVisIm5tAAAAXUlEQVR42h2LoQ2AQBAER1EEJRwCPH0R3LeARD0o%2FnIGh6QQKvgKCCEh4cDMJpMdoAFmWkrfyIYhRnVTd4i6w5S9Z82kTLxYxs8XZgNyJEWe4JhOR3jUS3%2BK2Z%2FyAizRIAqWu6MEAAAAAElFTkSuQmCC';

var esc = function(text){
  var ret = '';
  var ccc = 0;
  for(var i=0, len=text.length; i<len; i++){
    var c = text.charCodeAt(i);
    var x = ccc ^ c;
    ccc = x;
    if(ret) ret = ret + '.';
    ret = ret + x.toString();
  }
  return ret;
}

var une = function(text){
  var ret = '';
  var ccc = 0;
  text = text.match(/[0-9.]+/)[0].split('.');
  for(var i=0, len=text.length; i<len; i++){
    var c = parseInt(text[i]);
    var x = ccc ^ c;
    ccc = c;
    ret = ret + String.fromCharCode(x);
  }
  return ret;
}
  
var createButton = function(node){
  var parent = node.parentNode;
  var button = document.createElement('img');
  button.src = BUTTON;
  button.style.cursor = 'pointer';
  button.title = 'No Filter!';
  
  button.addEventListener('click', function(e){
    if(node.value == '') return;
    if(m=node.value.match(/NO([0-9.]+)ON/)){
      node.value = une(m[1]);
    }
    else{
      node.value = 'NO' + esc(node.value) + 'ON\r\nhttp://userscripts.org/scripts/source/66758.user.js';
    }
  }, true);
  
  parent.insertBefore(button, node.nextSibling);
}

var un = function(n){
  if(n.hasChildNodes){
    for(var i=0, len=n.childNodes.length; i<len; i++){
      if(un(n.childNodes[i])) break;
    }
  }
  if(n.nodeType == 3){
    if(ms=(np=n.parentNode).innerHTML.match(/NO([0-9.]+)ON/g)){
      for(var i=0, len=ms.length; i<len; i++){
        np.innerHTML = np.innerHTML.replace(ms[i], '<span title="' + une(ms[i]) + '" style="background-color:yellow">' + ms[i] + '</span>');
      }
    }
    return true;
  }
  return false;
}
un(document.body);

var nodes = document.getElementsByTagName('textarea');
for(var i=0, len=nodes.length; i<len; i++){
  if(nodes[i].style.display != 'none'){
    createButton(nodes[i]);
  }
}
