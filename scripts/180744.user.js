// ==UserScript==
// @name        Facebook 'Keep me logged in' Deactivator
// @namespace   brogrammer
// @description deactivates the 'Keep me logged in' Checkbox of the Facebook Login Interface
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