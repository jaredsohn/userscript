// ==UserScript==
// @name        Confluence: Don't notify watchers
// @namespace   JVR
// @description Disable 'notify watchers' by default
// @include     https://*/confluence/pages/editpage.action*
// @version     1.1
// ==/UserScript==
nf_element = document.getElementById('notifyWatchers');
if (nf_element)
{
  nf_element.checked = false;
}