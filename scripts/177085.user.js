// ==UserScript==
// @name        Channelate: Include easter eggs
// @namespace   http://userscripts.org/users/aankhen
// @include     http://www.channelate.com/*
// @description Automatically displays the bonus comic and hover text (if they exist) on Channelate comic strip pages.
// @version     2
// ==/UserScript==

var comic = document.querySelector('#comic-1 img');

if ((comic !== null) && (comic.title != "")) {
  var div = document.createElement('div');
  div.style.textAlign = 'center';
  div.style.width = '100%';
  div.style.padding = '0 0 1em 0';
  div.style.fontSize = '1.5em';
  div.style.color = 'black';
  div.appendChild(document.createTextNode(comic.title));

  comic.parentNode.appendChild(div);
  comic.title = "";
}

var bonusComicLink = document.querySelector('#extrapanelbutton a');

if (bonusComicLink !== null) {
  var bonusComicLocation = bonusComicLink.href;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', bonusComicLocation, true);
  xhr.responseType = 'document';
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      xhrCallback(xhr.response);
    }
  };
  xhr.send();

  function xhrCallback(response) {
    var image = response.querySelector('#content .extrapanelimage');

    bonusComicLink.parentNode.replaceChild(image, bonusComicLink);
  }
}