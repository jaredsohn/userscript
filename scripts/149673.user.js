// ==UserScript==
// @name           MediaWiki 脚注 tip
// @namespace      http://lilydjwg.is-programmer.com/
// @include        http://localhost/wiki/*
// @include        https://en.wikipedia.org/wiki/*
// ==/UserScript==

var showTip = function(evt){
  var el = evt.target;
  var left = el.offsetLeft;
  var top = el.offsetTop;
  var tip = document.getElementById('gm-tip');
  //not el.href here; we need the original one
  var tipTextEl = document.getElementById(el.getAttribute('href').substring(1));
  tip.innerHTML = tipTextEl.textContent.substring(2);
  tip.style.top = (top+5) + 'px';
  tip.style.left = (left+25) + 'px';
  tip.style.display = 'block';
};

var hideTip = function(){
  var el = document.getElementById('gm-tip');
  if(el){
    el.style.display = "none";
  }
};

var cites = document.querySelectorAll('.reference > a');
// var cites = document.querySelectorAll('a[href^="#cite_note-"]');
for(var i=0, len=cites.length; i<len; i++){
  cites[i].addEventListener("mouseover", showTip, false);
  cites[i].addEventListener("mouseout", hideTip, false);
}

var setup = function(){
  el = document.createElement('div');
  el.setAttribute('id', 'gm-tip');
  el.style.display = 'none';
  el.style.position = 'absolute';
  el.style.zIndex = '100';
  el.style.border = '1px #1e90ff solid';
  el.style.backgroundColor = 'rgba(115, 201, 230, 0.75)';
  el.style.padding = '0.2em 0.5em';
  var parentEl = cites[0].offsetParent;
  parentEl.appendChild(el);
};
if(cites.length > 0){
  setup();
}