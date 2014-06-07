// ==UserScript==
// @name			Turbofilm series unload preventer
// @namespace		http://userscripts.org/scripts/show/86937
// @description		Prevents users from closing tabs with loaded series. Homepage: http://userscripts.org/scripts/show/86937
// @include			https://turbik.tv/Watch/*
// @include			https://turbik.com/Watch/*
// @include			https://turbik.net/Watch/*
// @version			0.5.5
// ==/UserScript==

var messageChrome = "Возможно, вы начали загружать или просматривать серию. Вы точно хотите покинуть эту страницу?";
var messageFF = "Возможно, вы начали загружать или просматривать серию.";

try { //chrome
  window.onbeforeunload = function() {
    return messageChrome;
  }  
} catch (err) { //ff
  var onUnload = function(e) {
    var e = (e)?e:window.event;
    e.returnValue = messageFF;
  }

  window.addEventListener("beforeunload", onUnload, true); 
}

//ояебу, как просто