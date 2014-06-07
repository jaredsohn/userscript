// ==UserScript==
// @name           megatokyo-keyboard
// @namespace      tag:gkatsev.com,2011-02-20:megatokyo-keyboard-control
// @description    keyboard control
// @include        http://megatokyo.com/strip/*
// ==/UserScript==

var comic
  , l = unsafeWindow.location.pathname.split('/')
  , current = JSON.parse(l[l.length-1])
  , previous = {href: 'http://megatokyo.com/strip/'+(current-1)}
  , next = {href: 'http://megatokyo.com/strip/'+(current+1)}
  , start = {href: 'http://megatokyo.com/strip/1'}
  , latest = {href: 'http://megatokyo.com/index.php'}
  , originalBody = document.body.innerHTML
  , bodyToggle = true;

var toggleBody = function toggleBody(){
  if(bodyToggle) {
    document.body.innerHTML = '';
    document.body.appendChild(comic);
    bodyToggle = false;
  }else {
    document.body.innerHTML = originalBody;
    bodyToggle = true;
  }
}

var followButton = function followButton(btn){
  window.location.href = btn.href;
}


window.addEventListener('keydown', function(event){
  var keycode = event.which || event.keyCode;

  !event.ctrlKey && keycode == 37 && followButton(previous);
  !event.ctrlKey && keycode == 39 && next && followButton(next);
  !event.ctrlKey && keycode == 84 && followButton(latest);
  !event.ctrlKey && keycode == 83 && followButton(start);
  !event.ctrlKey && keycode == 70 && toggleBody();
}, false);

comic = document.getElementById('comic');
toggleBody();
