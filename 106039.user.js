// ==UserScript==
// @name           DocuWiki default wiki text style changes 
// @namespace      http://*/doku.php*
// @description    Sets default style to a desired font/size.
// @grant       none
// ==/UserScript==

if(null==document.getElementById('edit__summary'))  {
  m=document.querySelectorAll("div.page"); 
  m[0].style.cssText="width: 580px; font-family: serif; font-size: 15px;"
}
