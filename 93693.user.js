// ==UserScript==
// @name HD Highlighter
// @author DarkKnight
// @include http*://*ktxp.com/*
// @include http*://share.dmhy.*/*
// ==/UserScript==

var style = {
  'color'           : '#d0c3b0',
  'background-color': '#000',
  'font-weight'     : 'bold'
};
var key = /720|1080|ASS|SSA|roger|掛|挂/i;
q = document.createElement('script');
q.src = 'http://code.jquery.com/jquery-1.4.4.js';
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
function highlight() {
  match = this.data.match(key);
  if (!match) return;
  p = this.data.indexOf(match);
  this.data = this.data.replace(match, '');
  r = this.splitText(p);
  q = document.createElement('span');
  q.innerHTML = match;
  q.className = 'highlight';
  this.parentNode.insertBefore(q, r);
}
function $main() {
  $('a').contents()
    .filter(function() {return this.nodeType == 3;})
    .each(highlight);
  $('.highlight').css(style);
}
