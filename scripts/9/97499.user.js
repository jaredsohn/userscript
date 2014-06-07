// ==UserScript==
// @name           Girl Genius Keyboard Control
// @namespace      tag:gkatsev.com,2011-02-20:girl-genius-keyboard
// @description    Allow keyboard control for use with girl genius.
// @include        http://*.girlgeniusonline.com/*
// @include        http://*.girlgeniusonline.com/comic.php*
// ==/UserScript==

(function(){

var imgs = document.getElementsByTagName('img')
  , next
  , previous
  , start
  , today
  , comic
  , i = 0
  , l = imgs.length
  , a = document.createElement('a')
  , parentDiv
  , originalBody = document.body.innerHTML
  , bodyToggle = true;

var toggleBody = function toggleBody(parentDiv){
  if(bodyToggle) {
    document.body.innerHTML = '';
    parentDiv.style.width = '700px';
    parentDiv.style.backgroundColor = "#CFEDFF";
    parentDiv.style.marginRight = "auto";
    parentDiv.style.marginLeft = "auto";
    document.body.appendChild(parentDiv);
    bodyToggle = false;
  }else {
    document.body.innerHTML = originalBody;
    bodyToggle = true;
  }
}

var followButton = function followButton(btn){
  window.location.href = btn.href;
}

for(; i < l; ++i) {
  if(imgs[i].alt == 'Comic') comic = imgs[i];
  if(imgs[i].alt == 'The First Comic') start = imgs[i].parentNode;
  if(imgs[i].alt == 'The Previous Comic') previous = imgs[i].parentNode;
  if(imgs[i].alt == 'The Next Comic') next = imgs[i].parentNode;
  if(imgs[i].alt == 'The Most Recent Comic') today = imgs[i].parentNode;

  if(next && previous && start && today && comic) break;
}

if(next) {
  a.href = next.href;
  a.appendChild(comic.cloneNode(true));
  comic.parentNode.replaceChild(a, comic);
  originalBody = document.body.innerHTML;
  parentDiv = a.parentNode;
} else {
  parentDiv = comic.parentNode;
}
toggleBody(parentDiv);

window.addEventListener('keydown', function(event){
  var keycode = event.which || event.keyCode;
  unsafeWindow.console.log(event);

  !event.ctrlKey && keycode == 37 && followButton(previous);
  !event.ctrlKey && keycode == 39 && next && followButton(next);
  !event.ctrlKey && keycode == 84 && followButton(today);
  !event.ctrlKey && keycode == 83 && followButton(start);
  !event.ctrlKey && keycode == 70 && toggleBody(parentDiv);
}, false);
})()
