// ==UserScript==
// @name           TrueCheaters Shoutbox Anti-Anti-Idle
// @namespace      http://www.mango12.com/
// @include        http://*.truecheaters.com/forums/*
// @include        http://truecheaters.com/forums/*
// ==/UserScript==

unsafeWindow.InfernoShoutbox.idlecheck = function(){};

clearInterval(unsafeWindow.InfernoShoutbox.get_shouts);
unsafeWindow.InfernoShoutbox.refreshspeed = 500;
unsafeWindow.InfernoShoutbox.get_shouts = setInterval("InfernoShoutbox.fetch_shouts();", 500);