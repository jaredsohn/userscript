// ==UserScript==
// @name        owa toggle check all (owa 2003)
// @namespace   www
// @include     http://*/exchange/*/Inbox/?Cmd=contents*
// @include     https://*/exchange/*/Inbox/?Cmd=contents*
// @version     1
// @grant       none
// ==/UserScript==

function flipChecks(evt) {
  check_boxs = document.getElementsByName("MsgID");
  for(i=0; i<check_boxs.length; i++) {
    if(check_boxs[i].checked == true) {
      check_boxs[i].checked = false;
    } else {
      check_boxs[i].checked = true;
    }
  }
}

imgs = document.getElementsByTagName("img");
check_image =  window.location.protocol + "//" + window.location.hostname + "/exchweb/img/view-mark.gif"
for( i=0;i<imgs.length; i++) {
  if(imgs[i].src== (check_image)) {
    imgs[i].onclick = flipChecks;
  }
}
