// ==UserScript==
// @name           ShareCash.org domains: Less offensive page
// @version        1.0
// @include        http://sharecash.org/*
// @include        http://fileme.us/*
// @include        http://verified-download.com/*
// @include        http://downloadity.net/*
// @include        http://okayfiles.com/*
// @include        http://filesrightnow.com/*
// @include        http://jafiles.net/*
// @include        http://surefile.org/*
// @include        http://fileam.com/*
// @include        http://reliabledownloads.org/*
// @include        http://fileups.net/*
// @include        http://downloadsafe.org/*
// @include        http://okfiles.net/*
// @include        http://downloadwho.com/*
// @include        http://gotgamecheats.net/*
// @include        http://downloadconfirm.net/*
// @include        http://speedyfiles.net/*
// @include        http://downupfiles.com/*
// @include        http://filesmy.com/*
// @include        http://getmyfile.org/*
// @include        http://reliablefiles.com/*
// @include        http://fileml.com/*
// @include        http://filesquick.net/*
// @include        http://filerack.net/*
// ==/UserScript==

document.getElementsByTagName('body')[0].setAttribute('onbeforeunload', '');
document.getElementsByTagName('body')[0].removeAttribute('onbeforeunload');
GM_addStyle("#popup-area, #dark, #header_wrap {display: none !important;}");
document.getElementById("popup-area").parentNode.removeChild(document.getElementById("popup-area"));
document.getElementById("dark").parentNode.removeChild(document.getElementById("dark"));
document.getElementById("header_wrap").parentNode.removeChild(document.getElementById("header_wrap"));