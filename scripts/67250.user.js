// ==UserScript==
// @name           Sharecash Ad Skipper
// @author       Unreal
// @namespace      Sharecash
// @description    This is a modification to the old Sharecash autodownloader just to make it work.
// @include        http://*sharecash.org/download.php?*
// @version       1.1
// ==/UserScript==

var ShareCashSkip = {
   frame: [],
   steps: 0,
   frameCount: 0,
   baseUrl: 'http://sharecash.org/?=',
   init: function() {
      ShareCashSkip.checkFrame();
   },
   checkFrame: function() {
      for (var i=0; i < document.getElementsByTagName('iframe').length; i++) {
         try {
            var tmp = document.getElementsByTagName('iframe')[i].contentDocument.baseURI;
         } catch(e) {
            ShareCashSkip.frame.push(i);
         }
      }
      if (ShareCashSkip.frame.length == 0) {
         setTimeout(ShareCashSkip.init, 1000);
      } else {
         setTimeout(ShareCashSkip.makeStep, 500);
      }
   },
   makeStep: function() {
      if (ShareCashSkip.frame.length == 0)
         return;
      
      if (ShareCashSkip.frameCount == ShareCashSkip.frame.length) {
         ShareCashSkip.frameCount = 0;
         ShareCashSkip.steps++;
      }
      document.getElementsByTagName('iframe')[ShareCashSkip.frameCount].src = ShareCashSkip.baseUrl + ShareCashSkip.steps;
      ShareCashSkip.frameCount++;
      setTimeout(ShareCashSkip.makeStep, 2500);
   },
};
setTimeout(ShareCashSkip.init, 2000);