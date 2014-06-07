// ==UserScript==
// @name           No Yahoo Home on Yahoo Mail signout
// @description    Stops Yahoo Mail from redirecting you to Yahoo home page when you sign out
// @include        http://*.*.mail.yahoo.com/*
// ==/UserScript==


for (var i = 0; i < document.links.length; i++) {
  if (document.links[i].innerHTML == 'Sign Out') {
    document.links[i].setAttribute ('href', 'http://login.yahoo.com/config/login?logout=1&.src=ym&.intl=us&.direct=2&.done=http://mail.yahoo.com'); break;
  }
}

document.getElementById("_test_sign_out").setAttribute ('onclick', 'location.href = \"http://login.yahoo.com/config/login?logout=1&.src=cdgm&.intl=us&.direct=2&.done=http://mail.yahoo.com\"');