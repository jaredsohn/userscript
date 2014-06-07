// ==UserScript==
// @name          Hatena::WanWanWorld Voice Correct Button
// @namespace     http://d.hatena.ne.jp/Yuichirou/
// @description   Make a button to correct yourself in Hatena::WanWanWorld
// @include       http://world.hatelabo.jp/*
// @exclude       http://world.hatelabo.jp/help
// ==/UserScript==

// Version 1.02 (Released at 2006-03-20)

var speech = document.getElementById("speech");

if (speech != null) {
  var icon = speech.getElementsByTagName("img")[0];

  icon.addEventListener("click", function(){
    var bannersub = document.getElementById("bannersub");
    var username = bannersub.getElementsByTagName("strong")[0].innerHTML;

    var map = document.getElementById("map");
    var baloons = map.getElementsByTagName("table");
    var n = 0; while (baloons[n].parentNode.title != username) n++;

    var voice = document.getElementById("voice");
    voice.value = baloons[n].getElementsByTagName("span")[1].innerHTML;
  }, false);

  icon.title = "\u4ECA\u306E\u767A\u8A00\u3092\u8A00\u3044\u76F4\u3059";
  icon.style.cursor = "pointer";
}
