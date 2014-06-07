// ==UserScript==
// @name NTUJ mod
// @author DarkKnight
// @include http*://acm.csie.org/ntujudge/*
// @include http*://acm.csie.ntu.edu.tw/ntujudge/*

x = document.createElement('link');
x.href = 'http://w.csie.org/~b96120/ntuj.css';
x.rel = 'stylesheet';
x.type = 'text/css';
a = document.getElementsByTagName('link')[0];
a.disabled = true;
a.parentNode.appendChild(x);
q = document.createElement('script');
q.src = 'http://acm.csie.org/ntujudge/lib/javascript/jquery-1.4.2.min.js';
document.getElementsByTagName('head')[0].appendChild(q); 
$init();
function $init() {
  if(typeof unsafeWindow.jQuery == 'undefined')
    window.setTimeout($init, 100);
  else {
    $ = unsafeWindow.jQuery;
    $main();
  }
}
function dummy() {}
function $main() {
  $('.layoutmenu img').remove();
  $('.layoutmenu br').remove();
  $('font').attr('color', 'auto');
  $('.regform').attr('width', 'auto');
  $('.regform').attr('height', 'auto');

    
  // for problemset.php
  $('#pressUP').hide();
  $('#pressDOWN').hide();
  $('#volumeMenu').css('height', 'auto');
  $('#volumeViewer').css('position', 'static');
  $('.super').css('width', 'auto');
  $("div.volumes").unbind();
  $("#pressUP").unbind();
  $("#pressDOWN").unbind();
  $("#volumeMenu").unbind();
}
// ==/UserScript==
