// ==UserScript==
// @name Kyoto University CALL materials for Chinese classes
// @description Add a HTML5 audio facilities to Kyoto University CALL materials for Chinese classes (2010, beginner) for non-IE users. ("京都大学2010年初級中国語クラス向けCall教材でfirefoxでは音声が再生されないことの改善。HTML5 audioタグを使用。"(for firefox 3.5+))
// @include        http://www.cn.call.iimc.kyoto-u.ac.jp/2010/shanghai/*
// ==/UserScript==

window.addEventListener("load", function (e) {
  unsafeWindow.play_sound = function (f) {
    document.getElementById("sound").innerHTML="<audio> </audio>";
    document.getElementsByTagName("audio")[0].setAttribute("src", f);
    document.getElementsByTagName("audio")[0].play();};
}, false);