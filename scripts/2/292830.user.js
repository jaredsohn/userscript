// ==UserScript==
// @name            Shanbay Chat Room
// @namespace       http://userscripts.org/scripts/show/292830
// @description     Shanbay Chat Room
// @version         0.1.0
// @author          mozillazg
// @updateURL       https://userscripts.org/scripts/source/292830.meta.js
// @downloadURL     https://userscripts.org/scripts/source/292830.user.js
// @include         http://www.shanbay.com/*
// @exclude         http://www.shanbay.com/bdc/*
// @exclude         http://www.shanbay.com/sentence/*
// @exclude         http://www.shanbay.com/read/*
// ==/UserScript==


var s = ' '
+'<script>'
+  'var TogetherJSConfig_siteName = "Shanbay";'
+  'var TogetherJSConfig_findRoom = "shanbay";'
+  'var TogetherJSConfig_autoStart = true;'
+  'var TogetherJSConfig_suppressJoinConfirmation = true;'
+  'var TogetherJSConfig_suppressInvite = true;'
+  'var TogetherJSConfig_dontShowClicks = true;'
+'</script>'
+'<script src="https://togetherjs.com/togetherjs-min.js"></script>';

$('body').append(s);
