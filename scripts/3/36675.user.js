// ==UserScript==
// @name            Ze List Redirect
// @author          darkyndy
// @description     Ze List Redirect to source
// @include         http://www.zelist.ro*
// @include         http://zelist.ro*
// @include         *zelist.ro*
// @version         1.0
// ==/UserScript==


var nod1=document.getElementsByTagName("iframe")[0];

if(nod1.id != '_yuiResizeMonitor'){
  window.location.href = nod1.src;
}