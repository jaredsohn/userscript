// ==UserScript==
// @name        Invisible Bread: Include bonus comic
// @namespace   http://userscripts.org/users/aankhen
// @description Automatically displays the bonus comic (if there is one) on Invisible Bread comic strip pages.
// @include     http://invisiblebread.com/*
// @version     1
// @grant       none
// ==/UserScript==

var bonusComicLink = document.querySelector('#extrapanelbutton a');

if (bonusComicLink === null)
  return;

var bonusComicLocation = bonusComicLink.href;

var xhr = new XMLHttpRequest();
xhr.open('GET', bonusComicLocation, true);
xhr.responseType = 'document';
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    xhrCallback(xhr.response);
  }
}
xhr.send();

function xhrCallback(response) {
  var image = response.querySelector('#content .extrapanelimage');

  var widget = document.querySelector('.widget.comicpress_comic_blog_post_widget');
  widget.insertBefore(image, widget.firstChild);
}