// heavily quoting : http://diveintogreasemonkey.org/patterns/add-css.html
// ==UserScript==
// @name            CMF
// @namespace       DNUK
// @include         http://www.doctors.net.uk/Forum/viewTopics.aspx?forum_id=*
// ==/UserScript==
function addGlobalStyle(css) {    
  var head, style;    
  head = document.getElementsByTagName('head')[0];    
  if (!head) { return; }   
  style = document.createElement('style');    
  style.type = 'text/css';    style.innerHTML = css;      
  head.appendChild(style);}

addGlobalStyle('span#Admin_label {display:none;}');
//.user.js