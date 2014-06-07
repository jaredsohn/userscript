// ==UserScript==
// @name        Anti-Disabler
// @version     1.0
// ==/UserScript==

document.oncopy = null;
document.onmouseup = null;
document.onmousedown = null;
document.oncontextmenu = null;
document.onselect = null;
document.onselectstart = null;
a = document.getElementsByTagName('*');
for ( i = 0; i < a.length; i++ ) {
  a[i].oncopy = null;
  a[i].onmouseup = null;
  a[i].onmousedown = null;
  a[i].oncontextmenu = null;
  a[i].onselect = null;
  a[i].onselectstart = null;
}

a = document.getElementsByTagName('a');
for ( i = 0; i < a.length; i++ ) {
  if ( a[i].getAttribute("rel") == null )
    a[i].setAttribute("rel","noreferrer");
}

a = document.getElementsByTagName('area');
for ( i = 0; i < a.length; i++ ) {
  if ( a[i].getAttribute("rel") == null )
    a[i].setAttribute("rel","noreferrer");
}