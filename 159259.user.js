// ==UserScript==
// @name       Quora Sign
// @author     footedesign
// @version    1
// @description  Removes the annoying "You must be signed in to use Quora." message, by appending ?share=1 to the URL 
// @include    http://*quora.com/*
// @include    https://*quora.com/*
// @icon       http://quora.com/favicon.ico
// ==/UserScript==
var url = window.location.href;
if (url.indexOf('?') > -1) {
  if (url.indexOf('share=1') == -1) {
    window.location.replace(url + "&share=1");
  }
} else {
  window.location.replace(url + "&share=1");
};