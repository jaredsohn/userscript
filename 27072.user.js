// ==UserScript==
// @name           LeproShtuki
// @namespace      leprosorium.ru
// @description    !!!!!!!!!!!!!!!
// @include        http://leprosorium.ru/
// @include        http://www.leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://www.leprosorium.ru/pages/*
// @include        http://leprosorium.ru/my/
// @include        http://leprosorium.ru/my/inbox/
// @include        http://leprosorium.ru/my/favourites/
// @include        http://www.leprosorium.ru/my/
// @include        http://www.leprosorium.ru/my/inbox/
// @include        http://www.leprosorium.ru/my/favourites/

var posts = document.getElementsByClassName("post");

var posts_count = posts.length;
for(var i = 0; i < posts_count; i++) {
  var hr = document.createElement('HR');
  hr.style.height = '5px';
  posts[i].parentNode.insertBefore(hr, posts[i].nextSibling);
}


// ==/UserScript==