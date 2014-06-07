// ==UserScript==
// @name           oDesk Work Diary Navigation
// @namespace      http://evelio.info/
// @description    Allows to navigate with keyboard keys (like in Facebook) on oDesk Work Diary detailed view.
// @include        https://team.odesk.com/*
// @include        http://team.odesk.com/*
// @include        https://www.odesk.com/snapshot/*
// @include        http://www.odesk.com/snapshot/*
// ==/UserScript==

nextUrl = document.getElementById('ss_next').href;
previousUrl = document.getElementById('ss_prev').href;

function checkKey(e) {
  switch(e.keyCode) {
    //Left key
    case 37:
      document.location = previousUrl;
    break;
    //Right key
    case 39:
      document.location = nextUrl;
    break;
  }
}

document.onkeyup = checkKey;
