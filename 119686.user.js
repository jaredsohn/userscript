// ==UserScript==
// @name gplus_greasemonkey
// @namespace gp
// @description removes posts from certain users
// @include https://plus.google.com/*
// ==/UserScript==
window.addEventListener ("load", LocalMain, false);
window.addEventListener ("scroll", LocalMain, false);
window.addEventListener ("DOMNodeInserted", LocalMain, false);

function LocalMain () {
  var cp_gp = document.getElementById('contentPane');
  var posts_gp = cp_gp.getElementsByClassName('md gi');

  var arrayUsers_gp = ["user1", "user2", "user3", "user4"];

  var user_gp;

  for (i = 0; i < posts_gp.length; i++){
    user_gp = posts_gp[i].getElementsByTagName("span")[0].innerHTML;
    if (arrayUsers_gp.indexOf(user_gp) != -1) {
      posts_gp[i].style.display = 'none';
    }
  }
}