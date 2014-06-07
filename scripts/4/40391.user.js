// ==UserScript==
// @name           User profile navigation
// @namespace      http://userscripts.org/users/26596
// @include        http://leprosorium.ru/users/*
// ==/UserScript==


var gw = document.getElementById('generic-wrapper');

if (gw) {
  
	var uid = parseInt(window.location.toString().match(/.*\/(\d+)/)[1]);
  
  var next_uid = uid + 1;
  var next_arrow = '<a href="http://leprosorium.ru/users/' + next_uid + '">&rarr;</a>';
  
  if (uid > 1) {
    var prev_uid = uid - 1;
    var prev_arrow = '<a href="http://leprosorium.ru/users/' + prev_uid + '">&larr;</a>';
  } else {
    var prev_arrow = '&larr;';
  }
  
	var nav = document.createElement('div');
  nav.style.textAlign = 'center';
  nav.style.fontSize = '11px';
  nav.style.marginBottom = '1em';
  if (document.getElementById('content_left')) {
    nav.style.marginTop = '-20px';
  }
	nav.innerHTML = prev_arrow + ' ' + uid + ' ' + next_arrow;
	gw.insertBefore(nav, gw.childNodes[0]);
}