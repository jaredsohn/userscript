// ==UserScript==
// @include http://habrahabr.ru/blogs/*
// @include http://habrahabr.ru/blog/*
// @include http://*.habrahabr.ru/blogs/*
// @include http://*.habrahabr.ru/blog/*
// @name	Author's comments highlight
// @version	1.0
// @date	02/16/2010
// @author	Aidar Biktimirov aka nagato
// ==/UserScript==

(function () {
  if (document.getElementById("comments")) {
    var author = document.getElementsByClassName("entry-info")[0].getElementsByClassName("nickname")[0].childNodes[0].innerHTML;
    var comments = document.getElementsByClassName("msg-meta");
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].getElementsByClassName("username")[0].childNodes[1].innerHTML === author) {
        comments[i].style.background = "#E6FDF5";
      }
    }
  }
})();