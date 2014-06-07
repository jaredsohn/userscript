// ==UserScript==
// @name          Hatena::WanWanWorld Voice Baloon Toggle
// @namespace     http://d.hatena.ne.jp/Yuichirou/
// @description   Make a select-box to switch the display of voice-baloons in Hatena::WanWanWorld
// @include       http://world.hatelabo.jp/*
// @exclude       http://world.hatelabo.jp/help
// ==/UserScript==

// Version 1.53 (Released at 2006-03-26)

var side = document.getElementById("side");

if (side != null) {
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("id", "voice-baloon");
  head.appendChild(style);

  var selectbox = document.createElement("select");

  selectbox.addEventListener("change", function(){
    var style = document.getElementById("voice-baloon");
    style.innerHTML = this.options[this.selectedIndex].value;
  }, false);

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u8868\u793A';
  selectbox.lastChild.value = '';

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u900F\u660E';
  selectbox.lastChild.value = 'table.baloon { opacity: 0.8 }';

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u30A2\u30A4\u30B3\u30F3';
  selectbox.lastChild.value = 'table.baloon img + * { display: none }';

  selectbox.appendChild(document.createElement("option"));
  selectbox.lastChild.text = '\u975E\u8868\u793A';
  selectbox.lastChild.value = 'table.baloon { display: none }';

  var title = side.getElementsByTagName("h2")[0];
  var reload = title.getElementsByTagName("span")[0];
  title.insertBefore(selectbox, reload);
  title.insertBefore(document.createTextNode(' '), reload);
}
