// ==UserScript==
// @name        Facebook Angemeldet bleiben Deaktivierer
// @namespace   brogrammer
// @description Deaktiviert automatisch die Checkbox angemeldet bleiben bei der Facebook Login Maske.
// @include     https://www.facebook.com
// @include     https://www.facebook.com/*
// @include     http*://www.facebook.com
// @include     https://*.facebook.com
// @include     https://*.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==
if(document.getElementById('persist_box').checked==1){
document.getElementById('persist_box').click();
}
