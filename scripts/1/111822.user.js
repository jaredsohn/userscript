// ==UserScript==
// @name           QuickSearch
// @namespace      http://chofter.com/apps
// @description    Menyediakan cara yang sangat cepat untuk pencarian Google, dengan menunjukkan hasil saat Anda mengetik. Cukup klik Ctrl-Shift-F dan mulai mengetik! Untuk mencari hanya situs yang sedang Anda, tekan Ctrl-Shift-S. Untuk mencari beberapa teks pada halaman, hanya sorot dan tekan Ctrl-Shift-F.
// @include        http://*
// @include        https://*
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
var triggerKey = "F";
var siteTriggerKey = "S";
var version = "1.1";

document.addEventListener("keyup", function(evt){
  if(evt.ctrlKey && evt.altKey) {
    var ch = String.fromCharCode(evt.keyCode);

    if (ch == triggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch" ;
      document.getElementsByTagName("head")[0].appendChild(g);
    } else if (ch == siteTriggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch?samesite=true";
      document.getElementsByTagName("head")[0].appendChild(g);
    } else {
      console.log("ch = ", ch);
    }
    
  	
  }
}, true);