// ==UserScript==
// @name           ReverseSpoilers
// @namespace      http://userscripts.org/users/227975
// @description    Swaps the default spoiler setting to show instead of hide on Gaia Online forums, guilds, and PMs.
// @include        *gaiaonline.com/forum/*
// @include        *gaiaonline.com/guilds/*
// @include        *gaiaonline.com/profile/privmsg.php*
// ==/UserScript==

function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}

addGlobalStyle('.spoiler-hidden .spoiler { display: inherit !important; } .spoiler-hidden .spoiler-control-hide { display: inline !important; } .spoiler-hidden .spoiler-control-show { display: none !important; } .spoiler-hidden { border: 1px dotted black !important; } .spoiler-revealed .spoiler { display: none !important; } .spoiler-revealed .spoiler-control-hide { display: none !important; } .spoiler-revealed .spoiler-control-show { display: inline !important; } .spoiler-revealed { border: none !important; }');