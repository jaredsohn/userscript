// ==UserScript==
// @name        shmeea-ncerbmd-2013-moz
// @namespace   http://userscripts.org/users/497851
// @grant       none
// @include     http://114.80.221.83/wsbm/compLogin.jsp
// @include     http://114.80.221.80/wsbmbk/compLogin.jsp
// @include     http://114.80.221.83/wsbm/candidate/candidateEnter.action?act=candidateMiddle&systemFlag=1
// @include     http://114.80.221.80/wsbmbk/candidate/candidateEnter.action?act=candidateMiddle&systemFlag=1
// @version     2
// ==/UserScript==

/* Fix title panel */
if (document.querySelectorAll(".title_panel")[0]) {
  var o = document.querySelectorAll(".title_panel")[0];
  o.style.position = "static";
}

/* Fix view and change information button */
if (document.querySelectorAll(".btn2")[0]) {
  var o = document.querySelectorAll(".btn2")[0];
  o.style.height = "99px";
  o.style.top = "99px";
  o.style.width = "121px";
  o.addEventListener("click", function() {
    /* Fix view and change information window panel */
    if (document.getElementById("window_panel")) {
      var o = document.getElementById("window_panel");
      o.style.left = "50%";
      o.style.marginLeft = "-274px";
      o.style.top = "50%";
      o.style.marginTop = "-140px";
    }
  }, false);
}