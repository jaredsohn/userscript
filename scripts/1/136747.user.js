// ==UserScript==
// @name        FuckGNU
// @namespace   http://microsoft.com
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @version     1
// ==/UserScript==

var globals = {
  all_posts : 0,
  all_files : 0
};

function global_init() {
  globals.all_files = document.getElementsByClassName("fileInfo");
  globals.all_posts = document.getElementsByClassName("post reply");
}

function remove_no_file() {
  var i;

  console.log(globals.all_posts.length);
  for(i = 0; i < globals.all_posts.length; ++i) {
    if(!globals.all_posts[i].getElementsByClassName("fileInfo").length) {
      globals.all_posts[i].parentNode.style.display = "none";
    }
  }
}

window.onload = function() {
  global_init();
  remove_no_file();
}
