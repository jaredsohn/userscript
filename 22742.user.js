// ==UserScript==
// @name          Hatena::WanWanWorld House Toggle
// @namespace     http://d.hatena.ne.jp/Yuichirou/
// @description   Make a select-box to switch the display of houses in Hatena::WanWanWorld
// @include       http://world.hatelabo.jp/*
// @exclude       http://world.hatelabo.jp/help
// ==/UserScript==

// Version 1.2 (Released at 2008-04-17)

var menu = document.getElementById("menu");

if (menu != null) {
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("id", "world-house");
  head.appendChild(style);

  var selectbox = document.createElement("select");
  selectbox.style.verticalAlign = "top";

  selectbox.addEventListener("change", function(){
    var style = document.getElementById("world-house");
    style.innerHTML = this.options[this.selectedIndex].value;
  }, false);

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u8868\u793A';
  selectbox.lastChild.value = '';

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u900F\u660E';
  selectbox.lastChild.value = 'img[src="/images/house.gif"] { opacity: 0.5 };';

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u975E\u8868\u793A';
  selectbox.lastChild.value = 'img[src="/images/house.gif"] { display: none };';

  menu.appendChild(selectbox);
}
