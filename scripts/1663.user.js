// ==UserScript==
// @name          Mail.com ad page skipping
// @namespace     http://nick.afternight.org
// @description	  Quick re-dir from mail.com ad pages
// @include       http://mail01.mail.com/scripts/common/intr.main*
// ==/UserScript==

(function() {
    var curScript;
    var allScripts = document.getElementsByTagName('script');
    for(var i = 0;i < allScripts.length; i++) {
      curScript = allScripts[i];
      var txt = curScript.text;
      var dex = txt.indexOf("function seenAd()");
      if(dex != -1) {
	txt = txt.substring(txt.indexOf("self.location.href",txt.indexOf("seenAd()"))+20,txt.indexOf(';',txt.indexOf("seenAd()"))-1);
	window.location.href = txt;
      }
    }
})();
