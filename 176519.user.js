// ==UserScript==
// @name       Karachan 3.0 Zmiana tytułu na /b/
// @namespace  http://karachan.org/b/
// @version    0.01
// @description  Skrypt zmieniający nazwę na /b/
// @match      *karachan.org/b/*
// @copyright  2013, Przydatny Anonek :3
// ==/UserScript==

function ReplaceContentInContainer(selector, content) {
  var nodeList = document.querySelectorAll(selector);
  for (var i = 0, length = nodeList.length; i < length; i++) {
     nodeList[i].innerHTML = content;
  }
}

ReplaceContentInContainer(".boardTitle", "/b/ - Narodowo-Katolickie Forum Obrazkowe ");