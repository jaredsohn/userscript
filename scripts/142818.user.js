// ==UserScript==
// @name           Master of Unicorn Fix
// @namespace      The Little Moa
// @description    Changes Master of Unicorns to N/A.
// @include        https://forums.halowaypoint.com/*
// @version        1.0
// ==/UserScript==

unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Master of Unicorns";
      var fire = "N/A";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);