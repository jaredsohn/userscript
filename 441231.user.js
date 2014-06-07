// ==UserScript==
// @name        Confluence: Stay logged in
// @namespace   JVR
// @description Check 'Remember me' by default
// @include     https://*/confluence/login.action*
// @version     1.1
// ==/UserScript==
nf_element = document.getElementById('os_cookie');
if (nf_element)
{
  nf_element.checked = true;
}