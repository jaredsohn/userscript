// ==UserScript==
// @name       Twitter List Button
// @namespace  http://twitter.com/foooomio
// @version    1.0.7
// @description  プロフィールの下に「リストへの追加/削除」ボタンを追加します。
// @include    http://twitter.com/*
// @include    https://twitter.com/*
// @license    MIT License
// ==/UserScript==

(function(d) {
  
  function createListBtn(user_id, style, label) {
    var div, span, ul, li;
    
    div = d.createElement("div");
    div.setAttribute("class", "user-actions");
    div.setAttribute("data-user-id", user_id);
    div.setAttribute("style", style);
    div.setAttribute("id", "list-button");
    
    span = d.createElement("span");
    span.setAttribute("class", "user-dropdown btn");
    
    ul = d.createElement("ul");
    
    li = d.createElement("li");
    li.setAttribute("class", "list-text pretty-link dropdown-link");
    li.innerHTML = label;
    
    ul.appendChild(li);
    span.appendChild(ul);
    div.appendChild(span);
    
    return div;
  }
  
  function func() {
    var completed = d.getElementById('list-button');
    var pc = d.getElementsByClassName('profile-card')[0];
    
    if(completed || !pc)
      return;
    
    var label = pc.getElementsByClassName('list-text')[0].innerHTML;
    var user_id = pc.getElementsByClassName('profile-card-inner')[0].getAttribute("data-user-id");
    var style = "clear:right;float:right;";
    
    var parent = pc.getElementsByClassName('flex-module')[0];
    var reference = parent.getElementsByClassName('profile-header-inner-overlay')[0];
    
    if(reference) {
      style += "top:10px;right:10px;";
    } else {
      reference = parent.lastChild;
    }
    
    var btn = createListBtn(user_id, style, label);
    parent.insertBefore(btn, reference);
  }
  
  function handler() {
    d.removeEventListener('DOMNodeInserted', handler, false);
    
    setTimeout(function() {
      func();
      d.addEventListener('DOMNodeInserted', handler, false);
    }, 50);
  }
  
  d.addEventListener('DOMNodeInserted', handler, false);
  
})(document);
